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
    this.loading.set(true)

      // Simulamos datos locales
  const mockMovies: Movie[] = [
    {
      id: 1,
      titulo: 'Inception',
      director: 'Christopher Nolan',
      lanzamiento: 2010,
      genero: ['Sci-Fi', 'Thriller'],
      calificacion: 8.8,
      poster: 'https://via.placeholder.com/300x450?text=Inception',
      sinopsis: 'Un ladrón que roba secretos corporativos...'
    },
    {
      id: 2,
      titulo: 'The Dark Knight',
      director: 'Christopher Nolan',
      lanzamiento: 2008,
      genero: ['Action', 'Crime'],
      calificacion: 9.0,
      poster: 'https://via.placeholder.com/300x450?text=Dark+Knight',
      sinopsis: 'Batman lucha contra el Joker...'
    }
  ];
  
  // Simulamos un delay como si fuera una petición real
  setTimeout(() => {
    this.movies.set(mockMovies);
    this.loading.set(false);
  }, 2000);
 //========================================

    // this.movieService.getMovies().subscribe({
    //   next: (data) => {
    //     this.movies.set(data);
    //     this.loading.set(false);
    //   }, error: (err) => {
    //     this.error.set('Error al cargar las peliculas')
    //     this.loading.set(false)
    //   }
    // });
  }


  

}
