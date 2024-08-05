import { Module } from '@nestjs/common';
import { MyAccountService } from './my-account.service';
import { MyAccountController } from './my-account.controller';

@Module({
  controllers: [MyAccountController],
  providers: [MyAccountService],
})
export class MyAccountModule {}
