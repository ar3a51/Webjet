import { NestFactory } from '@nestjs/core';
import { MovieModule } from './movie/movie.module';

async function bootstrap() {
  const app = await NestFactory.create(MovieModule);
  await app.listen(80);
}
bootstrap();
