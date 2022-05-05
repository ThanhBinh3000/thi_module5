import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {BookService} from '../../service/book/book.service';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import {NotificationService} from '../../service/notification/notification.service';

@Component({
  selector: 'app-book-edit',
  templateUrl: './book-edit.component.html',
  styleUrls: ['./book-edit.component.css']
})
export class BookEditComponent implements OnInit {
  bookForm: FormGroup = new FormGroup({
    title: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(20)]),
    author: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.required]),
  });
  id: number;

  constructor(private bookService: BookService,
              private activatedRoute: ActivatedRoute,
              private notificationService: NotificationService,
              private router: Router) {
    this.activatedRoute.paramMap.subscribe((paramMap: ParamMap) => {
      this.id = +paramMap.get('id');
      this.getBook();
    });
  }

  ngOnInit() {
  }

  getBook() {
    return this.bookService.findById(this.id).subscribe(book => {
      this.titleEdit.setValue(book.title);
      this.authorEdit.setValue(book.author);
      this.descriptionEdit.setValue(book.description);
    });
  }

  updateBook() {
    if (this.bookForm.valid) {
      const book = this.bookForm.value;
      this.bookService.updateBook(this.id, book).subscribe(() => {
        this.notificationService.showMessage('success', 'Sửa thành công!');
        this.router.navigate(['/book/list']);
      }, error => {
        console.log(error);
      });
    } else {
      this.notificationService.showMessage('error', 'Sửa lỗi!');
    }
  }
  get titleEdit() {
    return this.bookForm.get('title');
  }

  get authorEdit() {
    return this.bookForm.get('author');
  }

  get descriptionEdit() {
    return this.bookForm.get('description');
  }

}
