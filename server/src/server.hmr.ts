import { NestFactory } from '@nestjs/core';
import { MovieModule } from './movie/movie.module';

declare const module: any;

async function bootstrap() {
  const app = await NestFactory.create(MovieModule);
  await app.listen(3000);

  if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => app.close());
  }
}
bootstrap();
