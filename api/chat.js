export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();

  // Теперь проверяем правильную переменную для Groq
  const apiKey = process.env.GROQ_API_KEY;
  
  if (!apiKey) {
    console.error('ОШИБКА СЕРВЕРА: Переменная окружения GROQ_API_KEY не найдена!');
    return res.status(500).json({ 
      error: 'Конфигурация сервера не завершена. Проверьте, добавлен ли GROQ_API_KEY в настройках Vercel.' 
    });
  }

  const url = 'https://api.groq.com/openai/v1/chat/completions';

  // 👇 Сообщение, которое увидит ученик, когда дневной лимит нейросети исчерпан.
  // Замени РЕКВИЗИТЫ на свои (номер карты / телефон СБП и т.п.).
  const SUPPORT_MESSAGE =
    '🌱 Наш ИИ-помощник пока работает на бесплатном тарифе и строго ограничен по нагрузке — ' +
    'на сегодня лимит запросов исчерпан. Попробуй, пожалуйста, снова попозже или завтра 🙏\n\n' +
    'Это молодой проект-методичка, который я развиваю в одиночку. Если хочешь поддержать развитие ' +
    'и снять ограничения нейросети — буду очень благодарен за любую копеечку:\n\n' +
    '💳 СБП / карта: 2202 2081 3524 3112\n\n' +
    'Спасибо, что пользуешься! ❤️';

  try {
    const { contents, systemInstruction } = req.body;

    const systemText = systemInstruction.parts ? systemInstruction.parts[0].text : systemInstruction;
    
    // Преобразуем формат Gemini в формат OpenAI/Groq
    const messages = [
      { role: "system", content: systemText },
      ...contents.map(item => ({
        role: item.role === 'user' ? 'user' : 'assistant',
        content: item.parts[0].text
      }))
    ];

    // Список моделей по приоритету. Пробуем по очереди: если модель недоступна
    // или упёрлась в лимит (у каждой своя квота) — переходим к следующей.
    const MODELS = [
      "llama-3.1-8b-instant",        // быстрая, почти всегда доступна
      "meta-llama/llama-4-scout-17b-16e-instruct",
      "llama-3.3-70b-versatile"      // умная, запасной вариант
    ];

    let lastError = 'Не удалось получить ответ ни от одной модели.';
    let lastWasRateLimit = false;

    for (const model of MODELS) {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`
        },
        body: JSON.stringify({
          model,
          messages: messages,
          temperature: 0.4, // ниже температура — меньше случайных «иероглифов» в тексте
          top_p: 0.9
        })
      });

      const data = await response.json();

      if (response.ok && !data.error) {
        return res.status(200).json(data);
      }

      // Ошибка — запоминаем и пробуем следующую модель
      lastError = data.error?.message || `Groq вернул статус ${response.status}`;
      const code = data.error?.code || '';
      const decommissioned = /not exist|do not have access|decommission/i.test(lastError);
      const rateLimited = response.status === 429 || code === 'rate_limit_exceeded'
        || /rate limit|tokens per/i.test(lastError);
      lastWasRateLimit = rateLimited;

      // Переходим к следующей модели только если есть смысл (недоступна / лимит).
      // На прочих ошибках (например, плохой запрос) — прекращаем.
      if (!decommissioned && !rateLimited) break;
    }

    // Если все модели упёрлись в лимит — показываем дружелюбное сообщение про поддержку проекта.
    if (lastWasRateLimit) {
      return res.status(200).json({ error: SUPPORT_MESSAGE, limited: true });
    }
    return res.status(200).json({ error: lastError });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}