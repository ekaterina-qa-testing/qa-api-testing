-- QA API Testing
-- SQL checks for API and MySQL data validation

-- 1. Проверка данных пользователя после создания через API
-- Данные из ответа POST /users должны совпадать с данными в MySQL

SELECT id, name, email, age
FROM users
WHERE id = 24;

-- 2. Проверка отсутствия дубликатов email
-- Запрос должен вернуть пустой результат

SELECT email, COUNT(*) AS count
FROM users
GROUP BY email
HAVING COUNT(*) > 1;
