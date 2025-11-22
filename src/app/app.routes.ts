import { Routes } from '@angular/router';
import { MovieList } from './components/movie-list/movie-list';
import { MovieDetail } from './components/movie-detail/movie-detail';

export const routes: Routes = [
    {path: '', component: MovieList},
    {path:'movie/:id', component: MovieDetail},
    {path: '**', redirectTo: ''}
];
