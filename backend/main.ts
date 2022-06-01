import { NestFactory } from '@nestjs/core';
import { PORT } from 'env';
import { AppModule } from './app.module';

async function server() {
  const app = await NestFactory.create(AppModule);
  app.enableCors()
  await app.listen(PORT);
  console.log(`\n\u001b[1;35m------------------------------------\n           Server started!\n           PORT: ${PORT}\n------------------------------------\n`)
}

server();
