import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GreetingController } from './greeting-controller/greeting.controller';

@Module({
  imports: [],
  controllers: [AppController, GreetingController],
  providers: [AppService],
})
export class AppModule {}
