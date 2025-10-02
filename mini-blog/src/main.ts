import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter, Routes } from '@angular/router';

import { AppComponent } from './app/app.component';
import { PostListComponent } from './app/components/post-list/post-list.component';
import { PostDetailComponent } from './app/components/post-detail/post-detail.component';
import { NewPostFormComponent } from './app/components/new-post-form/new-post-form.component';

export const routes: Routes = [
  { path: '', component: PostListComponent },
  { path: 'posts/:id', component: PostDetailComponent },
  { path: 'new', component: NewPostFormComponent },
  { path: 'edit/:id', component: NewPostFormComponent },
  { path: '**', redirectTo: '' }
];

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(routes),
  ]
}).catch((err) => console.error(err));
