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
      {
        id: 1,
        titolo: 'Rolex Daytona',
        contenuto: 'Icona del motorsport dal 1963.\nPrezzo: €32.000\nMateriali: Acciaio Oystersteel, Cerachrom\nMovimento: Calibro 4130 automatico\nAnno: 2023',
        autore: 'Luxury Watch Expert',
        createdAt: now,
        imageUrl: 'https://www.rolex.com/content/dam/rolex/production/models/rolex-daytona/m116500ln-0001/model-page/daytona_m116500ln_0001_2101_001.png'
      },
      {
        id: 2,
        titolo: 'Patek Philippe Nautilus',
        contenuto: 'Eleganza sportiva dal 1976.\nPrezzo: €120.000\nMateriali: Acciaio, vetro zaffiro\nMovimento: Calibro 26-330 S C automatico\nAnno: 2022',
        autore: 'Luxury Watch Expert',
        createdAt: now,
        imageUrl: 'https://www.patek.com/images/watches/face/5711_1A_010.png'
      },
      {
        id: 3,
        titolo: 'Audemars Piguet Royal Oak',
        contenuto: 'Design rivoluzionario dal 1972.\nPrezzo: €35.000\nMateriali: Acciaio, quadrante "Tapisserie"\nMovimento: Calibro 4302 automatico\nAnno: 2023',
        autore: 'Luxury Watch Expert',
        createdAt: now,
        imageUrl: 'https://www.audemarspiguet.com/content/dam/ap/com/products/watches/royal-oak/15500ST.OO.1220ST.01/15500ST-OO-1220ST-01-royal-oak-automatic-41-mm.png'
      },
      {
        id: 4,
        titolo: 'Omega Speedmaster Moonwatch',
        contenuto: 'Orologio della NASA dal 1969.\nPrezzo: €7.500\nMateriali: Acciaio, vetro hesalite\nMovimento: Calibro 3861 manuale\nAnno: 2023',
        autore: 'Luxury Watch Expert',
        createdAt: now,
        imageUrl: 'https://www.omegawatches.com/media/catalog/product/cache/1/image/1200x/040ec09b1e35df139433887a97daa66f/3/1/31130423001006-1.png'
      },
      {
        id: 5,
        titolo: 'Cartier Santos',
        contenuto: 'Primo orologio da polso moderno, 1904.\nPrezzo: €7.000\nMateriali: Acciaio, oro\nMovimento: Calibro 1847 MC automatico\nAnno: 2023',
        autore: 'Luxury Watch Expert',
        createdAt: now,
        imageUrl: 'https://www.cartier.com/content/dam/rcq/cartier/2022-11/medium/WSSA0030_1.png'
      }
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
