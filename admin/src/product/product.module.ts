import { Module } from '@nestjs/common';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';
import {TypeOrmModule} from "@nestjs/typeorm";
import { Product } from './product.entity';
import {ClientsModule, Transport} from "@nestjs/microservices";

@Module({
  imports: [TypeOrmModule.forFeature([Product]),
  ClientsModule.register([
    {
      name: 'PRODUCT_SERVICE',
      transport: Transport.RMQ,
      options: {
        urls: ['amqps://povnvznw:nlcvnYFEDt7WP91sbCS87K7AgMcRFqeK@dingo.rmq.cloudamqp.com/povnvznw'],
        queue: 'products_queue',
        queueOptions: {
          durable: false
        },
      },
    },
  ]),
],
  controllers: [ProductController],
  providers: [ProductService]
})
export class ProductModule {}
