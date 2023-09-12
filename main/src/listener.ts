import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Transport, MicroserviceOptions } from "@nestjs/microservices";

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(AppModule, {
    transport: Transport.RMQ,
    options: {
      urls: ['amqps://povnvznw:nlcvnYFEDt7WP91sbCS87K7AgMcRFqeK@dingo.rmq.cloudamqp.com/povnvznw'],
      queue: 'products_queue',
      queueOptions: {
        durable: false
      },
    },
  });

  app.listen().then(() => {
    console.log("microservice is running")
  })

}
bootstrap();
