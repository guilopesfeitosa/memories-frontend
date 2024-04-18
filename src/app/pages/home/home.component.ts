import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component, OnInit, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { InputTextModule } from 'primeng/inputtext';
import { environment } from '../../../environments/environment';
import { Memory } from '../../interfaces/memory';
import { MemoriesService } from '../../services/memories.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    HttpClientModule,
    CommonModule,
    RouterLink,
    CardModule,
    ButtonModule,
    IconFieldModule,
    InputIconModule,
    InputTextModule,
  ],
  providers: [MemoriesService],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit {
  private memoriesService = inject(MemoriesService);

  apiUrl = environment.baseApiUrl;
  allMemories: Memory[] = [];
  filtredMemories: Memory[] = [];
  searchTerm: string = '';

  search(e: Event): void {
    const target = e.target as HTMLInputElement;
    const value = target.value;

    this.filtredMemories = this.allMemories.filter((memory) => {
      return memory.title.toLocaleLowerCase().includes(value);
    });
  }

  ngOnInit(): void {
    this.memoriesService.getAllMemories().subscribe((memories) => {
      const data = memories.data;

      data.map((memory) => {
        memory.created_at = new Date(memory.created_at!).toLocaleDateString(
          'pt-BR',
        );
      });

      this.allMemories = data;
      this.filtredMemories = data;
    });
  }
}
