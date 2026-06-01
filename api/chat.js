export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Метод не разрешен. Используйте POST.' });
  }

  const apiKey = process.env.GEMINI_API_KEY;

  if (!apiKey) {
    console.error('ОШИБКА СЕРВЕРА: Переменная окружения GEMINI_API_KEY не найдена!');
    return res.status(500).json({ 
      error: 'Конфигурация сервера не завершена. Проверьте, добавлен ли GEMINI_API_KEY в настройках Vercel.' 
    });
  }

  const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`;
  
  const maxRetries = 3;
  let delay = 1000; // 1 секунда базовой задержки

  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      const { contents, systemInstruction } = req.body;
      console.log(`Отправка запроса к Gemini API (Попытка ${attempt}/${maxRetries})...`);

      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          contents,
          systemInstruction
        })
      });

      const responseData = await response.json();

      // Если получили ошибку перегрузки (503 или 429) и у нас есть еще попытки
      if ((response.status === 503 || response.status === 429) && attempt < maxRetries) {
        console.warn(`Gemini API временно недоступен (${response.status}). Повтор через ${delay}ms...`);
        await new Promise(resolve => setTimeout(resolve, delay));
        delay *= 2; // Увеличиваем задержку в два раза (экспоненциальный бэк-офф)
        continue;
      }

      if (!response.ok) {
        console.error('Gemini API вернул ошибку:', JSON.stringify(responseData));
        return res.status(response.status).json({ 
          error: `Ошибка Gemini API: ${responseData.error?.message || 'Неизвестная ошибка'}` 
        });
      }

      console.log('Успешный ответ от Gemini API получен!');
      return res.status(200).json(responseData);

    } catch (error) {
      console.error(`Ошибка во время попытки ${attempt}:`, error);
      if (attempt === maxRetries) {
        return res.status(500).json({ 
          error: `Внутренняя ошибка сервера: ${error.message}` 
        });
      }
      await new Promise(resolve => setTimeout(resolve, delay));
      delay *= 2;
    }
  }
}