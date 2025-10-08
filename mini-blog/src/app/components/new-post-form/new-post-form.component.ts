import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, ActivatedRoute, RouterLink } from '@angular/router';
import { NgIf } from '@angular/common';
import { PostService } from '../../services/post.service';

@Component({
  selector: 'app-new-post-form',
  standalone: true,
  imports: [FormsModule, RouterLink, NgIf],
  templateUrl: './new-post-form.component.html'
})
export class NewPostFormComponent implements OnInit {
  mode: 'new' | 'edit' = 'new';
  titolo = '';
  contenuto = '';
  autore = '';
  imageUrl = '';
  private editingId?: number;

  constructor(private postService: PostService, private router: Router, private route: ActivatedRoute) {}

  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('id');
    if (idParam) {
      this.mode = 'edit';
      this.editingId = Number(idParam);
      const post = this.postService.getById(this.editingId);
      if (post) {
        this.titolo = post.titolo;
        this.contenuto = post.contenuto;
        this.autore = post.autore;
        this.imageUrl = post.imageUrl || '';
      } else {
        alert('Post non trovato');
        this.router.navigateByUrl('/');
      }
    }
  }

  submit() {
    if (!this.titolo.trim() || !this.autore.trim() || !this.contenuto.trim()) {
      alert('Compila tutti i campi');
      return;
    }

    const postData = {
      titolo: this.titolo.trim(),
      contenuto: this.contenuto.trim(),
      autore: this.autore.trim(),
      imageUrl: this.imageUrl.trim() || undefined
    };

    if (this.mode === 'new') {
      this.postService.add(postData);
    } else if (this.mode === 'edit' && this.editingId != null) {
      this.postService.update(this.editingId, postData);
    }

    this.router.navigateByUrl('/');
  }
}
