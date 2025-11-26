import { Component, OnInit, signal, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ApiService } from '../../service/api-service';
import { Characters } from '../../common/api-interfaz';

@Component({
  selector: 'app-personajes-component',
  imports: [CommonModule],
  templateUrl: './personajes-component.html',
  styleUrl: './personajes-component.css',
})
export class PersonajesComponent implements OnInit {
  private apiService = inject(ApiService);
  private router = inject(Router);
  
  personajes = signal<Characters[]>([]);
  loading = signal<boolean>(true);
  error = signal<string>('');
  currentPage = signal<number>(1);
  totalPages = signal<number>(1);

  ngOnInit(): void {
    this.loadPersonajes(1);
  }

  loadPersonajes(page: number): void {
    this.loading.set(true);
    this.apiService.getCharactersByPage(page).subscribe({
      next: (response) => {
        this.personajes.set(response.items);
        this.currentPage.set(response.meta.currentPage);
        this.totalPages.set(response.meta.totalPages);
        this.loading.set(false);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      },
      error: (err) => {
        this.error.set('Error al cargar los personajes');
        this.loading.set(false);
        console.error(err);
      }
    });
  }

  verDetalles(id: number): void {
    this.router.navigate(['/personaje', id]);
  }

  previousPage(): void {
    if (this.currentPage() > 1) {
      this.loadPersonajes(this.currentPage() - 1);
    }
  }

  nextPage(): void {
    if (this.currentPage() < this.totalPages()) {
      this.loadPersonajes(this.currentPage() + 1);
    }
  }
}
