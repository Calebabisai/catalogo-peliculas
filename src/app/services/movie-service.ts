import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Movie } from '../models/movie-model/movie-model-module';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MovieService {

  private apiUrl = 'https://api.example.com/movies'
  constructor(private http: HttpClient) {}

  getMovies(): Observable<Movie[]> {
    return this.http.get<Movie[]>(this.apiUrl)
  }

  getMovieById(id: number): Observable<Movie> {
    return this.http.get<Movie>(`${this.apiUrl}/${id}`);
  }

  searchMovies(query: string): Observable<Movie[]> {
    const q = encodeURIComponent(query.trim());
    return this.http.get<Movie[]>(`${this.apiUrl}/search?q=${q}`)
  }

  getMoviesByGenre(genre: string): Observable<Movie[]>{
    return this.http.get<Movie[]>(`${this.apiUrl}/genre/${genre}`)
  }

  addMovie (movie: Movie): Observable<Movie> {
    return this.http.post<Movie>(this.apiUrl, movie)
  }

  deleteMovie (id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`)
  }
}
