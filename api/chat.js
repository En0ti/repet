export default async function handler(req, res) {
  // Разрешаем только POST запросы
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

  // Обновляем модель до актуальной и поддерживаемой gemini-2.5-flash
  const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`;

  try {
    const { contents, systemInstruction } = req.body;

    // Логируем входящий запрос для отладки в консоли Vercel
    console.log('Отправка запроса к Gemini API...');

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

    if (!response.ok) {
      console.error('Gemini API вернул ошибку:', JSON.stringify(responseData));
      return res.status(response.status).json({ 
        error: `Ошибка Gemini API: ${responseData.error?.message || 'Неизвестная ошибка'}` 
      });
    }

    console.log('Успешный ответ от Gemini API получен!');
    return res.status(200).json(responseData);

  } catch (error) {
    console.error('Критическая ошибка на сервере:', error);
    return res.status(500).json({ 
      error: `Внутренняя ошибка сервера: ${error.message}` 
    });
  }
}