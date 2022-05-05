import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, NgForm, Validators} from '@angular/forms';
import {BookService} from '../../service/book/book.service';
import {Route, Router} from '@angular/router';
import {NotificationService} from '../../service/notification/notification.service';

@Component({
  selector: 'app-book-create',
  templateUrl: './book-create.component.html',
  styleUrls: ['./book-create.component.css']
})
export class BookCreateComponent implements OnInit {
  bookForm: FormGroup = new FormGroup({
    title: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(20)]),
    author: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.required]),
  });
  constructor(private bookService: BookService,
              private notificationService: NotificationService,
              private router: Router) { }

  ngOnInit() {
  }
  get idCreate() {
    return this.bookForm.get('id');
  }
  get titleCreate() {
    return this.bookForm.get('title');
  }
  get authorCreate() {
    return this.bookForm.get('author');
  }
  get descriptionCreate() {
    return this.bookForm.get('author');
  }

  createBook() {
    if (this.bookForm.valid) {
      const book = this.bookForm.value;
      this.bookService.saveBook(book).subscribe(() => {
        this.bookForm.reset();
        this.notificationService.showMessage('success', 'success');
        this.router.navigate(['/book/list']);
      }, error => {
          console.log(error);
        });
    } else {
      this.notificationService.showMessage('error', 'failure');
    }
  }
}
