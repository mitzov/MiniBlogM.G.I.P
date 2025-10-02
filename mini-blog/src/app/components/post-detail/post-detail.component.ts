import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink, Router } from '@angular/router';
import { NgIf, DatePipe } from '@angular/common';
import { PostService } from '../../services/post.service';
import { Post } from '../../models/post';

@Component({
  selector: 'app-post-detail',
  standalone: true,
  imports: [RouterLink, NgIf, DatePipe],
  templateUrl: './post-detail.component.html'
})
export class PostDetailComponent implements OnInit {
  post?: Post;

  constructor(private route: ActivatedRoute, private router: Router, private postService: PostService) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.post = this.postService.getById(id);
    if (!this.post) {
      alert('Post non trovato');
      this.router.navigateByUrl('/');
    }
  }
}
