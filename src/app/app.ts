import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HomeComponents } from "./componentes/home-components/home-components";
import { PersonajesComponent } from './componentes/personajes-component/personajes-component';
import { PersonajeDetallesComponent } from './componentes/personaje-detalles-component/personaje-detalles-component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HomeComponents, PersonajesComponent, PersonajeDetallesComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('Examen');
}
