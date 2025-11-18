import { Component, Input } from '@angular/core';
import { Movie } from '../../models/movie-model/movie-model-module';

@Component({
  selector: 'app-movie-card',
  standalone:true,
  imports: [],
  templateUrl: './movie-card.html',
  styleUrl: './movie-card.css',
})
export class MovieCard {
 @Input() movie: Movie = {} as Movie;
}
