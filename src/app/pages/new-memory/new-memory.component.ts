import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { MemoryFormComponent } from '../../components/memory-form/memory-form.component';
import { Memory } from '../../interfaces/memory';
import { MemoriesService } from '../../services/memories.service';

@Component({
  selector: 'app-new-memory',
  standalone: true,
  imports: [MemoryFormComponent],
  providers: [MemoriesService],
  templateUrl: './new-memory.component.html',
  styleUrl: './new-memory.component.css',
})
export class NewMemoryComponent {
  private memoryService = inject(MemoriesService);
  private messageService = inject(MessageService);
  private router = inject(Router);
  btnText = 'Cadastrar memória';

  async createHandler(memory: Memory) {
    const formData = new FormData();

    formData.append('title', memory.title);
    formData.append('description', memory.description);

    if (memory.image) {
      formData.append('image', memory.image);
    }

    await this.memoryService.createMemory(formData).subscribe();

    this.messageService.add({
      severity: 'success',
      summary: 'Concluído',
      detail: 'Memória cadastrada com sucesso!',
      life: 3000,
    });

    this.router.navigate(['/']);
  }
}
