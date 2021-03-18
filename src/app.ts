import bodyParser from 'body-parser';
import express from 'express';
import supportRequestRouter from './routers/srq';
import authRouter from './routers/auth';
import cors from 'cors';
import errorHandler from './utils/errors/errorHandler';
import notFoundRouter from './routers/notFound';
import solutionRouter from './routers/solution';
import healthCheckRouter from './routers/healthcheck';

require('./db/mongoose');

const app = express();
const corsWithOptions = cors({});

const PORT = process.env.PORT || 3000;

app.use(corsWithOptions);
app.use(healthCheckRouter);
app.use(bodyParser.json());
app.use(authRouter);
app.use(supportRequestRouter);
app.use(solutionRouter);
app.use('*', notFoundRouter);
app.use(errorHandler);

app.listen(PORT, () => {
    console.log('App is running on ' + PORT);
});
