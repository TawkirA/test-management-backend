import express from 'express';
import 'express-async-errors';
import morgan from 'morgan';
import dotenv from 'dotenv';
import cors from 'cors';
const app = express();
import connectDB from './db/connection.js';
dotenv.config();

// import Routes
import authRoutes from './routes/authRoutes.js';
import testRoutes from './routes/testRoutes.js';

// import middleware
import authenticateUser from './middleware/auth.js';
import notFoundMiddleware from './middleware/not-found.js';
import errorHandlerMiddleware from './middleware/error-handler.js';

if (process.env.NODE_ENV !== 'production') {
    app.use(morgan('dev'))
}

app.use(cors());

app.use(express.json());

app.get('/api/v1', (req, res) => {
    res.send('Welcome!!')
})

app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/test', authenticateUser, testRoutes);

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 4000;

const start = async () => {
    try {
        const dbUrl = `${process.env.MONGO_URL}`;
        await connectDB(dbUrl);
        app.listen(port, () => {
            console.log(`app listening on port ${port}`)
        })
    } catch (error) {
        console.log(error);
    }
}

start()