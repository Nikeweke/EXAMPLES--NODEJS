import { Get, applyDecorators, UseGuards  } from '@nestjs/common';
// guards
import { JwtAuthGuard } from '@components/auth/guards/_index'

export default function(path: string) {
  return applyDecorators(
  	Get(path),

    UseGuards(JwtAuthGuard)
  );
}



