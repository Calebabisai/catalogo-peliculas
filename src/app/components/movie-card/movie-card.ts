import { Component, Input } from '@angular/core';
import { Movie } from '../../models/movie-model/movie-model-module';
import { TruncatePipe } from '../../pipes/truncate-pipe';

@Component({
  selector: 'app-movie-card',
  standalone:true,
  imports: [TruncatePipe],
  templateUrl: './movie-card.html',
  styleUrl: './movie-card.css',
})
export class MovieCard {
 @Input() movie: Movie = {} as Movie;
}
