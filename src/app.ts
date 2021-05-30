import bodyParser from 'body-parser';
import express from 'express';
import supportRequestRouter from './routers/srq/srq';
import authRouter from './routers/auth/auth';
import cors from 'cors';
import errorHandler from './modules/errors/errorHandler';
import notFoundRouter from './routers/notFound/notFound';
import solutionRouter from './routers/solution/solution';
import healthCheckRouter from './routers/healthCheck/healthCheck';

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

if (process.env.NODE_ENV !== 'test') {
    app.listen(PORT, () => {
        console.log('App is running on ' + PORT);
    });
}

export default app;
