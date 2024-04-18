import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { MemoryFormComponent } from '../../components/memory-form/memory-form.component';
import { Memory } from '../../interfaces/memory';
import { MemoriesService } from '../../services/memories.service';

@Component({
  selector: 'app-edit-memory',
  standalone: true,
  imports: [CommonModule, HttpClientModule, MemoryFormComponent],
  providers: [MemoriesService],
  templateUrl: './edit-memory.component.html',
  styleUrl: './edit-memory.component.css',
})
export class EditMemoryComponent implements OnInit {
  private memoriesService = inject(MemoriesService);
  private messageService = inject(MessageService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);

  memory!: Memory;
  btnText: string = 'Atualizar';

  async editHandler(editedMemory: Memory) {
    const id = editedMemory.id;
    const formData = new FormData();

    formData.append('title', editedMemory.title);
    formData.append('description', editedMemory.description);

    if (editedMemory.image) {
      formData.append('image', editedMemory.image);
    }

    await this.memoriesService.updateMemory(id!, formData).subscribe();

    this.messageService.add({
      severity: 'success',
      summary: 'Concluído',
      detail: 'Memória atualizada com sucesso!',
      life: 3000,
    });

    this.router.navigate([`/memory/${id}`]);
  }

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));

    this.memoriesService.getMemoryById(id).subscribe((item) => {
      this.memory = item.data;
    });
  }
}
