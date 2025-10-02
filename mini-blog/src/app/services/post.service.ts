import { Injectable } from '@angular/core';
import { Post } from '../models/post';

const STORAGE_KEY = 'mini_blog_posts_v1';

@Injectable({ providedIn: 'root' })
export class PostService {
  private posts: Post[] = [];

  constructor() {
    this.load();
    if (this.posts.length === 0) {
      this.seed();
    }
  }

  private load() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      this.posts = raw ? JSON.parse(raw) as Post[] : [];
    } catch {
      this.posts = [];
    }
  }

  private save() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(this.posts));
  }

  private seed() {
    const now = new Date().toISOString();
    this.posts = [
      { id: 1, titolo: 'Benvenuto nel Mini Blog', contenuto: 'Esempio standalone con Angular + Bootstrap.', autore: 'Admin', createdAt: now },
      { id: 2, titolo: 'Come funziona', contenuto: 'Array locale + localStorage, routing standalone.', autore: 'Admin', createdAt: now },
      { id: 3, titolo: 'Routing', contenuto: 'Clicca su un post per vedere il dettaglio.', autore: 'Alice', createdAt: now },
      { id: 4, titolo: 'Aggiungi Post', contenuto: 'Vai su "Nuovo Post" per creare un post.', autore: 'Bob', createdAt: now },
      { id: 5, titolo: 'Modifica Post', contenuto: 'Apri un post e premi "Modifica".', autore: 'Charlie', createdAt: now }
    ];
    this.save();
  }

  getAll(): Post[] {
    return [...this.posts].sort((a, b) => b.createdAt.localeCompare(a.createdAt));
  }

  getById(id: number): Post | undefined {
    return this.posts.find(p => p.id === id);
  }

  add(post: Omit<Post, 'id' | 'createdAt'>): Post {
    const id = this.posts.length ? Math.max(...this.posts.map(p => p.id)) + 1 : 1;
    const newPost: Post = { id, createdAt: new Date().toISOString(), ...post };
    this.posts.push(newPost);
    this.save();
    return newPost;
  }

  update(id: number, changes: Partial<Omit<Post, 'id' | 'createdAt'>>): Post | undefined {
    const idx = this.posts.findIndex(p => p.id === id);
    if (idx === -1) return undefined;
    this.posts[idx] = { ...this.posts[idx], ...changes };
    this.save();
    return this.posts[idx];
  }

  remove(id: number) {
    this.posts = this.posts.filter(p => p.id !== id);
    this.save();
  }
}
