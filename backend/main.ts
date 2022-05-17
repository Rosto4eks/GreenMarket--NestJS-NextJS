import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

const PORT = 8000

async function server() {
  const app = await NestFactory.create(AppModule);
  app.enableCors()
  await app.listen(PORT);
  console.log(`\n\u001b[1;32m Server started!\n\u001b[1;33m PORT: ${PORT}`)
}

server();
