/*
Model donde encontramos la informacion de la pelicula, y todos los datos que nos ofrece la API de TMDB
*/
export interface Movie {
  id: number;
  titulo: string;
  sinopsis: string;
  lanzamiento: number;
  genero: string[];
  calificacion: number;
  poster: string;
  director: string;
  //He extendido la interfaz, para aprovechar mas datos que nos ofrece
  //la API de TMDB
  duracion?: number;
  presupuesto?: number;
  ingresos?: number;
  productoras?: string[];
  idioma?: string;
  estado?: string;
}
