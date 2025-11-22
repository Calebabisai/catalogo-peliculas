import { Component, inject, signal} from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { MovieService } from '../../services/movie-service';
import { Movie } from '../../models/movie-model/movie-model-module';



@Component({
  selector: 'app-movie-detail',
  standalone:true,
  imports: [RouterLink],
  templateUrl: './movie-detail.html',
  styleUrl: './movie-detail.css',
})
export class MovieDetail {
  private movieService = inject(MovieService);
  private activatedRoute = inject(ActivatedRoute);

  movie = signal<Movie | null>(null);
  loading = signal<boolean>(false);
  error = signal<string>('');

  ngOnInit() {
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    if(id) {
      this.movieService.getMovieById(Number(id)).subscribe({
        next: (movie) => {
          this.movie.set(movie);
          this.loading.set(false);
        },
        error: (err) => {
          this.error.set('Error al cargar la pelicula');
          this.loading.set(false);
          console.log('Error', err)
        }
        
      })
    }
  }
  

}
