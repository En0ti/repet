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

    const response = await fetch(url, {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: "llama-3.3-70b-versatile", // Одна из самых быстрых и умных моделей
        messages: messages,
        temperature: 0.4, // ниже температура — меньше случайных «иероглифов» в тексте
        top_p: 0.9
      })
    });

    const data = await response.json();
    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}