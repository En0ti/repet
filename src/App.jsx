import React, { useState, useEffect, useRef } from 'react';
import { 
  BookOpen, 
  MessageSquare, 
  Code, 
  HelpCircle, 
  ChevronRight, 
  Award, 
  Send, 
  Sparkles, 
  Layers, 
  Play, 
  CheckCircle2, 
  XCircle, 
  RefreshCw, 
  Menu, 
  X,
  BookMarked,
  FileText,
  Lightbulb,
  Terminal,
  BrainCircuit
} from 'lucide-react';

// Темы методички
const COURSE_DATA = [
  {
    id: "logic",
    title: "Задание 2 & 15: Алгебра логики",
    description: "Таблицы истинности, логические операции, импликация и эквивалентность.",
    icon: BrainCircuit,
    theory: `
### Основные законы алгебры логики (Булевой алгебры)

Для успешного решения заданий 2 и 15 на ЕГЭ необходимо знать приоритет операций и базовые законы логики:

1. **Инверсия (Отрицание):** $\\neg A$ или \`not A\`
2. **Конъюнкция (Логическое И):** $A \\land B$ или \`A and B\` (логическое умножение)
3. **Дизъюнкция (Логическое ИЛИ):** $A \\lor B$ или \`A or B\` (логическое сложение)
4. **Импликация (Следование):** $A \\to B$ (эквивалентно $\\neg A \\lor B$) или \`not A or B\` в Python
5. **Эквивалентность (Равенство):** $A \\equiv B$ или \`A == B\` в Python

#### Таблица истинности основных операций:
| $A$ | $B$ | $A \\land B$ | $A \\lor B$ | $A \\to B$ | $A \\equiv B$ |
| :-: | :-: | :----------: | :--------: | :--------: | :-----------: |
|  0  |  0  |      0       |     0      |     1      |       1       |
|  0  |  1  |      0       |     1      |     1      |       0       |
|  1  |  0  |      0       |     1      |     0      |       0       |
|  1  |  1  |      1       |     1      |     1      |       1       |

#### Шаблон кода на Python для Задания 2:
Для построения таблицы истинности выражения, например: $(x \\lor y) \\to (z \\equiv w)$
\`\`\`python
print("x y z w | F")
for x in (0, 1):
    for y in (0, 1):
        for z in (0, 1):
            for w in (0, 1):
                f = (x or y) <= (z == w) # <= заменяет импликацию в Python для bool
                if not f: # если в таблице даны только строки, где F = 0
                    print(f"{x} {y} {z} {w} | {int(f)}")
\`\`\`
    `,
    practice: {
      question: "Логическая функция задаётся выражением: (x ∧ ¬y) ∨ (y ≡ z) ∨ ¬w. Нам известно, что выражение ЛОЖНО. Какое из следующих значений переменных x, y, z, w удовлетворяет этому условию?",
      options: [
        { id: "A", text: "x = 1, y = 0, z = 1, w = 1" },
        { id: "B", text: "x = 1, y = 1, z = 0, w = 1" },
        { id: "C", text: "x = 0, y = 1, z = 0, w = 1" },
        { id: "D", text: "x = 0, y = 0, z = 0, w = 0" }
      ],
      correct: "B",
      explanation: "Давайте подставим вариант B (x=1, y=1, z=0, w=1). Выражение состоит из трех дизъюнктов (ИЛИ): 1) (x ∧ ¬y) = (1 ∧ 0) = 0. 2) (y ≡ z) = (1 ≡ 0) = 0. 3) ¬w = ¬1 = 0. Получаем 0 ∨ 0 ∨ 0 = 0 (ЛОЖЬ). Все условия выполнены!"
    },
    promptSuggestion: "Объясни, как решать Задание 15 на отрезки и множества в ЕГЭ по информатике."
  },
  {
    id: "programming",
    title: "Задание 17 & 24: Программирование и Строки",
    description: "Обработка числовых последовательностей, эффективный поиск в строковых файлах.",
    icon: Code,
    theory: `
### Задание 17: Обработка числовых последовательностей
Обычно задача требует найти количество пар элементов последовательности, удовлетворяющих условиям, и максимальную/минимальную сумму элементов таких пар.

*Пара в теории ЕГЭ — это два подряд идущих элемента последовательности (если не указано иное).*

#### Оптимальный шаблон решения на Python:
\`\`\`python
# Считываем числа из файла
with open("17.txt") as f:
    nums = [int(x) for x in f]

# Находим максимальный элемент, оканчивающийся на 13 (к примеру)
max_13 = max(x for x in nums if x % 100 == 13)

pairs = []
for i in range(len(nums) - 1):
    val1 = nums[i]
    val2 = nums[i+1]
    
    # Условие задачи: только один из элементов оканчивается на 13
    cond1 = (val1 % 100 == 13) != (val2 % 100 == 13)
    # И сумма элементов пары меньше максимального, оканчивающегося на 13
    cond2 = (val1 + val2) < max_13
    
    if cond1 and cond2:
        pairs.append(val1 + val2)

print("Количество:", len(pairs))
print("Максимальная сумма:", max(pairs))
\`\`\`

### Задание 24: Строки
Часто требуется найти максимальную длину цепочки символов, удовлетворяющую условиям (например, не содержащую одинаковых подряд идущих букв).

#### Шаблон метода двух указателей / динамической замены:
\`\`\`python
# Найти макс. длину строки из символов 'A'
s = open("24.txt").read().strip()

# Способ замены (если ищем простые комбинации)
# Например, заменить все 'B' на пробел и сделать split()
# s.replace('B', ' ').split()

# Универсальный алгоритм (один проход):
cur_len = 0
max_len = 0
for i in range(len(s)):
    if s[i] == 'A':
        cur_len += 1
        max_len = max(max_len, cur_len)
    else:
        cur_len = 0
print(max_len)
\`\`\`
    `,
    practice: {
      question: "В текстовом файле находится строка, состоящая из символов A, B, C. Найдите максимальную длину строки, состоящей только из символов A. Если исходная строка: 'ABAAAAACABAA', каков будет правильный ответ?",
      options: [
        { id: "A", text: "2" },
        { id: "B", text: "5" },
        { id: "C", text: "6" },
        { id: "D", text: "8" }
      ],
      correct: "B",
      explanation: "Самая длинная подпоследовательность подряд идущих символов 'A' в строке 'ABAAAAACABAA' — это 'AAAAA' (длиной 5 символов)."
    },
    promptSuggestion: "Покажи эффективный способ решения 24 задания из ЕГЭ по информатике с использованием динамического программирования."
  },
  {
    id: "game-theory",
    title: "Задание 19 - 21: Теория игр",
    description: "Выигрышные стратегии для Пети и Вани. Кучи камней.",
    icon: TargetIcon(),
    theory: `
### Теория игр: Одна и Две кучи камней

Игры на двух игроков (Петя и Ваня) с полной информацией. Мы ищем выигрышные стратегии для каждого шага.

* **Петя** ходит первым ($P_1$).
* **Ваня** ходит вторым ($V_1$).
* И так далее ($P_2, V_2$).

#### Универсальный шаблон на Python с помощью рекурсии:
Рекурсивная функция возвращает тип позиции (выигрышная за $1$ ход, проигрышная за $1$ ход и т.д.):

\`\`\`python
# Простая игра с одной кучей камней. Ходы: +1, +4, *3. Победитель: >= 50 камней.
def game(h):
    # Возможные ходы из кучи размера h
    moves = [h + 1, h + 4, h * 3]
    
    # Условие победы
    if any(m >= 50 for m in moves):
         return "P1" # Петя может победить за один ход
         
    # Если все ходы Пети ведут в позиции, где следующим ходом выигрывают (P1)
    # Значит это выигрышная позиция для Вани (V1)
    if all(game(m) == "P1" for m in moves):
         return "V1"
         
    # Петя может пойти туда, откуда Ваня гарантированно проигрывает за 1 ход (V1)
    if any(game(m) == "V1" for m in moves):
         return "P2"
         
    # Ваня может ответить так, чтобы Петя проиграл (вынужденно попал на P1 или V1)
    if all(game(m) in ["P1", "P2"] for m in moves):
         return "V2"
         
    return None

# Ищем нужные кучи:
for s in range(1, 50):
    print(f"При S = {s}: {game(s)}")
\`\`\`
    `,
    practice: {
      question: "В игре с одной кучей камней игроки могут делать ходы: добавить 1 камень или увеличить количество камней в куче в 3 раза. Игра завершается, когда в куче становится не менее 30 камней. В начальный момент было S камней (1 ≤ S < 30). Укажите минимальное значение S, при котором Петя может выиграть своим первым ходом.",
      options: [
        { id: "A", text: "10" },
        { id: "B", text: "9" },
        { id: "C", text: "15" },
        { id: "D", text: "11" }
      ],
      correct: "A",
      explanation: "Для победы первым ходом Пете нужно получить не менее 30 камней. Лучший ход — умножение на 3. Значит, 3 * S >= 30, откуда S >= 10. Минимальное целое значение S = 10."
    },
    promptSuggestion: "Напиши универсальный рекурсивный код на Python для игры с двумя кучами камней (Задания 19, 20, 21)."
  },
  {
    id: "dynamic-programming",
    title: "Задание 23: Динамическое программирование",
    description: "Количество программ, преобразующих число А в число B.",
    icon: Layers,
    theory: `
### Задание 23: Количество траекторий вычислений
В этом задании требуется найти количество программ, которые преобразуют число $A$ в число $B$ с помощью набора команд (например: \`прибавить 1\`, \`умножить на 2\`), при этом траектория вычислений **обязательно содержит** число $C$ и/или **не содержит** число $D$.

#### Метод рекурсивной функции:
Мы можем реализовать функцию \`f(start, end)\`, которая считает количество путей из \`start\` в \`end\`.

\`\`\`python
def f(x, y):
    if x > y: 
        return 0 # Проскочили цель
    if x == y: 
        return 1 # Путь успешно найден
        
    # Команды: +1, *2
    return f(x + 1, y) + f(x * 2, y)

# Если нужно пройти через 10 и избежать 15 при переводе из 2 в 20:
# Итоговый результат равен: f(2, 10) * f(10, 20)
# Но внутри функции нужно обработать точку избегания (15):

def f_with_avoid(x, y):
    if x > y or x == 15: # 15 избегаем, возвращаем 0
        return 0
    if x == y:
        return 1
    return f_with_avoid(x + 1, y) + f_with_avoid(x * 2, y)

print(f_with_avoid(2, 10) * f_with_avoid(10, 20))
\`\`\`
    `,
    practice: {
      question: "Исполнитель преобразует число на экране. Команды: (+1), (*2). Сколько существует программ, которые преобразуют исходное число 2 в число 12, при этом траектория вычислений содержит число 6?",
      options: [
        { id: "A", text: "8" },
        { id: "B", text: "10" },
        { id: "C", text: "12" },
        { id: "D", text: "15" }
      ],
      correct: "B",
      explanation: "Разбиваем задачу на две части: пути от 2 до 6, и пути от 6 до 12.\n1) От 2 до 6: f(2,6) = f(3,6) + f(4,6) = 5.\n2) От 6 до 12: f(6,12) = 2.\nИтого: f(2,6) * f(6,12) = 5 * 2 = 10."
    },
    promptSuggestion: "Как решать Задание 23, если команд много, например +1, +2, *3, и есть ограничения на избегание сразу двух чисел?"
  }
];

