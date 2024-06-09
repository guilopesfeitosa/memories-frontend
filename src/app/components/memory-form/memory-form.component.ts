import { CommonModule } from '@angular/common';
import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { FileUpload, FileUploadModule } from 'primeng/fileupload';
import { FloatLabelModule } from 'primeng/floatlabel';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { Memory } from '../../interfaces/memory';

@Component({
  selector: 'app-memory-form',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    FloatLabelModule,
    InputTextModule,
    InputTextareaModule,
    FileUploadModule,
    ButtonModule,
  ],
  templateUrl: './memory-form.component.html',
  styleUrl: './memory-form.component.css',
})
export class MemoryFormComponent implements OnInit {
  @Output() memoryFormEmitter = new EventEmitter<Memory>();
  @Input() btnText!: string;
  @Input() memoryData: Memory | null = null;
  @ViewChild('fileUpload') fileUpload!: FileUpload;

  memoryForm!: FormGroup;

  get title() {
    return this.memoryForm.get('title')!;
  }

  get description() {
    return this.memoryForm.get('description')!;
  }

  onSubmit(): void {
    if (this.memoryForm.invalid) {
      return;
    }
    this.memoryForm.patchValue({ image: this.fileUpload.files[0] });

    this.memoryFormEmitter.emit(this.memoryForm.value);
  }

  ngOnInit(): void {
    this.memoryForm = new FormGroup({
      id: new FormControl(this.memoryData ? this.memoryData.id : ''),
      title: new FormControl(this.memoryData ? this.memoryData.title : '', [
        Validators.required,
      ]),
      description: new FormControl(
        this.memoryData ? this.memoryData.description : '',
        [Validators.required],
      ),
      image: new FormControl(''),
    });
  }
}
