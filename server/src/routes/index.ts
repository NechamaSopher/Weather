import * as  Router from 'koa-router';

import * as authRoutes from './auth';
import * as weatherRoutes from './weather';

import authenticateToken  from '../middleware/authenticate-token';

const router = new Router({ prefix: '/api' });

router.use(authRoutes);
router.use(authenticateToken);
router.use(weatherRoutes);

module.exports = router.routes();
