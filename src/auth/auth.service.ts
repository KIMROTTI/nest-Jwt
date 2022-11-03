import {
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { UserDTO } from './dto/user.dto';
import { UserService } from './user.service';
import * as bcrypt from 'bcrypt';
import { Palyload } from './security/payload.interface';
import { User } from './entity/user.entity';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  // 사용자 등록 요청에 대한 로직
  async registerUser(newUser: UserDTO): Promise<UserDTO> {
    const userFind: UserDTO = await this.userService.findByFields({
      where: { username: newUser.username },
    });
    //db에 요청한 데이터가 있을 경우 에러 출력
    if (userFind) {
      throw new HttpException(
        'Usersname already used!',
        HttpStatus.BAD_REQUEST,
      );
    }
    return await this.userService.save(newUser);
  }
  //로그인시 비교(아이디가 없거나, 패스워드가 다르거나)
  async validateUser(
    userDTO: UserDTO,
  ): Promise<{ accessToken: string } | undefined> {
    const userFind: User = await this.userService.findByFields({
      where: { username: userDTO.username },
    });
    const validatePassword = await bcrypt.compare(
      userDTO.password,
      userFind.password,
    );
    if (!userFind || !validatePassword) {
      throw new UnauthorizedException(); //인증이 안됐음을 던져줌
    }
    //payload에 담기
    const payload: Palyload = { id: userFind.id, username: userFind.username };

    return {
      accessToken: this.jwtService.sign(payload),
    };
  }
}
