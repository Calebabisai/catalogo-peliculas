import { Component, effect, signal } from '@angular/core';
import { MovieService } from '../../services/movie-service';
import { Movie } from '../../models/movie-model/movie-model-module';

@Component({
  selector: 'app-movie-list',
  standalone: true,
  imports: [],
  templateUrl: './movie-list.html',
  styleUrl: './movie-list.css',
})
export class MovieList {
  movies = signal<Movie[]>([])
  loading = signal<boolean>(false)
  error = signal<string>('')
  
  constructor(private movieService: MovieService) {
    this.loadMovies()
  }

  loadMovies() {
    this.loading.set(true);
    this.error.set('');

    this.movieService.getMovies().subscribe({
      next: (data) => {
        this.movies.set(data);
        this.loading.set(false);
      }, error: (err) => {
        this.error.set('Error al cargar las peliculas')
        this.loading.set(false)
        console.log('Error:', err)
      }
    });
  }
}
