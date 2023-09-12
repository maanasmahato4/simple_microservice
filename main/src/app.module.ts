import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductModule } from './product/product.module';

@Module({
  imports: [MongooseModule.forRoot('mongodb+srv://maanas:mahato@cluster0.fon9sup.mongodb.net/?retryWrites=true&w=majority', {
    autoCreate: true
  }), ProductModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
