import express from 'express';
import mongoose from 'mongoose';
import mocksRouter from './routes/mocks.router.js';

const app = express();
app.use(express.json());

// Conexión a MongoDB
mongoose.connect('mongodb://localhost:27017/mocksDB', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

// Uso del router
app.use('/api/mocks', mocksRouter);

app.listen(3000, () => {
    console.log('Servidor corriendo en http://localhost:3000');
});
