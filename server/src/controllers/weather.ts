import * as  _ from 'lodash' ;

const axios = require('axios');

class weatherCtrl {
  static async getweather(ctx) {
    try {
      const props = _.get(ctx, 'request.body', {});
      const { latitude, longitude } = props;
      
      const url = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true&relativehumidity_2m,windspeed_10m`
      
      const { data } = await axios.get(url);

      ctx.body = data;
    } catch (err) {
      console.log('err', err);
      
      ctx.body = err;
      ctx.status = 500;
    }
  }
}
export default weatherCtrl