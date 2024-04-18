import { Routes } from '@angular/router';
import { AboutComponent } from './pages/about/about.component';
import { EditMemoryComponent } from './pages/edit-memory/edit-memory.component';
import { HomeComponent } from './pages/home/home.component';
import { MemoryComponent } from './pages/memory/memory.component';
import { NewMemoryComponent } from './pages/new-memory/new-memory.component';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'about',
    component: AboutComponent,
  },
  {
    path: 'memory/new',
    component: NewMemoryComponent,
  },
  {
    path: 'memory/edit/:id',
    component: EditMemoryComponent,
  },
  {
    path: 'memory/:id',
    component: MemoryComponent,
  },
];
