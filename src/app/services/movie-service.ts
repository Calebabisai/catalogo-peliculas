import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Movie } from '../models/movie-model/movie-model-module';

@Injectable({
  providedIn: 'root',
})
export class MovieService {

  private apiUrl = 'https://api.example.com/movies'
  constructor(private http: HttpClient) {}

  getMovies() {
    return this.http.get<Movie[]>(this.apiUrl)
  }

  getMovieById(id: number) {
    return this.http.get<Movie>(`${this.apiUrl}/${id}`);
  }
  
}
