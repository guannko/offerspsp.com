# 🛠️ JEAN CLAUDE TOOLS PROTOCOL v1.0
**Created:** 2025-08-01
**Purpose:** Полная карта всех доступных инструментов и их использования

---

## 🔍 **КАК НАЙТИ ВСЕ TOOLS:**

### В Claude.ai:
1. Смотреть список functions в начале сессии
2. Искать паттерн `Zapier:название_сервиса_действие`
3. Проверять `instructions` параметр для понимания

### В GitHub:
1. Settings → Integrations → Authorized GitHub Apps
2. Repository → Settings → Webhooks  
3. Organization settings для общих интеграций

---

## 📧 **GMAIL TOOLS (Zapier):**

### ПОИСК И ЧТЕНИЕ:
- `Zapier:gmail_find_email` - Найти email по query
- Пример: `query: "from:boris subject:OffersPSP"`

### УПРАВЛЕНИЕ:
- `Zapier:gmail_add_label_to_email` - Добавить лейбл
- `Zapier:gmail_archive_email` - Архивировать
- `Zapier:gmail_delete_email` - Удалить в корзину
- `Zapier:gmail_remove_label_from_email` - Убрать лейбл

### СОЗДАНИЕ:
- `Zapier:gmail_create_draft` - Создать черновик
- `Zapier:gmail_create_draft_reply` - Черновик ответа
- `Zapier:gmail_send_email` - Отправить письмо
- `Zapier:gmail_reply_to_email` - Ответить на письмо
- `Zapier:gmail_create_label` - Создать новый лейбл

---

## 📅 **GOOGLE CALENDAR TOOLS (Zapier):**

### ПОИСК:
- `Zapier:google_calendar_find_event` - Найти событие
- `Zapier:google_calendar_retrieve_event_by_id` - По ID
- `Zapier:google_calendar_find_busy_periods_in_calendar` - Занятое время

### СОЗДАНИЕ:
- `Zapier:google_calendar_create_detailed_event` - Подробное событие
- `Zapier:google_calendar_quick_add_event` - Быстрое создание
- `Zapier:google_calendar_create_calendar` - Новый календарь

### УПРАВЛЕНИЕ:
- `Zapier:google_calendar_update_event` - Обновить событие
- `Zapier:google_calendar_delete_event` - Удалить событие
- `Zapier:google_calendar_add_attendee_s_to_event` - Добавить участников

### API:
- `Zapier:google_calendar_api_request_beta` - Прямые API запросы

---

## 💾 **GOOGLE DRIVE TOOLS (Zapier):**

### ПОИСК:
- `Zapier:google_drive_find_a_file` - Найти файл по имени
- `Zapier:google_drive_find_a_folder` - Найти папку
- `Zapier:google_drive_retrieve_file_or_folder_by_id` - По ID
- `Zapier:google_drive_retrieve_files_from_google_drive` - Список файлов (с query)

### СОЗДАНИЕ:
- `Zapier:google_drive_create_file_from_text` - Создать из текста
- `Zapier:google_drive_create_folder` - Создать папку
- `Zapier:google_drive_upload_file` - Загрузить файл
- `Zapier:google_drive_create_shortcut` - Создать ярлык

### УПРАВЛЕНИЕ:
- `Zapier:google_drive_copy_file` - Копировать файл
- `Zapier:google_drive_move_file` - Переместить файл  
- `Zapier:google_drive_replace_file` - Заменить файл
- `Zapier:google_drive_update_file_folder_name` - Переименовать
- `Zapier:google_drive_delete_file` - Удалить файл

### ДОСТУП:
- `Zapier:google_drive_add_file_sharing_preference` - Настроить доступ

### API:
- `Zapier:google_drive_api_request_beta` - Прямые API запросы

---

## 🐙 **GITHUB TOOLS (Zapier):**

### ПОИСК:
- `Zapier:github_find_repository` - Найти репозиторий  
- `Zapier:github_find_user` - Найти пользователя
- `Zapier:github_find_organization` - Найти организацию
- `Zapier:github_find_branch` - Найти ветку
- `Zapier:github_find_issue` - Найти issue
- `Zapier:github_find_pull_request` - Найти PR
- `Zapier:github_check_organization_membership` - Проверить членство

### ФАЙЛЫ И КОД:
- `Zapier:github_create_or_update_file` - **ГЛАВНЫЙ TOOL ДЛЯ AUTOSAVE**
- Параметры: `repo`, `path`, `content`, `message`, `sha` (для update)

### ВЕТКИ:
- `Zapier:github_create_branch` - Создать ветку
- `Zapier:github_delete_branch` - Удалить ветку

### ISSUES И PR:
- `Zapier:github_create_issue` - Создать issue
- `Zapier:github_update_issue` - Обновить issue  
- `Zapier:github_create_pull_request` - Создать PR
- `Zapier:github_update_pull_request` - Обновить PR
- `Zapier:github_create_comment` - Комментарий в issue/PR
- `Zapier:github_submit_review` - Ревью PR

