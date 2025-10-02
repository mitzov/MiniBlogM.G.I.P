import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NgFor, DatePipe, SlicePipe, NgIf } from '@angular/common';
import { PostService } from '../../services/post.service';
import { Post } from '../../models/post';

@Component({
  selector: 'app-post-list',
  standalone: true,
  imports: [RouterLink, NgFor, DatePipe, SlicePipe, NgIf],
  templateUrl: './post-list.component.html'
})
export class PostListComponent implements OnInit {
  posts: Post[] = [];

  constructor(private postService: PostService) {}

  ngOnInit(): void {
    this.refresh();
  }

  refresh() {
    this.posts = this.postService.getAll();
  }

  delete(id: number) {
    if (confirm('Eliminare questo post?')) {
      this.postService.remove(id);
      this.refresh();
    }
  }
}
