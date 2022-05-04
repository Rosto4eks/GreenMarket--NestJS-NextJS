import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function server() {
  const app = await NestFactory.create(AppModule);
  await app.listen(3000);
  console.log('\n \u001b[1;32m Server started!\n')
}

server();
