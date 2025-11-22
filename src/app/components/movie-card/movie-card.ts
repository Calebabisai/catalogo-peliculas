import { Component, input } from '@angular/core';
import { Movie } from '../../models/movie-model/movie-model-module';
import { TruncatePipe } from '../../pipes/truncate-pipe';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-movie-card',
  standalone:true,
  imports: [TruncatePipe, RouterLink],
  templateUrl: './movie-card.html',
  styleUrl: './movie-card.css',
})
export class MovieCard {
 movie = input.required<Movie>();
}
