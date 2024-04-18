import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component, OnInit, inject } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormGroupDirective,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ConfirmationService, MenuItem, MessageService } from 'primeng/api';
import { AvatarModule } from 'primeng/avatar';
import { ButtonModule } from 'primeng/button';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { DividerModule } from 'primeng/divider';
import { FieldsetModule } from 'primeng/fieldset';
import { FloatLabelModule } from 'primeng/floatlabel';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { MenuModule } from 'primeng/menu';
import { environment } from '../../../environments/environment';
import { Comment } from '../../interfaces/comment';
import { Memory } from '../../interfaces/memory';
import { CommentsService } from '../../services/comments.service';
import { MemoriesService } from '../../services/memories.service';

@Component({
  selector: 'app-memory',
  standalone: true,
  imports: [
    CommonModule,
    HttpClientModule,
    RouterLink,
    MenuModule,
    ButtonModule,
    DividerModule,
    ConfirmDialogModule,
    FloatLabelModule,
    InputTextModule,
    InputTextareaModule,
    FormsModule,
    ReactiveFormsModule,
    FieldsetModule,
    AvatarModule,
  ],
  providers: [MemoriesService, ConfirmationService, CommentsService],
  templateUrl: './memory.component.html',
  styleUrl: './memory.component.css',
})
export class MemoryComponent implements OnInit {
  private memoriesService = inject(MemoriesService);
  private commentService = inject(CommentsService);
  private messageService = inject(MessageService);
  private confirmationService = inject(ConfirmationService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);

  memory?: Memory;
  apiUrl = environment.baseApiUrl;
  items: MenuItem[] | undefined;
  commentForm!: FormGroup;

  update() {
    this.router.navigate([`/memory/edit/${this.memory?.id}`]);
  }

  deleteConfirmation() {
    this.confirmationService.confirm({
      message: 'Tem certeza que deseja excluir essa memória?',
      header: 'Confirmação',
      icon: 'pi pi-exclamation-triangle',
      acceptLabel: 'Deletar',
      rejectLabel: 'Cancelar',
      acceptIcon: 'none',
      rejectIcon: 'none',
      rejectButtonStyleClass: 'p-button-text',
      accept: async () => {
        await this.memoriesService.removeMemory(this.memory!.id!).subscribe();

        this.messageService.add({
          severity: 'success',
          summary: 'Concluído',
          detail: 'Memória excluída com sucesso!',
          life: 3000,
        });

        this.router.navigate(['/']);
      },
    });
  }

  get text() {
    return this.commentForm.get('text')!;
  }

  get username() {
    return this.commentForm.get('username')!;
  }

  async addComment(formDirective: FormGroupDirective) {
    if (this.commentForm.invalid) {
      return;
    }
    const data: Comment = this.commentForm.value;
    data.momentId = Number(this.memory!.id);

    await this.commentService.createComment(data).subscribe((comment) => {
      this.memory!.comments!.push(comment.data);
    });

    this.messageService.add({
      severity: 'success',
      summary: 'Concluído',
      detail: 'Comentário adicionado com sucesso!',
      life: 3000,
    });

    this.commentForm.reset();
    formDirective.resetForm();
  }

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));

    this.memoriesService.getMemoryById(id).subscribe((item) => {
      const data = item.data;

      data.created_at = new Date(item.data.created_at!).toLocaleDateString(
        'pt-BR',
      );

      this.memory = data;
    });

    this.items = [
      {
        label: 'Opções',
        items: [
          {
            label: 'Editar',
            icon: 'pi pi-pencil',
            command: () => {
              this.update();
            },
          },
          {
            label: 'Deletar',
            icon: 'pi pi-trash',
            command: () => {
              this.deleteConfirmation();
            },
          },
        ],
      },
    ];

    this.commentForm = new FormGroup({
      text: new FormControl('', [Validators.required]),
      username: new FormControl('', [Validators.required]),
    });
  }
}
