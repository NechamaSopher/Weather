
import * as Router from 'koa-router';
import weatherCtrl from '../controllers/weather';

const router = new Router({ prefix: '/weather' });

router.post('/', weatherCtrl.getweather);

module.exports = router.routes();
