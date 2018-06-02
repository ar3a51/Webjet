import { Injectable, HttpService, } from '@nestjs/common';
import * as movie from '../../movie';
import Observable  from 'rxjs';
import { forkJoin, empty, of } from 'rxjs';
import { map, switchMap } from 'rxjs/Operators';


@Injectable()
export class MovieService {

  constructor(
    private _movieRepository:movie.MovieRepository
  ){

  }

  public async  getAllMovies() {
    
    let movieList:Array<any> = [];
    let movieRes = await this._movieRepository.getAllMovies();
   
   for (let response of movieRes)
    {
      if (response && response.length > 0)
      {
       movieList = movieList.length > 0 ? movieList.concat(response) : response;
      }
    }

    if (movieList.length > 0)
    {
      let promises = movieList.map(m => this.getMovieDetails(m));
      return await Promise.all(promises);
    }
    else 
      return [];
  }

  private async getMovieDetails(movie)
  {
    let result = await this._movieRepository.getMovieDetails(movie);
    if (result){
      result.Price = parseFloat(result.Price);
      result.Source = movie.Source;
      return result;
    }
    else
      return;
  }
}
