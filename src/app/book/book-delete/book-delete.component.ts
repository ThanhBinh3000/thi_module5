import { Component, OnInit } from '@angular/core';
import {Book} from '../../model/book';
import {BookService} from '../../service/book/book.service';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import {NotificationService} from '../../service/notification/notification.service';

@Component({
  selector: 'app-book-delete',
  templateUrl: './book-delete.component.html',
  styleUrls: ['./book-delete.component.css']
})
export class BookDeleteComponent implements OnInit {
  book: Book;
  id: number;
  bookForm: any;

  constructor(private bookService: BookService,
              private router: Router,
              private activatedRoute: ActivatedRoute,
              private notificationService: NotificationService) {
    this.activatedRoute.paramMap.subscribe((paramMap: ParamMap) => {
      this.id = +paramMap.get('id');
    });
    this.getBook();
  }

  ngOnInit() {
  }

  private getBook() {
    return this.bookService.findById(this.id).subscribe(book => {
      this.book = book;
    });
  }

  deleteBook() {
    this.bookService.deleteBook(this.id).subscribe(() => {
      this.router.navigate(['/book/list']);
      this.notificationService.showMessage('success', 'success');
    }, e => {
      this.notificationService.showMessage('error', 'failure');
    });
  }
}
