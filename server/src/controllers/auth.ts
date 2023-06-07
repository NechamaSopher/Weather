import UserCtrl from './user';

import * as bcrypt from 'bcrypt';
import * as  _ from 'lodash' ;
import * as jwt from 'jsonwebtoken';
import * as dotenv from 'dotenv';

dotenv.config();

class AuthCtrl {

  static async registration(ctx) {
    try {
      const data = _.get(ctx, 'request.body', {});
      const { email } = data;

      const userExist = await UserCtrl.getByMail(email);      

      if (userExist) {
        throw new Error('User exist in the system');
      }

      const user = await UserCtrl.create(data);
      const accessToken = jwt.sign({ user }, process.env.ACCESS_TOKEN_SECRET);

      ctx.cookies.set('jwt', accessToken, { httpOnly: true });
      ctx.body = { ...user, accessToken };
    } catch (err) {
      console.log('err', err);
      
      ctx.body = err;
      ctx.status = 500;
    }
  }

  static async login(ctx) {
    try {
      const data = _.get(ctx, 'request.body', {});
      const { email, password } = data;

      const user = await UserCtrl.getByMail(email);
      if (!user) {
        throw new Error('User not found');
      }

      const compareRes = user && await bcrypt.compare(password, user.password);

      if (!compareRes) {
        throw new Error('Incorrect username or password');
      }

      const updatedUser = await UserCtrl.update(user.id, { entry_count: user.entry_count + 1 });
      const accessToken = jwt.sign({ user: updatedUser }, process.env.ACCESS_TOKEN_SECRET);

      ctx.cookies.set('jwt', accessToken, { httpOnly: true });
      ctx.body = { ...updatedUser, accessToken };
    } catch (err) {
      console.log('err', err);
      
      ctx.body = err;
      ctx.status = 500;
    }
  }

  static async getSessionUser(ctx) {
    try {
      const token = ctx.cookies.get('jwt');
      const detectedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

      if (!detectedToken) {
        ctx.body = new Error('Unauthenticated user');
        ctx.status = 401;
        return
      }
      
      ctx.body = detectedToken.user;
    } catch (err) {
      console.log('err', err);
      
      ctx.body = new Error('Unauthenticated user');
      ctx.status = 401;
    }
  }
}

export default AuthCtrl;
