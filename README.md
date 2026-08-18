# QA API Testing

Учебный QA-проект по тестированию REST API для работы с пользователями.

Проект создан для практики API testing, написания автоматических проверок в Postman, работы с SQL и базой данных MySQL, а также использования Git и GitHub.

## О проекте

В рамках проекта проводится тестирование REST API для работы с пользователями.

API позволяет:

- получать список пользователей;
- создавать пользователей;
- изменять данные пользователей;
- удалять пользователей.

Основное внимание уделяется позитивным и негативным сценариям, валидации данных, HTTP status codes и обработке ошибок.

## Технологии и инструменты

- Postman
- JavaScript
- Node.js
- Express
- MySQL
- SQL
- Git
- GitHub

## API endpoints

| Method | Endpoint | Description |
|---|---|---|
| GET | `/users` | Получение списка пользователей |
| POST | `/users` | Создание пользователя |
| PATCH | `/users/:id` | Изменение пользователя |
| DELETE | `/users/:id` | Удаление пользователя |

## Тестовые сценарии

### POST /users

Проверяются:

- создание пользователя с валидными данными;
- возраст меньше минимального значения;
- минимальное граничное значение возраста;
- максимальное граничное значение возраста;
- возраст больше максимального значения;
- уникальность email;
- HTTP status codes;
- сообщения об ошибках.

### Boundary Value Analysis

Для поля `age` установлен допустимый диапазон:

`16–99`

Проверены значения:

| Age | Expected result | Actual result |
|---:|---|---|
| 15 | 400 Bad Request | 400 ✅ |
| 16 | 201 Created | 201 ✅ |
| 99 | 201 Created | 201 ✅ |
| 100 | 400 Bad Request | 400 ✅ |

Таким образом проверены граничные значения и значения непосредственно за пределами допустимого диапазона.

## Автоматические проверки Postman

Для API-запросов используются JavaScript-тесты в Postman.

Проверяются:

- HTTP status code;
- корректность сообщения об ошибке.

Пример проверки:

```javascript
pm.test("Status code is 400", function () {
    pm.response.to.have.status(400);
});
Пример проверки сообщения:

pm.test("Error message is correct", function () {
    const response = pm.response.json();


    pm.expect(response.error).to.eql(
        "Возраст должен быть от 16 до 99 лет"
    );
});
Структура проекта
qa-api-testing/
│
├── .gitignore
├── README.md
├── QA_API.postman_collection.json
├── index.js
├── package.json
└── package-lock.json
Как запустить API

Установить зависимости:

npm install

Запустить сервер:

npm start

После запуска API доступно по адресу:

http://localhost:3000
Postman

Коллекция Postman находится в файле:

QA_API.postman_collection.json

Коллекцию можно импортировать непосредственно в Postman.

Статус проекта

🚧 Проект находится в разработке.

Планируется расширить набор тестов для:

POST /users;
PATCH /users/:id;
DELETE /users/:id;
GET /users;
SQL-проверок;
проверки соответствия данных API и MySQL;
дополнительных негативных и граничных сценариев.