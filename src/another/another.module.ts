import { Module } from '@nestjs/common';
import { AnotherService } from './another.service';

@Module({
  providers: [AnotherService],
  exports: [AnotherService],
})
export class AnotherModule {}
