import { BookItem } from './../../shared/model/google-books';
import { GoogleBooksService } from './google-books-api.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { ChangeDetectorRef } from '@angular/core';
import { forkJoin } from 'rxjs/internal/observable/forkJoin';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-google-books',
  templateUrl: './google-books.component.html',
  styleUrls: ['./google-books.component.css']
})
export class GoogleBooksComponent implements OnInit {

  form: FormGroup;
  pageSize: number = 9;
  num = 0;

  selectedBook: BookItem;
  items: BookItem[] = [];
  totalItems: number = -1;
  pages: number[] = [];
  loadingPage: boolean = false;
  favoritesBooks: Map<string, BookItem>;
  myLibrary: boolean = false;
  private currentSearch: string;

  constructor(
    private fb: FormBuilder,
    private modalService: NgbModal,
    private googleBooksService: GoogleBooksService,
    private changeDetectorRef: ChangeDetectorRef
  ) {

  }
  ngOnInit() {
    this.configureNew();
    this.googleBooksService.getFavoritesBooks().subscribe((data) => {
      this.favoritesBooks = data;
    });
    forkJoin(
      this.googleBooksService.getControlValue('search_control'),
      this.googleBooksService.getControlValue('books_favorites_control')
    ).subscribe((results: any[]) => {
      this.form.get('search').setValue(results[0]);
      if (results[1] && results[1].length) {
        this.items = results[1];
        this.form.get('favorite').setValue(true);
        this.form.get('search').disable();
      }

      this.form.get('favorite').valueChanges.subscribe((favorite) => {
        if (favorite) {
          this.items = this.items.filter((item: BookItem) => item.favorite);
          this.googleBooksService.saveControlValue('books_favorites_control', this.items)
            .subscribe();
          this.form.get('search').disable();
          this.changeDetectorRef.markForCheck();
        } else {
          this.googleBooksService.clearControlValue('books_favorites_control')
            .subscribe();
          this.form.get('search').enable();
          this.searchBooks();
        }
      });
      this.changeDetectorRef.markForCheck();
    })
  }

  configureNew() {
    this.form = this.fb.group({
      search: [null, Validators.required],
      favorite: [false]
    });
  }

  getBooks(offset: number) {
    this.googleBooksService.SearchBooks(this.form.get('search').value, this.pageSize, offset, this.favoritesBooks)
      .subscribe((data) => {
        this.items = [];
        this.pages = [];
        this.items = this.items.concat(data.items);
        this.totalItems = data.totalItems;
        this.loadingPage = false;
        this.changeDetectorRef.markForCheck();
        this.getNumberPages(this.totalItems);
      });
  }
  getNumberPages(totalItems: number) {
    let numPage = Math.round((totalItems / 9));
    for (let i = 0; i <= numPage; i++) {
      this.pages.push(i);
    }
  }

  getPage(page: number): void {
    this.num = page;
    let offset = (page * 2);
    this.getBooks(offset);
  }

  getNextPage(): void {
    if (Math.round((this.totalItems / 9)) >= this.num) {
      this.num = this.num + 1;
      let offset = (this.num * 2);
      this.getBooks(offset);
    }
  }

  searchBooks() {
    if (this.form.valid) {
      this.currentSearch = this.form.get('search').value;
      this.googleBooksService.saveControlValue('search_control', this.currentSearch).subscribe();
      this.loadingPage = true;
      this.items = [];
      this.num = 0;
      this.getBooks(this.num);
    }
  }

  openModal(m, book: BookItem) {
    this.selectedBook = book;
    this.modalService.open(m, { windowClass: 'my-class' });
  }

  public preview(book: BookItem) {
    window.open(book.preview);
  }

  public download(book: BookItem) {
    if (book.pdf != undefined) {
      window.open(book.pdf);
    }
  }

  public addFavorite(book: BookItem) {
    if (book.favorite) {
      this.favoritesBooks.delete(book.id);
    } else {
      this.favoritesBooks.set(book.id, book);
    }
    this.googleBooksService.saveFavoriteBooks(this.favoritesBooks).subscribe(() => {
      book.favorite = !book.favorite;
      this.changeDetectorRef.markForCheck();
    })
  }

}