### ДРУГОЕ:
- `Zapier:github_create_gist` - Создать gist
- `Zapier:github_set_profile_status` - Статус профиля

---

## 📋 **CLICKUP TOOLS (Zapier):**

### ПОИСК:
- `Zapier:clickup_find_task_by_id` - Найти задачу по ID
- `Zapier:clickup_find_user_by_name_or_email` - Найти пользователя
- `Zapier:clickup_find_documents` - Найти документы
- `Zapier:clickup_find_custom_fields` - Кастомные поля
- `Zapier:clickup_find_a_list_of_all_tasks` - Все задачи
- `Zapier:clickup_find_the_most_recent_task` - Последняя задача

### СОЗДАНИЕ:
- `Zapier:clickup_create_task` - Создать задачу
- `Zapier:clickup_create_subtask` - Создать подзадачу
- `Zapier:clickup_create_space` - Создать пространство
- `Zapier:clickup_create_folder` - Создать папку
- `Zapier:clickup_create_list` - Создать список
- `Zapier:clickup_create_custom_field` - Кастомное поле
- `Zapier:clickup_new_checklist` - Чеклист
- `Zapier:clickup_create_new_document` - Документ
- `Zapier:clickup_create_new_document_page` - Страница в документе

### УПРАВЛЕНИЕ:
- `Zapier:clickup_update_task` - Обновить задачу
- `Zapier:clickup_update_custom_field_value` - Обновить кастомное поле
- `Zapier:clickup_update_access_for_the_task` - Доступ к задаче
- `Zapier:clickup_edit_document_page` - Редактировать страницу
- `Zapier:clickup_archive_or_delete_task` - Архивировать/удалить

### КОММУНИКАЦИЯ:
- `Zapier:clickup_post_a_task_comment` - Комментарий к задаче
- `Zapier:clickup_send_direct_message` - Прямое сообщение
- `Zapier:clickup_send_chat_message_to_channel` - Сообщение в канал

### ДРУГОЕ:
- `Zapier:clickup_time_tracked` - Трекинг времени
- `Zapier:clickup_post_attachment` - Прикрепить файл

### API:
- `Zapier:clickup_api_request_beta` - Прямые API запросы

---

## 📱 **TELEGRAM TOOLS (Zapier):**

- `Zapier:telegram_send_message` - Отправить сообщение
- `Zapier:telegram_send_photo` - Отправить фото
- `Zapier:telegram_send_poll` - Отправить опрос

---

## 🔧 **ZAPIER MANAGEMENT:**

- `Zapier:add_tools` - Добавить новые действия
- `Zapier:edit_tools` - Редактировать существующие

---

## 🌐 **NATIVE CLAUDE TOOLS:**

### ПОИСК В ИНТЕРНЕТЕ:
- `web_search` - Поиск в интернете (Brave Search)
- `web_fetch` - Получить содержимое URL

### АНАЛИЗ:
- `repl` - JavaScript анализ и вычисления

### СОЗДАНИЕ:
- `artifacts` - Создание контента (код, документы, HTML, React)

---

## 🎯 **MAIN WORKFLOWS:**

### AUTOSAVE ПРОЦЕДУРА:
```
1. Zapier:github_create_or_update_file
2. Параметры:
   - repo: "guannko/offerspsp.com" 
   - path: "jean-claude-autosave-YYYYMMDD-HHMM.md"
   - content: markdown с updates
   - message: "Autosave description"
   - instructions: "Create autosave file"
```

### ПРОВЕРКА РЕПОЗИТОРИЕВ:
```
1. Zapier:github_find_repository
2. Параметры:
   - owner: "guannko"
   - repo: "название_репо"
```

### EMAIL РАБОТА:
```
1. Zapier:gmail_find_email (поиск)
2. Zapier:gmail_send_email (отправка)
3. Zapier:gmail_create_draft (черновик)
```

---

## 🚨 **CRITICAL RULES:**

### ДЛЯ GITHUB:
- ВСЕГДА используй `github_create_or_update_file` для autosave
- НЕ забывай `instructions` параметр
- Для update нужен `sha` (получать отдельно)

### ДЛЯ ПОИСКА:
- `web_search` для интернета
- `gmail_find_email` для писем  
- `google_drive_find_a_file` для файлов
- `github_find_repository` для репозиториев

### ДЛЯ АНАЛИЗА:
- `repl` для сложных вычислений
- `web_fetch` для чтения конкретных URL

---

## 📈 **UPDATE PROTOCOL:**

Обновлять этот протокол когда:
- Найден новый tool
- Изменился способ использования
- Добавлены новые интеграции
- Выявлены лучшие практики

---

*Jean Claude Tools Protocol v1.0 - Never search for tools again!* 🔥💪⚡