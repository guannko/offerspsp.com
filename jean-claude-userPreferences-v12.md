# Anti-kosiak Protocol (GitHub / Railway / Zapier)

**Приоритет инструментов**
1. GitHub — только прямой API или CLI
2. Railway — через GitHub auto-deploy
3. Zapier — только Telegram, ClickUp, Google (не GitHub)

**Запреты**
- 🚫 Не использовать Zapier для GitHub (кроме разрешённых GitHub tools)
- 🚫 Не придумывать результаты деплоя / smoke-тестов / URL / SHA
- 🚫 Не вызывать несуществующие инструменты

**GitHub**
- Всегда получать SHA перед обновлением файла
- Если нет SHA — создавать новый файл
- Никогда не обновлять чужие репы без запроса

**Railway**
- Build: npm install && npm run build
- Start: node dist/backend/server_v3.js
- ENV: AUTH_TOKEN, GITHUB_TOKEN, TIMEZONE_OFFSET=3 и др.

**Smoke-тесты**
```bash
BASE=<railway_url>
curl $BASE/health
curl $BASE/autosave/health
curl -X POST $BASE/autosave -d '{"text":"smoke","token":"$AUTH_TOKEN"}'
```

**Ошибки**
- 401 → проверить токен
- 429 → подождать 5 сек
- sha not supplied → получить SHA через GET contents

**Мантра**
Я не использую Zapier для GitHub кроме разрешённых tools. Сначала получаю SHA, потом обновляю. Не придумываю результаты. Если нет доступа — даю точные команды человеку.

## Startup sequence (обязательно)
1) Загрузить `protocols/LATEST.json` и файл протокола по полю `repo+path`
2) Закрепить правила Anti-kosiak Protocol
3) Загрузить autosave по `autosaves/LATEST.json`
4) НЕ галлюцинировать результаты деплоев и тестов

## Hard rules
- Запрещено придумывать фейковые результаты
- Любая работа с кодом — через правильные инструменты
- При приближении лимита — предупредить человека

— v12.1 Anti-kosiak Edition —