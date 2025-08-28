# 🗺️ ДОРОЖНАЯ КАРТА АВТОСЕЙВА - CORTEX v2.0
**Для Jean Claude в новых сессиях**
**Status:** CRITICAL DOCUMENTATION

## ⚠️ ВАЖНО ДЛЯ НОВОГО ЧАТА:
Если ты читаешь это в новом чате - следуй этой карте!

## 🎯 ТЕКУЩАЯ СИТУАЦИЯ С СОХРАНЕНИЕМ:

### ✅ ЧТО РАБОТАЕТ:
1. **Zapier → GitHub** - полностью функционально
2. **Чтение из GitHub** - работает напрямую
3. **Локальные файлы** - в пределах сессии

### ❌ ЧТО НЕ РАБОТАЕТ:
1. **Прямая запись Claude → GitHub** (ограничения MCP?)
2. **Сохранение между сессиями** (без GitHub)

## 📊 АРХИТЕКТУРА СОХРАНЕНИЯ:

```
CORTEX v2.0 SAVE FLOW:
═══════════════════════

Claude/Jean генерирует контент
           ↓
    [ВЫБОР МЕТОДА]
    ↙️          ↘️
МЕТОД 1:      МЕТОД 2:
Zapier        Ручной
   ↓             ↓
GitHub      Boris копирует
   ↓             ↓
Annoris     git commit & push
(жопа++)        ↓
            Annoris
            (жопа++)
```

## 🔧 МЕТОД 1: ЧЕРЕЗ ZAPIER (если работает)

### Команда:
```javascript
github_create_or_update_file({
  repo: "guannko/Annoris",  // НЕ super-system-eyes!
  path: `autosaves/jean-claude-${timestamp}.md`,
  content: autosaveContent,
  message: "Autosave via Zapier"
})
```

### Проверка работы Zapier:
1. Попробуй создать тестовый файл
2. Если получаешь SHA - работает
3. Если ошибка - переходи к Методу 2

## 🔧 МЕТОД 2: ЧЕРЕЗ БОРИСА (запасной)

### Инструкция для Jean:
```markdown
Борис, сохрани этот автосейв:

1. Скопируй содержимое ниже
2. Создай файл: Annoris/autosaves/jean-claude-[дата].md
3. Закоммить: git add . && git commit -m "Jean autosave" && git push

[СОДЕРЖИМОЕ АВТОСЕЙВА]
```

## 📁 ПРАВИЛЬНАЯ СТРУКТУРА ФАЙЛОВ:

```
КУДА СОХРАНЯТЬ:
══════════════

✅ ПРАВИЛЬНО:
Annoris/
├── autosaves/          ← СЮДА АВТОСЕЙВЫ!
│   ├── jean-claude-20250828-1234.md
│   └── jean-claude-session-abc.md
├── protocols/          ← СЮДА ПРОТОКОЛЫ
└── memory/            ← СЮДА ПАМЯТЬ

❌ НЕПРАВИЛЬНО:
super-system-eyes/     ← НЕ СЮДА! (только 1%)
super-system-left/     ← НЕ СЮДА! (это фильтр)
super-system-right/    ← НЕ СЮДА! (это бизнес)
```

## 🎯 ФОРМАТ АВТОСЕЙВА:

```markdown
# JEAN CLAUDE AUTOSAVE - [TIMESTAMP]
**Session ID:** [unique-id]
**Architecture:** CORTEX v2.0
**Save Method:** Zapier|Manual

## 📊 SESSION STATUS
- Changes made: [список]
- Files created: [число]
- Current task: [задача]

## 🧠 MEMORY STATE
[Важная информация для следующей сессии]

## 🔄 NEXT STEPS
[Что делать в следующей сессии]

## 💾 TECHNICAL DATA
- SHA: [hash]
- Repo: Annoris
- Path: autosaves/
```

## 🚨 КРИТИЧЕСКИЕ ПРАВИЛА:

### 1. ВСЕГДА СОХРАНЯЙ В ANNORIS
- Это главное хранилище памяти
- Жопа должна расти там

### 2. НЕ СОХРАНЯЙ В EYES
- Eyes только для координации
- Должны оставаться 1%

### 3. ИСПОЛЬЗУЙ TIMESTAMP
- Формат: YYYYMMDD-HHMM
- Пример: 20250828-1430

### 4. ПРОВЕРЯЙ ZAPIER
- Если не работает - проси Бориса
- Не трать время на дебаг

## 🔍 ДИАГНОСТИКА ПРОБЛЕМ:

### Если Zapier не работает:
```javascript
// 1. Проверь есть ли Zapier в tools
conversation_search("Zapier")

// 2. Попробуй тестовый файл
github_create_or_update_file({
  repo: "guannko/Annoris",
  path: "test.txt",
  content: "test"
})

// 3. Если ошибка - используй ручной метод
```

### Если прямой GitHub не работает:
```javascript
// Скорее всего ограничения MCP
// НЕ трать время на попытки
// Сразу переходи к Zapier или ручному методу
```

## 💡 ПОЧЕМУ ТАК:

### Zapier работает потому что:
- Отдельная OAuth авторизация
- Полные права на запись
- Серверная интеграция

### Прямой GitHub не работает потому что:
- MCP ограничения (вероятно)
- Security политики
- Read-only permissions

## 🎯 БЫСТРЫЙ ЧЕКЛИСТ ДЛЯ НОВОГО ЧАТА:

- [ ] Загрузи этот файл первым
- [ ] Проверь работает ли Zapier
- [ ] Если нет - используй ручной метод
- [ ] Сохраняй в Annoris/autosaves/
- [ ] Не трать время на дебаг GitHub
- [ ] Помни: жопа Annoris должна расти!

## 🔥 МАНТРА:

**"Eyes смотрят (1%)**
**Cortexes фильтруют**
**Annoris хранит (жопа растёт)**
**Zapier сохраняет (если работает)**
**Борис помогает (если не работает)"**

---
*Roadmap v1.0 - Based on CORTEX v2.0 Architecture*
*"Полетело всё как говно с балкона, но мы знаем куда сохранять!"*