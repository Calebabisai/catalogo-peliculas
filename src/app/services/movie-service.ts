import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Movie } from '../models/movie-model/movie-model-module';
import { Observable, map } from 'rxjs';
import { environment } from '../../environments/environments';

@Injectable({
  providedIn: 'root',
})
export class MovieService {
  private apiKey = environment.tmdbApiKey;
  private apiUrl = environment.tmdbApiUrl;
  private imageBaseUrl = environment.tmdbImageBaseUrl;

  private http = inject(HttpClient);

  getMovies(): Observable<Movie[]>{
    return this.http
    .get<any>(`${this.apiUrl}/movie/popular?api_key=${this.apiKey}&language=es-MX`)
    .pipe(map((response) => this.transformMovies(response.results)));
  }

  getMovieById(id: number): Observable<Movie> {
    return this.http
    .get<any>(`${this.apiUrl}/movie/${id}?api_key=${this.apiKey}&language=es-MX`)
    .pipe(map((response) => this.transformMovie(response)));
  }

  searchMovies(query: string): Observable<Movie[]> {
    const q = encodeURIComponent(query.trim());
    return this.http
    .get<any>(`${this.apiUrl}/search/movie?api_key=${this.apiKey}&language=es-MX&query=${q}`)
    .pipe(map((response) => this.transformMovies(response.results)));
  }

  getMoviesByGenre(genreId: number): Observable<Movie[]>{
    return this.http
    .get<any>(`${this.apiUrl}/discover/movie?api_key=${this.apiKey}&language=es-MX&with_genres=${genreId}`)
    .pipe(map((response) => this.transformMovies(response.results)));
  }

  addMovie (movie: Movie): Observable<Movie> {
    return this.http.post<Movie>(`${this.apiUrl}/movie`, movie);
  }

  deleteMovie (id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }



  private transformMovie(movie: any) : Movie {
    return {
      
      id: movie.id,
      titulo: movie.title,
      sinopsis: movie.overview || "Sin sinopsis disponible",
      lanzamiento: movie.release_date ? new Date(movie.release_date).getFullYear() :0,
      genero: movie.genres ?
      movie.genres.map((gen: any) => gen.name)
      : movie.genre_ids?.map((id: number) => this.getGenreName(id)) || [],
      calificacion: Number(movie.vote_average.toFixed(1)),
      poster: movie.poster_path 
      ? `${this.imageBaseUrl}${movie.poster_path}`
      : 'https://via.placeholder.com/500x750?text=Sin+Imagen',
      director: 'Por definir',
      
      
    };
  }

  private transformMovies(tmdbMovies: any[]): Movie[] {
    return tmdbMovies.map(movie => this.transformMovie(movie));
  }

  private getGenreName(id: number): string {
    const genres: {[key: number]: string} = {
      28: 'Acción', 12: 'Aventura', 16: 'Animación',
      35: 'Comedia', 80: 'Crimen', 99: 'Documental',
      18: 'Drama', 10751: 'Familia', 14: 'Fantasía',
      36: 'Historia', 27: 'Terror', 10402: 'Música',
      9648: 'Misterio', 10749: 'Romance', 878: 'Ciencia Ficción',
      10770: 'Película de TV', 53: 'Suspenso', 10752: 'Bélica',
      37: 'Western',
    };
    return genres[id] || "Otro";
  }
}
