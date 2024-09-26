import express from 'express';
import usersRouter from './users/users.router.js';

export const app = express();

app.use(express.json()); // permitimos que el app procese JSON en el body de la request

app.get('/pim', (_req,res) => res.send('pam'));

app.use('/users', usersRouter); // ahora en /students se encuentran TODAS las rutas y subrutas definidas por studentRouter