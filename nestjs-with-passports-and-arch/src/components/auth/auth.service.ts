import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
// import { UsersService } from 'src/users/users.service';

interface IUser {
  id: string
  username: string
}

@Injectable()
export class AuthService {
  constructor(
    // private usersService: UsersService, 
    private jwtService: JwtService
  ) { }

  async validateUser(username: string, password: string): Promise<any> {
  //   const user = await this.usersService.findOne(username);

  //   if (user && user.password === password) {
  //     const { password, ...result } = user;
  //     return result;
  //   }
  //   return null;

    return {
      username, password
    }
  }

  async loginWithCredentials(user: IUser) {
    const payload = { 
      username: user.username, 
      sub: user.id 
    };

    // const accessToken = this.jwtService.sign(payload, {
    //   expiresIn: jwtConstants.jwt.expirationTime.accessTokenExpirationTime,
    //   secret: jwtConstants.jwt.secret,
    // });
    const accessToken =  this.jwtService.sign(payload) 

    return { accessToken }
  }
}