import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BookService } from 'src/app/book.service';

@Component({
  selector: 'app-add-book',
  templateUrl: './add-book.component.html',
  styleUrls: ['./add-book.component.css']
})
export class AddBookComponent implements OnInit {
  addBooksForm: FormGroup;
  constructor(private formBuilder: FormBuilder,
    private router: Router, private bookService: BookService) { }

  ngOnInit() {
    this.addBooksForm = this.formBuilder.group({
      bookName: ['', [Validators.required]],
      authorName: ['', [Validators.required]],
      genre: ['', [Validators.required]],
      rating: ['', [Validators.required, Validators.minLength(10)]],

    });
  }
  get f() { return this.addBooksForm.controls; }
  addBook() {
    console.log(this.addBooksForm.value);
    this.bookService.addBook(this.addBooksForm.value).subscribe(
      // () => this.router.navigate(['list']),
      (err: any) => console.log(err)
    );

  }

}
