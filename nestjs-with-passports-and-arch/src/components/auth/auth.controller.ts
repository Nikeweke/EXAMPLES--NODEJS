import { Controller, UseGuards, Post, Req } from "@nestjs/common";
import { AuthService } from "@components/auth/auth.service";
// guards
import { LocalAuthGuard } from "@components/auth/guards/_index";

@Controller('auth')
export default class AuthController {

  constructor(private readonly authService: AuthService) {}

  @Post('/login')
  @UseGuards(LocalAuthGuard)
  async login(@Req() req) {
    return this.authService.loginWithCredentials(req.user)
  }

}
