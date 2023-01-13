import express from 'express';
import cors from 'cors';
import routes from './routes';

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/api', routes);

app.use('/', (req, res) => {
  res.status(200).json({
    status: 'ok',
    msg: 'Welcome To KIGC ESAS REST APIs',
  });
});

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server started on port ${port}`));

export default app;
