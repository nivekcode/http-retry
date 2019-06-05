import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GreetingControllerController } from './greeting-controller/greeting-controller.controller';

@Module({
  imports: [],
  controllers: [AppController, GreetingControllerController],
  providers: [AppService],
})
export class AppModule {}
