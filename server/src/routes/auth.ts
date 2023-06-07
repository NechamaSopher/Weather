
import * as Router from 'koa-router';
const router = new Router();

import AuthCtrl from '../controllers/auth';

router.get('/user', AuthCtrl.getSessionUser);

router.post('/login', AuthCtrl.login);
router.post('/registration', AuthCtrl.registration);

module.exports = router.routes();