// Функция иконки мишени (Теория игр)
function TargetIcon() {
  return () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <circle cx="12" cy="12" r="6" />
      <circle cx="12" cy="12" r="2" />
    </svg>
  );
}

export default function App() {
  const [activeTab, setActiveTab] = useState("logic");
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      text: "Привет! Я твой персональный ИИ-ассистент по подготовке к ЕГЭ по информатике. 🤖\n\nЯ знаю все тонкости экзамена, могу написать и объяснить код на Python, разобрать сложные логические уравнения или помочь с решением любой задачи. \n\nВыбери тему слева или отправь мне свой вопрос!",
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [quizAnswer, setQuizAnswer] = useState(null);
  const [quizChecked, setQuizChecked] = useState(false);
  const [showScoreModal, setShowScoreModal] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  const activeTopic = COURSE_DATA.find(t => t.id === activeTab);

  // Сброс квиза при смене вкладки
  useEffect(() => {
    setQuizAnswer(null);
    setQuizChecked(false);
  }, [activeTab]);

  // Экспоненциальный бэк-офф для вызовов Gemini API
  const fetchGeminiWithRetry = async (payload) => {
  // Мы делаем запрос к нашему собственному серверу-посреднику (Serverless API)
  const response = await fetch('/api/chat', {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      // Передаем историю переписки на сервер
      contents: payload.contents,
      systemInstruction: payload.systemInstruction
    })
  });
  
  if (!response.ok) {
    throw new Error(`Ошибка сервера: ${response.status}`);
  }
  
  return await response.json();
};


  const handleSendMessage = async (textToSend) => {
    const messageText = textToSend || inputValue;
    if (!messageText.trim()) return;

    if (!textToSend) setInputValue("");

    const userMessage = {
      role: "user",
      text: messageText,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMessage]);
    setIsLoading(true);

    // Подготовка системного промпта
    const systemPrompt = `Ты — профессиональный репетитор и ИИ-ассистент по подготовке к ЕГЭ по информатике в России.
Твоя цель — помогать ученикам осваивать материал, терпеливо объяснять алгоритмы, помогать с написанием чистого, понятного и эффективного кода на Python.
Правила общения:
1. Отвечай дружелюбно, профессионально, на русском языке.
2. Используй LaTeX-разметку для формул (например, $A \\land B$ или $$x \\in A$$), чтобы формулы красиво рендерились.
3. Код оборачивай в блоки с указанием языка (например, \`\`\`python ... \`\`\`).
4. Старайся не просто давать готовый код решения, а объяснять логику шагов, чтобы ученик понял концепцию.
5. Отсылайся к спецификациям ЕГЭ по информатике актуального года (структура заданий, шкала баллов, КЕГЭ особенности).
Текущая выбранная учеником тема: ${activeTopic.title}. При необходимости строй контекст вокруг неё.`;

    try {
      // Подготовка истории сообщений для Gemini API
      // Ограничим историю последними 10 сообщениями, чтобы уложиться в лимиты
      const recentMessages = messages.slice(-4).map(msg => ({
        role: msg.role === "assistant" ? "model" : "user",
        parts: [{ text: msg.text }]
      }));

      // Добавляем текущее сообщение
      recentMessages.push({
        role: "user",
        parts: [{ text: messageText }]
      });

      const payload = {
        contents: recentMessages,
        systemInstruction: {
          parts: [{ text: systemPrompt }]
        }
      };

      const data = await fetchчy(payload);
      const aiText = data.candidates?.[0]?.content?.parts?.[0]?.text || "Извини, не удалось получить ответ от системы ИИ.";

      setMessages(prev => [...prev, {
        role: "assistant",
        text: aiText,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }]);

    } catch (error) {
      console.error(error);
      setMessages(prev => [...prev, {
        role: "assistant",
        text: "Произошла ошибка при отправке запроса ИИ. Пожалуйста, попробуйте еще раз. Возможно, стоит проверить подключение или перезагрузить страницу.",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  const checkQuizAnswer = () => {
    if (!quizAnswer) return;
    setQuizChecked(true);
  };

  // Парсинг Markdown-подобного текста (упрощенный для базовой разметки в теории)
  const parseMarkdown = (text) => {
    if (!text) return "";
    return text.split('\n').map((line, idx) => {
      // Заголовки
      if (line.startsWith('### ')) {
        return <h3 key={idx} className="text-xl font-bold text-slate-100 mt-6 mb-3 border-b border-slate-800 pb-2 flex items-center gap-2"><Lightbulb className="text-amber-400 w-5 h-5"/> {line.replace('### ', '')}</h3>;
      }
      if (line.startsWith('#### ')) {
        return <h4 key={idx} className="text-lg font-semibold text-teal-400 mt-4 mb-2">{line.replace('#### ', '')}</h4>;
      }
      if (line.startsWith('**') && line.endsWith('**')) {
        return <p key={idx} className="font-bold text-slate-200 mt-2">{line.replaceAll('**', '')}</p>;
      }
      // Списки
      if (line.trim().startsWith('*') || line.trim().startsWith('-')) {
        return <li key={idx} className="ml-6 list-disc text-slate-300 my-1">{line.replace(/^[\s*-]+/, '')}</li>;
      }
      // Кодовые блоки (упрощенное отображение)
      if (line.trim().startsWith('```')) {
        return null; // Управляется далее или игнорируется для простоты оформления
      }
      // Обычный абзац
      return line.trim() ? <p key={idx} className="text-slate-300 leading-relaxed my-2">{line}</p> : <div key={idx} className="h-2" />;
    });
  };

  // Выделение блоков кода в теории
  const renderTheory = (theoryText) => {
    const parts = theoryText.split('```');
    return parts.map((part, index) => {
      if (index % 2 === 1) {
        // Это блок кода
        const lines = part.split('\n');
        const language = lines[0].trim();
        const code = lines.slice(1).join('\n');
        return (
          <div key={index} className="my-4 rounded-lg overflow-hidden border border-slate-700 bg-slate-950 font-mono text-sm">
            <div className="flex items-center justify-between px-4 py-2 bg-slate-900 border-b border-slate-800 text-slate-400 text-xs">
              <span className="flex items-center gap-2"><Terminal className="w-4 h-4 text-emerald-400" />{language.toUpperCase() || 'CODE'}</span>
              <button 
                onClick={() => {
                  navigator.clipboard.writeText(code);
                }} 
                className="hover:text-emerald-400 transition-colors"
                title="Копировать код"
              >
                Копировать
              </button>
            </div>
            <pre className="p-4 overflow-x-auto text-emerald-400">
              <code>{code}</code>
            </pre>
          </div>
        );
      }
      // Обычный текст
      return <div key={index}>{parseMarkdown(part)}</div>;
    });
  };

  // Рендеринг текста сообщений чата (парсинг блоков кода и обычного текста)
  const renderMessageContent = (text) => {
    const parts = text.split('```');
    return parts.map((part, index) => {
      if (index % 2 === 1) {
        const lines = part.split('\n');
        const language = lines[0].trim() || 'python';
        const code = lines.slice(1).join('\n');
        return (
          <div key={index} className="my-2 rounded-lg overflow-hidden border border-slate-800 bg-slate-950 font-mono text-xs w-full max-w-full">
            <div className="flex items-center justify-between px-3 py-1.5 bg-slate-900 border-b border-slate-800 text-slate-400">
              <span>{language}</span>
              <button 
                onClick={() => navigator.clipboard.writeText(code)}
                className="text-[10px] bg-slate-800 hover:bg-slate-750 px-2 py-0.5 rounded text-slate-300"
              >
                Копировать
              </button>
            </div>
            <pre className="p-3 overflow-x-auto text-emerald-300">
              <code>{code}</code>
            </pre>
          </div>
        );
      }
      
      // Обработка inline-кода `code` и простых переносов строк
      const inlineParts = part.split('`');
      return (
        <span key={index} className="whitespace-pre-wrap">
          {inlineParts.map((subPart, subIdx) => {
            if (subIdx % 2 === 1) {
              return <code key={subIdx} className="bg-slate-800/80 text-emerald-300 px-1.5 py-0.5 rounded font-mono text-xs">{subPart}</code>;
            }
            return subPart;
          })}
        </span>
      );
    });
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-emerald-500 selection:text-slate-950">
      
      {/* Шапка */}
      <header className="sticky top-0 z-40 bg-slate-900/90 backdrop-blur-md border-b border-slate-800 px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-slate-400 hover:text-white md:hidden hover:bg-slate-800 rounded-lg"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
          
          <div className="flex items-center gap-2">
            <div className="bg-gradient-to-tr from-emerald-500 to-indigo-600 p-2 rounded-xl text-white shadow-lg shadow-emerald-500/10">
              <Sparkles className="w-6 h-6 animate-pulse" />
            </div>
            <div>
              <h1 className="font-bold text-lg leading-tight flex items-center gap-1.5 bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent">
                ЕГЭ Информатика <span className="text-xs bg-emerald-500/20 text-emerald-400 font-semibold px-2 py-0.5 rounded-full uppercase tracking-wider">ИИ-Тьютор</span>
              </h1>
              <p className="text-xs text-slate-400 hidden sm:block">Интерактивный учебник с умным ассистентом</p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="hidden sm:flex items-center gap-2 bg-slate-850 px-3 py-1.5 rounded-lg border border-slate-800 text-xs">
            <Award className="text-amber-400 w-4 h-4" />
            <span className="text-slate-300 font-medium">Статус: Подготовка к 100 баллам</span>
          </div>
          <button 
            onClick={() => handleSendMessage("Привет! Дай мне сложную задачу из КЕГЭ по информатике для разминки.")}
            className="bg-emerald-600 hover:bg-emerald-500 active:bg-emerald-700 transition-all text-white font-semibold text-xs px-3 py-2 rounded-lg flex items-center gap-1.5 shadow-md shadow-emerald-600/20"
          >
            <BrainCircuit className="w-4 h-4" /> Разминка
          </button>
        </div>
      </header>

      {/* Основной контейнер */}
      <div className="flex-1 flex flex-col md:flex-row relative overflow-hidden">
        
        {/* Боковая панель - Темы (Десктоп) */}
        <aside className={`
          fixed inset-y-0 left-0 z-30 w-72 bg-slate-900 border-r border-slate-800 transform transition-transform duration-300 ease-in-out pt-16 md:pt-0 md:static md:translate-x-0
          ${mobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}
        `}>
          <div className="p-4 h-full flex flex-col justify-between overflow-y-auto">
            <div>
              <div className="flex items-center gap-2 text-slate-400 text-xs font-semibold uppercase tracking-wider mb-4 px-2">
                <BookOpen className="w-4 h-4 text-indigo-400" />
                Разделы методички
              </div>
              
              <nav className="space-y-1.5">
                {COURSE_DATA.map((topic) => {
                  const TopicIcon = topic.icon;
                  const isActive = activeTab === topic.id;
                  return (
                    <button
                      key={topic.id}
                      onClick={() => {
                        setActiveTab(topic.id);
                        setMobileMenuOpen(false);
                      }}
                      className={`w-full text-left p-3.5 rounded-xl transition-all flex gap-3 group border ${
                        isActive 
                          ? 'bg-gradient-to-r from-emerald-950 to-slate-900 border-emerald-500/40 text-white shadow-md shadow-emerald-950/20' 
                          : 'bg-transparent border-transparent text-slate-450 hover:bg-slate-850 hover:text-slate-200'
                      }`}
                    >
                      <div className={`p-2 rounded-lg transition-colors ${
                        isActive ? 'bg-emerald-500 text-slate-950' : 'bg-slate-800 group-hover:bg-slate-700 text-slate-300'
                      }`}>
                        <TopicIcon className="w-5 h-5" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="font-semibold text-sm truncate">{topic.title}</div>
                        <p className="text-xs text-slate-400 truncate mt-0.5">{topic.description}</p>
                      </div>
                    </button>
                  );
                })}
              </nav>
            </div>

            <div className="mt-8 p-4 rounded-xl bg-gradient-to-br from-indigo-950 to-slate-900 border border-indigo-500/20 text-slate-350 text-xs">
              <div className="flex items-center gap-2 font-bold text-indigo-300 mb-1">
                <Sparkles className="w-4 h-4" /> Как использовать ИИ?
              </div>
              Задавай вопросы прямо в чате справа! ИИ видит выбранный тобой урок и поможет написать Python-код, исправить ошибки в твоем коде или объяснить сложную теорию своими словами.
            </div>
          </div>
        </aside>

        {/* Затемнение фона при открытом мобильном меню */}
        {mobileMenuOpen && (
          <div 
            onClick={() => setMobileMenuOpen(false)}
            className="fixed inset-0 z-20 bg-black/60 md:hidden"
          />
        )}

        {/* Контентная зона: Теория и Практика */}
        <main className="flex-1 overflow-y-auto p-4 md:p-6 lg:p-8 space-y-8 max-w-4xl mx-auto w-full pb-24">
          
          {/* Хлебные крошки / Название */}
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-xs text-emerald-400 font-semibold uppercase tracking-wider">
              <span>Методическая база</span>
              <ChevronRight className="w-3.5 h-3.5 text-slate-600" />
              <span>{activeTopic.title.split(":")[0]}</span>
            </div>
            <h2 className="text-3xl font-extrabold text-white tracking-tight">{activeTopic.title}</h2>
            <p className="text-slate-400 text-sm md:text-base leading-relaxed">{activeTopic.description}</p>
          </div>

          {/* Карточка теории */}
          <section className="bg-slate-900/60 rounded-2xl border border-slate-800/80 p-5 md:p-7 shadow-xl backdrop-blur-sm relative overflow-hidden">
            <div className="absolute top-0 left-0 w-2 h-full bg-emerald-500" />
            <div className="flex items-center gap-2.5 mb-6">
              <BookMarked className="w-5 h-5 text-emerald-400" />
              <h3 className="text-lg font-bold text-white">Теоретический минимум</h3>
            </div>
            <div className="prose prose-invert max-w-none text-slate-300">
              {renderTheory(activeTopic.theory)}
            </div>
          </section>

          {/* Интерактивный Квиз / Проверка знаний */}
          <section className="bg-slate-900/60 rounded-2xl border border-slate-800/80 p-5 md:p-7 shadow-xl backdrop-blur-sm relative">
            <div className="absolute top-0 left-0 w-2 h-full bg-indigo-500" />
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-2.5">
                <HelpCircle className="w-5 h-5 text-indigo-400" />
                <h3 className="text-lg font-bold text-white">Быстрый тест для самопроверки</h3>
              </div>
              <span className="text-xs bg-indigo-500/15 text-indigo-300 font-semibold px-2.5 py-1 rounded-lg">1 балл ЕГЭ</span>
            </div>

            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 font-medium text-slate-200">
                {activeTopic.practice.question}
              </div>

              <div className="grid grid-cols-1 gap-3">
                {activeTopic.practice.options.map((option) => {
                  const isSelected = quizAnswer === option.id;
                  let optionClass = "bg-slate-850 hover:bg-slate-800 border-slate-800 text-slate-350";
                  
                  if (isSelected) {
                    optionClass = "bg-indigo-950/40 border-indigo-500 text-indigo-200";
                  }
                  
                  if (quizChecked) {
                    if (option.id === activeTopic.practice.correct) {
                      optionClass = "bg-emerald-950/40 border-emerald-500 text-emerald-200";
                    } else if (isSelected && option.id !== activeTopic.practice.correct) {
                      optionClass = "bg-rose-950/40 border-rose-500 text-rose-200";
                    }
                  }

                  return (
                    <button
                      key={option.id}
                      disabled={quizChecked}
                      onClick={() => setQuizAnswer(option.id)}
                      className={`w-full text-left p-4 rounded-xl border transition-all flex items-center justify-between font-medium text-sm ${optionClass}`}
                    >
                      <span>{option.text}</span>
                      <div className="flex items-center gap-2">
                        {quizChecked && option.id === activeTopic.practice.correct && (
                          <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                        )}
                        {quizChecked && isSelected && option.id !== activeTopic.practice.correct && (
                          <XCircle className="w-5 h-5 text-rose-400" />
                        )}
                        <span className={`text-xs px-2 py-0.5 rounded ${
                          isSelected ? 'bg-indigo-500 text-white' : 'bg-slate-800 text-slate-400'
                        }`}>
                          Вариант {option.id}
                        </span>
                      </div>
                    </button>
                  );
                })}
              </div>

              <div className="flex items-center justify-between pt-2">
                {!quizChecked ? (
                  <button
                    onClick={checkQuizAnswer}
                    disabled={!quizAnswer}
                    className={`px-5 py-2.5 rounded-xl font-bold text-sm transition-all flex items-center gap-2 ${
                      quizAnswer 
                        ? 'bg-indigo-600 hover:bg-indigo-500 text-white shadow-md shadow-indigo-600/20' 
                        : 'bg-slate-800 text-slate-500 cursor-not-allowed'
                    }`}
                  >
                    <CheckCircle2 className="w-4 h-4" /> Проверить ответ
                  </button>
                ) : (
                  <button
                    onClick={() => {
                      setQuizAnswer(null);
                      setQuizChecked(false);
                    }}
                    className="px-5 py-2.5 rounded-xl font-bold text-sm bg-slate-800 hover:bg-slate-700 text-slate-200 transition-all flex items-center gap-2 border border-slate-700"
                  >
                    <RefreshCw className="w-4 h-4" /> Попробовать снова
                  </button>
                )}
                
                <button
                  onClick={() => {
                    handleSendMessage(`Я решаю задачу в теме "${activeTopic.title}". Вот условие: "${activeTopic.practice.question}". Подскажи, какой правильный подход использовать для решения?`);
                  }}
                  className="text-xs text-indigo-400 hover:text-indigo-300 font-semibold flex items-center gap-1 hover:underline"
                >
                  <Lightbulb className="w-4 h-4" /> Спросить у ИИ подсказку
                </button>
              </div>

              {quizChecked && (
                <div className={`p-4 rounded-xl border mt-4 text-sm animate-fadeIn ${
                  quizAnswer === activeTopic.practice.correct 
                    ? 'bg-emerald-950/20 border-emerald-500/30 text-emerald-300' 
                    : 'bg-rose-950/20 border-rose-500/30 text-rose-300'
                }`}>
                  <div className="font-bold mb-1">
                    {quizAnswer === activeTopic.practice.correct ? "🎉 Правильно! Отличный результат." : "😢 К сожалению, ответ неверный."}
                  </div>
                  <p className="opacity-90">{activeTopic.practice.explanation}</p>
                </div>
              )}
            </div>
          </section>

          {/* Быстрые подсказки по разделу */}
          <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 flex items-start gap-3">
            <div className="p-2 bg-emerald-500/10 text-emerald-400 rounded-lg shrink-0">
              <Lightbulb className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-bold text-sm text-white">Совет эксперта ЕГЭ по этой теме:</h4>
              <p className="text-xs text-slate-400 mt-1">
                Всегда проверяйте граничные значения переменных в циклах Python. Ошибки на "плюс-минус один" в рекурсии и интервалах — самые частые причины потери баллов в заданиях {activeTopic.title.split(':')[0]}.
              </p>
            </div>
          </div>

        </main>

        {/* Правая панель - ИИ-Ассистент */}
        <section className="w-full md:w-[420px] bg-slate-900 border-t md:border-t-0 md:border-l border-slate-800 flex flex-col h-[500px] md:h-auto shrink-0 z-10">
          
          {/* Хэдер ассистента */}
          <div className="p-4 bg-slate-900 border-b border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="relative">
                <div className="bg-emerald-500/20 p-2 rounded-xl text-emerald-400">
                  <MessageSquare className="w-5 h-5" />
                </div>
                <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-500 border-2 border-slate-900 rounded-full animate-pulse" />
              </div>
              <div>
                <h3 className="font-bold text-sm text-white flex items-center gap-1.5">
                  Тьютор по информатике
                </h3>
                <p className="text-[11px] text-slate-400 flex items-center gap-1">
                  Онлайн • на базе Gemini-2.5
                </p>
              </div>
            </div>

            <button 
              onClick={() => setMessages([
                {
                  role: "assistant",
                  text: "Привет! Диалог очищен. О каком задании или теме ты хочешь поговорить сейчас?",
                  timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
                }
              ])}
              className="text-slate-400 hover:text-white hover:bg-slate-800 p-2 rounded-lg transition-all"
              title="Очистить чат"
            >
              <RefreshCw className="w-4 h-4" />
            </button>
          </div>

          {/* Быстрые вопросы на основе текущего контекста */}
          <div className="px-4 py-2 bg-slate-900/40 border-b border-slate-800/60 overflow-x-auto whitespace-nowrap scrollbar-none flex gap-2">
            <button
              onClick={() => handleSendMessage(activeTopic.promptSuggestion)}
              className="text-[10px] font-semibold bg-indigo-500/10 hover:bg-indigo-500/20 border border-indigo-500/20 text-indigo-300 py-1.5 px-3 rounded-full transition-all shrink-0 flex items-center gap-1"
            >
              <Sparkles className="w-3 h-3 text-indigo-400" /> Задать вопрос по теме
            </button>
            <button
              onClick={() => handleSendMessage("Покажи пример решения задания 24 на Python с разбором строк.")}
              className="text-[10px] font-semibold bg-slate-800 hover:bg-slate-750 text-slate-300 py-1.5 px-3 rounded-full transition-all shrink-0"
            >
              Код Задания 24
            </button>
            <button
              onClick={() => handleSendMessage("Дай мне чек-лист тем для подготовки к ЕГЭ с нуля.")}
              className="text-[10px] font-semibold bg-slate-800 hover:bg-slate-750 text-slate-300 py-1.5 px-3 rounded-full transition-all shrink-0"
            >
              План на 100 баллов
            </button>
          </div>

          {/* История сообщений */}
          <div className="flex-1 p-4 overflow-y-auto space-y-4 bg-slate-900/30">
            {messages.map((msg, index) => {
              const isAssistant = msg.role === "assistant";
              return (
                <div 
                  key={index} 
                  className={`flex gap-3 max-w-[90%] ${isAssistant ? 'mr-auto' : 'ml-auto flex-row-reverse'}`}
                >
                  <div className={`p-2 h-8 w-8 rounded-lg shrink-0 flex items-center justify-center font-bold text-xs ${
                    isAssistant ? 'bg-emerald-600 text-white' : 'bg-indigo-600 text-white'
                  }`}>
                    {isAssistant ? 'ИИ' : 'Я'}
                  </div>
                  
                  <div className="space-y-1">
                    <div className={`p-3.5 rounded-2xl text-sm leading-relaxed ${
                      isAssistant 
                        ? 'bg-slate-850 text-slate-200 rounded-tl-none border border-slate-800' 
                        : 'bg-indigo-600 text-white rounded-tr-none'
                    }`}>
                      {isAssistant ? renderMessageContent(msg.text) : msg.text}
                    </div>
                    <span className={`text-[10px] text-slate-500 block ${!isAssistant && 'text-right'}`}>
                      {msg.timestamp}
                    </span>
                  </div>
                </div>
              );
            })}

            {isLoading && (
              <div className="flex gap-3 max-w-[80%] mr-auto">
                <div className="p-2 h-8 w-8 rounded-lg bg-emerald-600 text-white shrink-0 flex items-center justify-center text-xs animate-pulse">
                  ИИ
                </div>
                <div className="bg-slate-850 border border-slate-800 p-3.5 rounded-2xl rounded-tl-none text-sm text-slate-400 flex items-center gap-2">
                  <div className="flex space-x-1.5">
                    <div className="w-2.5 h-2.5 bg-emerald-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                    <div className="w-2.5 h-2.5 bg-emerald-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                    <div className="w-2.5 h-2.5 bg-emerald-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                  </div>
                  <span className="text-xs font-medium text-slate-400">Формулирую объяснение...</span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Форма отправки сообщения */}
          <div className="p-4 bg-slate-900 border-t border-slate-800">
            <form 
              onSubmit={(e) => {
                e.preventDefault();
                handleSendMessage();
              }}
              className="relative"
            >
              <textarea
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Задай вопрос по теме, коду или задаче..."
                rows="2"
                className="w-full bg-slate-950 border border-slate-800 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 rounded-xl py-2.5 pl-3.5 pr-12 text-sm text-slate-100 placeholder-slate-500 resize-none transition-all outline-none"
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    handleSendMessage();
                  }
                }}
              />
              <button
                type="submit"
                disabled={!inputValue.trim() || isLoading}
                className={`absolute right-2.5 bottom-3.5 p-2 rounded-lg transition-all ${
                  inputValue.trim() && !isLoading
                    ? 'bg-emerald-600 hover:bg-emerald-500 text-white shadow-md shadow-emerald-600/10'
                    : 'text-slate-600 cursor-not-allowed'
                }`}
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
            <div className="flex justify-between items-center mt-2 px-1">
              <span className="text-[10px] text-slate-500">
                Shift + Enter для новой строки
              </span>
              <span className="text-[10px] text-slate-500 flex items-center gap-1">
                <Code className="w-3 h-3 text-emerald-500" /> Поддерживает Python
              </span>
            </div>
          </div>

        </section>

      </div>
    </div>
  );
}