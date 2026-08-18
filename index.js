const express = require('express');
const mysql = require('mysql2');

const app = express();
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '763mokDDm721loki',
    database: 'qa_api'
});

db.connect((err) => {
    if (err) {
        console.error('Ошибка подключения к MySQL:', err.message);
        return;
    }

    console.log('MySQL подключен!');
});
app.use(express.json());

app.get('/users', (req, res) => {
    const sql = 'SELECT * FROM users';

    db.query(sql, (err, results) => {
        if (err) {
            console.error(err);
            return res.status(500).json({
                error: 'Database error'
            });
        }

        res.json(results);
    });
});
app.post('/users', (req, res) => {
    const { name, email, age } = req.body;
    if (!email) {
        return res.status(400).json({
            error: 'Email is required'
        });
}
    if (!name) {
    return res.status(400).json({
        error: 'Name is required'
    });
}
    if (age === undefined || age === null) {
    return res.status(400).json({
        error: 'Age is required'
    });
}
    if (!Number.isInteger(age)) {
    return res.status(400).json({
        error: 'Данные в поле введены некорректно, используйте целые числа'
    });
}
    if (age < 16 || age > 99) {
    return res.status(400).json({
        error: 'Возраст должен быть от 16 до 99 лет'
    });
}
    const sql = `
        INSERT INTO users (name, email, age)
        VALUES (?, ?, ?)
    `;

    db.query(sql, [name, email, age], (err, result) => {
        if (err) {
    if (err.code === 'ER_DUP_ENTRY') {
        return res.status(409).json({
            error: 'Email already exists'
        });
    }

    console.error(err);

    return res.status(500).json({
        error: 'Database error'
    });
}

        res.status(201).json({
            message: 'User created',
            id: result.insertId,
            user: {
                name,
                email,
                age
            }
        });
    });
});
app.get('/users/:id', (req, res) => {
    const { id } = req.params;

if (!Number.isInteger(Number(id))) {
    return res.status(400).json({
        error: 'ID должен быть числом'
    });
}

if (Number(id) <= 0) {
    return res.status(400).json({
        error: 'ID должен быть положительным числом'
    });
}

    const sql = 'SELECT * FROM users WHERE id = ?';

    db.query(sql, [id], (err, results) => {
        if (err) {
            console.error(err);
            return res.status(500).json({
                error: 'Database error'
            });
        }

        if (results.length === 0) {
            return res.status(404).json({
                error: 'User not found'
            });
        }

        res.json(results[0]);
    });
});

app.delete('/users/:id', (req, res) => {
    const { id } = req.params;

    if (!Number.isInteger(Number(id))) {
        return res.status(400).json({
            error: 'ID должен быть числом'
        });
    }

    if (Number(id) <= 0) {
        return res.status(400).json({
            error: 'ID должен быть положительным числом'
        });
    }

    const sql = 'DELETE FROM users WHERE id = ?';

    db.query(sql, [id], (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).json({
                error: 'Database error'
            });
        }

        if (result.affectedRows === 0) {
            return res.status(404).json({
                error: 'User not found'
            });
        }

        res.status(200).json({
            message: 'User deleted'
        });
    });
});
app.patch('/users/:id', (req, res) => {
    const { id } = req.params;

    if (!Number.isInteger(Number(id))) {
        return res.status(400).json({
            error: 'ID должен быть числом'
        });
    }

    if (Number(id) <= 0) {
        return res.status(400).json({
            error: 'ID должен быть положительным числом'
        });
    }

    const { name, email, age } = req.body;

    if (name === undefined && email === undefined && age === undefined) {
        return res.status(400).json({
            error: 'Нет данных для изменения'
        });
    }

if (name !== undefined && name === '') {
    return res.status(400).json({
        error: 'Name is required'
    });
}
if (age !== undefined && !Number.isInteger(age)) {
    return res.status(400).json({
        error: 'Данные в поле введены некорректно, используйте целые числа'
    });
}

if (age !== undefined && (age < 16 || age > 99)) {
    return res.status(400).json({
        error: 'Возраст должен быть от 16 до 99 лет'
    });
}

if (email !== undefined && email === '') {
    return res.status(400).json({
        error: 'Email cannot be empty'
    });
}
const findSql = 'SELECT * FROM users WHERE id = ?';

db.query(findSql, [id], (err, results) => {
    if (err) {
        console.error(err);
        return res.status(500).json({
            error: 'Database error'
        });
    }

    if (results.length === 0) {
        return res.status(404).json({
            error: 'User not found'
        });
    }

    const user = results[0];

const newName = name !== undefined ? name : user.name;
const newEmail = email !== undefined ? email : user.email;
const newAge = age !== undefined ? age : user.age;

const updateSql = `
    UPDATE users
    SET name = ?, email = ?, age = ?
    WHERE id = ?
`;

db.query(
    updateSql,
    [newName, newEmail, newAge, id],
    (err, result) => {
        if (err) {
            if (err.code === 'ER_DUP_ENTRY') {
                return res.status(409).json({
                    error: 'Email already exists'
                });
            }

            console.error(err);

            return res.status(500).json({
                error: 'Database error'
            });
        }

        res.status(200).json({
            message: 'User updated',
            user: {
                id,
                name: newName,
                email: newEmail,
                age: newAge
            }
        });
    }
);
 
});
});
app.listen(3000, () => {
    console.log('API запущен на http://localhost:3000');
});