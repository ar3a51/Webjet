import { Injectable, HttpService, } from '@nestjs/common';

import Observable from 'rxjs';
import {AxiosResponse}   from 'axios'
import { forkJoin, empty, of } from 'rxjs';
import {} from 'rxjs/Observable/'
import { timeout } from 'rxjs/Operators';


@Injectable()
export class MovieRepository {
  
  
  private _baseUrl: string = "http://webjetapitest.azurewebsites.net";
  private _timeout: number = 7000;

  constructor(
    private _httpService:HttpService
  ){}

  public getAllMovies(){
    return this.getMovies();
  }

  public getMovieDetails(movie)
  {
   
    return this._httpService.get(`${this._baseUrl}/api/${movie.Source}/movie/${movie.ID}`, {headers: { "x-access-token":"sjd1HfkjU83ksdsm3802k"}, timeout:this._timeout}).toPromise()
                            .then(response => {return response.data})
                            .catch(err=> {console.log(err); return;});
  }

  private async getMovies(){
    let cinemaWorldMovies = this._httpService.get(`${this._baseUrl}/api/cinemaworld/movies`, {headers: { "x-access-token":"sjd1HfkjU83ksdsm3802k"}, timeout: this._timeout})
    .toPromise()
    .then(m => {
      let movies = m.data.Movies;
      return movies.map(m => this.addSource(m, "cinemaworld"));
    })
    .catch(
      err => {
        console.log(err);
        return;
      }
    );

    let filmWorldMovies = this._httpService.get(`${this._baseUrl}/api/filmworld/movies`, {headers: { "x-access-token":"sjd1HfkjU83ksdsm3802k"}, timeout: this._timeout})
    .toPromise()
    .then(m => {
      let movies = m.data.Movies;
      return movies.map(m => this.addSource(m, "filmworld"));
    })
    .catch(
      err => {
        console.log(err);
        return;
      }
    )

    return await Promise.all([cinemaWorldMovies, filmWorldMovies]);
  }

  private addSource(movie:any, sourceName: string)
  {
    movie.Source = sourceName;
    return movie;
  }
}
