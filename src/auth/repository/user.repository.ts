import { Repository } from 'typeorm';
import { User } from '../entity/user.entity';

// @EntityRepository(User)
// export class UserRepositoty extends Repository<User> {}

export interface UserRepository extends Repository<User> {
  this: Repository<User>;

  getUserWithPassword(userId: number): Promise<any>;
}

type CustomUserRepository = Pick<UserRepository, 'getUserWithPassword'>;

export const customUserRepositoryMethods: CustomUserRepository = {
  async getUserWithPassword(userId: number): Promise<any> {
    try {
      const user = await this.users.findOne({
        where: { id: userId },
        select: { id: true, email: true, name: true, password: true },
      });
      return { ok: true, user };
    } catch (e) {
      return { ok: false, error: e.message };
    }
  },
};
