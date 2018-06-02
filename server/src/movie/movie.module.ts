import { 
          Module, 
          NestModule, 
          MiddlewareConsumer,
          HttpModule,
} from '@nestjs/common';

import {
  controllers,
  services
} from './movie.content';

import {MovieMiddleware} from './middlewares/movie.middleware';

@Module({
  imports: [
    HttpModule,
  ],
  controllers: [
    ...controllers
  ],
  providers: [
    ...services
   ]
})
export class MovieModule implements NestModule{
  configure(consumer: MiddlewareConsumer){
    consumer
      .apply(MovieMiddleware)
      .forRoutes("/");
  }

}
