import {
    Component, 
    OnInit
}                           from '@angular/core';
import {MenuItem}           from 'primeng/api';
import {MainService}        from '../services/main.service';
import {Observable}         from 'rxjs';
import * as _               from "lodash";

@Component({
    selector: "webjet-main",
    styleUrls: ['main.component.scss'],
    templateUrl: 'main.component.html'
})


export class MainComponent implements OnInit{

    public _movieList:Array<any> = [];
    public _message:string ="Loading...";

    constructor(
        private _mainService: MainService
    ){}
    public ngOnInit(): void {
        this._mainService.getAllMovies().subscribe((movies:any) => {

            if (movies && movies.length == 0)
            {
                this._message = "No Movies found";

            }
            
           movies = _.groupBy(movies,"Title");
            for (let movie in movies)
            {
                movies[movie].sort((a,b) =>{return a.Price - b.Price});

                let movieElement: any = {};
                movieElement.title = movie;
                movieElement.poster = movies[movie][0].Poster;
                movieElement.plot = movies[movie][0].Plot;
                movieElement.price = [];

                for (let mov of movies[movie]){
                   
                    movieElement.price.push({
                        price: mov.Price,
                        source: mov.Source,
                    });
                }
            
                this._movieList.push(movieElement);

            }
        }, (err:Error)=> this._message="error");
    }
}
