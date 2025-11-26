import { Component, OnInit, signal, inject, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ApiService } from '../../service/api-service';
import { Characters } from '../../common/api-interfaz';

@Component({
  selector: 'app-personaje-detalles-component',
  imports: [CommonModule],
  templateUrl: './personaje-detalles-component.html',
  styleUrl: './personaje-detalles-component.css',
})
export class PersonajeDetallesComponent implements OnInit {
  private apiService = inject(ApiService);
  private router = inject(Router);
  
  id = input.required<string>();
  personaje = signal<Characters | null>(null);
  loading = signal<boolean>(true);
  error = signal<string>('');

  ngOnInit(): void {
    const characterId = parseInt(this.id());
    if (!isNaN(characterId)) {
      this.loadPersonaje(characterId);
    } else {
      this.error.set('ID de personaje inválido');
      this.loading.set(false);
    }
  }

  loadPersonaje(id: number): void {
    this.loading.set(true);
    this.apiService.getCharacterById(id).subscribe({
      next: (data) => {
        this.personaje.set(data);
        this.loading.set(false);
      },
      error: (err) => {
        this.error.set('Error al cargar el personaje');
        this.loading.set(false);
        console.error(err);
      }
    });
  }

  volver(): void {
    this.router.navigate(['/personajes']);
  }

  calculateKiPercentage(ki: string, maxKi: string): number {
    const kiValue = parseFloat(ki.replace(/[^0-9.]/g, ''));
    const maxKiValue = parseFloat(maxKi.replace(/[^0-9.]/g, ''));
    if (maxKiValue === 0) return 0;
    return (kiValue / maxKiValue) * 100;
  }
}
