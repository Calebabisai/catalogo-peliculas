import { Component, signal } from '@angular/core';
import { MovieService } from '../../services/movie-service';
import { Movie } from '../../models/movie-model/movie-model-module';
import { MovieCard } from "../movie-card/movie-card";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-movie-list',
  standalone: true,
  imports: [MovieCard, CommonModule],
  templateUrl: './movie-list.html',
  styleUrl: './movie-list.css',
})
export class MovieList {
  movies = signal<Movie[]>([])
  loading = signal<boolean>(false)
  error = signal<string>('')
  searchTerm = signal<string>('')
  
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

  onSearch() {
    const term = this.searchTerm();

    if(!term || term.trim() === '') {
      this.loadMovies();
      return;
    }
    this.loading.set(true);
    this.error.set('');
    //Llamar al servicio y hacer suscribe
    this.movieService.searchMovies(term).subscribe({
      next:(data) => {
        this.movies.set(data);
        this.loading.set(false);
      },
      error: (err) => {
        this.error.set('Error al buscar peliculas');
        this.loading.set(false);
        console.log('Error:', err)
      }
    })
  }
}
 
