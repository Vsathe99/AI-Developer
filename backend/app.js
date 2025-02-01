
import express from 'express';
import morgan from 'morgan';
import connect from './db/db.js';
import userRoutes from './routes/user.routes.js';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import projectRoutes from './routes/project.routes.js';  


connect();


const app = express();


app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());
app.use(cors({origin: 'http://localhost:5173', credentials: true}));

app.use('/users', userRoutes);
app.use('/projects', projectRoutes);

export default app;