import { Module } from '@nestjs/common';
import {
  getDataSourceToken,
  getRepositoryToken,
  TypeOrmModule,
} from '@nestjs/typeorm';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import {
  customUserRepositoryMethods,
  UserRepository,
} from './repository/user.repository';
import { UserService } from './user.service';
import { User } from './entity/user.entity';
import { DataSource } from 'typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  exports: [TypeOrmModule],
  controllers: [AuthController],
  providers: [
    AuthService,
    UserService,
    {
      provide: getRepositoryToken(User),
      inject: [getDataSourceToken()],
      useFactory(dataSource: DataSource) {
        return dataSource
          .getRepository(User)
          .extend(customUserRepositoryMethods);
      },
    },
  ],
})
export class AuthModule {}
