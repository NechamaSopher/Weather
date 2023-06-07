import * as bcrypt from 'bcrypt';
import * as  _ from 'lodash' ;
import { User } from "../entity/User"
import { AppDataSource } from "../data-source"

const userRepository = AppDataSource.getRepository(User)

class UserCtrl {

  static async create(data) {
    try {
      const passwordHash = data.password ? bcrypt.hashSync(data.password, bcrypt.genSaltSync(10)) : null;
      const userData = { ...data, password: passwordHash };
      
      return await userRepository.save(userData)
    } catch (err) {
      console.error(err);
      throw new Error('Failed to create user');
    }
  }

  static async update(id, data) {
    try {
      await userRepository.update(id, data);
      return this.one(id);
    } catch (err) {
      console.error(err);
      throw new Error('Failed to update user');
    }
  }

  static async one(id) {
    try {
      return await userRepository.findOneBy({ id });
    } catch (err) {
      console.error(err);
      throw new Error('Failed to retrieve user');
    }
  }

  static async getByMail(email) {
    try {
      return await userRepository.findOneBy({ email });
    } catch (err) {
      console.error(err);
      throw new Error('Failed to retrieve user by email');
    }
  }
}

export default UserCtrl;

