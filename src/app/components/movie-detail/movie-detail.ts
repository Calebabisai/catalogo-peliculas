import { Component, inject, signal} from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { MovieService } from '../../services/movie-service';
import { Movie } from '../../models/movie-model/movie-model-module';

/**
 * Componente encargado de mostrar la información detallada de una película específica.
 * Utiliza la URL para obtener el ID de la película y solicitar los datos al servicio.
 */
@Component({
  selector: 'app-movie-detail',
  standalone:true,
  imports: [RouterLink], // Importamos RouterLink para poder navegar de vuelta al catálogo
  templateUrl: './movie-detail.html',
  styleUrl: './movie-detail.css',
})
export class MovieDetail {
  // Inyectamos el servicio de películas para hacer peticiones a la API
  private movieService = inject(MovieService);
  // Inyectamos ActivatedRoute para poder leer los parámetros de la URL (como el ID)
  private activatedRoute = inject(ActivatedRoute);

  // Signals para manejar el estado del componente de forma reactiva
  movie = signal<Movie | null>(null); // Almacena los datos de la película. Inicialmente es null.
  loading = signal<boolean>(true);    // Indica si se están cargando los datos. Inicialmente true.
  error = signal<string>('');         // Almacena mensajes de error si la petición falla.

  /**
   * Método del ciclo de vida de Angular que se ejecuta al iniciar el componente.
   * Aquí capturamos el ID de la URL y solicitamos la película.
   */
  ngOnInit() {
    // Obtenemos el parámetro 'id' de la URL actual
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    
    if(id) {
      // Si existe un ID, llamamos al servicio convirtiendo el ID a número
      this.movieService.getMovieById(Number(id)).subscribe({
        next: (movie) => {
          // Si la petición es exitosa, guardamos la película y desactivamos el loading
          this.movie.set(movie);
          this.loading.set(false);
        },
        error: (err) => {
          // Si hay un error, guardamos el mensaje y desactivamos el loading
          this.error.set('Error al cargar la pelicula');
          this.loading.set(false);
          console.log('Error', err)
        }
      })
    }
  }
}
