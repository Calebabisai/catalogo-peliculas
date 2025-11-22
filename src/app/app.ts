import { Component, signal } from '@angular/core';
import { MovieList } from './components/movie-list/movie-list';
import { RouterOutlet } from "@angular/router";

@Component({
  selector: 'app-root',
  standalone:true,
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('catalogo-peliculas');
}
