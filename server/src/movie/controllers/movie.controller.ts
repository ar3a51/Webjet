import { Get, Controller, Res, Param, Post, Req } from '@nestjs/common';
import * as movie from '../../movie'


@Controller("api/movies")
export class MovieController {
  constructor(private readonly _movieService: movie.MovieService) {}

  @Get()
  async movieList(@Res() res) {
    let result = await this._movieService.getAllMovies()
      .then(result => {return result.filter(r => {return r !== undefined})})
      .catch(err => {console.log(err); return []});
      res.send(result);
  }
}
