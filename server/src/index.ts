import * as Koa from 'koa';
import * as json from 'koa-json';

import 'reflect-metadata';
import { AppDataSource } from "./data-source";

import * as dotenv from 'dotenv';
import * as  _ from 'lodash';

import * as middleWares from './middleware';
import * as routes from './routes/index';

dotenv.config();

AppDataSource.initialize()
  .then(() => {
    const app = new Koa();

    app.use(json());
    app.use(middleWares);
    app.use(routes);

    app.listen(process.env.PORT || 3000, () => {
      console.log(`Started on port ${process.env.PORT || 3000}`);
    });
  })
  .catch((error) => console.log(error))
