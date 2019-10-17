import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { BorrowBooks } from 'src/app/models/borrow.model';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { BookService } from 'src/app/book.service';

@Component({
  selector: 'app-barrow',
  templateUrl: './barrow.component.html',
  styleUrls: ['./barrow.component.css']
})
export class BarrowComponent implements OnInit {
  barrowBooksForm: FormGroup;
  books: BorrowBooks;
  constructor(private formBuilder: FormBuilder, private bookService: BookService) { }

  ngOnInit() {
    this.barrowBooksForm = this.formBuilder.group({
      userId: ['', [Validators.required]],
      bookId: ['', [Validators.required]],
      fromDate: ['', [Validators.required]],
      endDate: ['', [Validators.required]],
    });
    const barrowID = localStorage.getItem('BookID');
    const userId = localStorage.getItem("userId");
    this.barrowBooksForm.patchValue({
      // country: this.CountryResponse,
      userId: userId,
      bookId: barrowID
    });

  }
  barrowBook() {
    console.log(this.barrowBooksForm.value);
    this.bookService.barrowBook(this.barrowBooksForm.value).subscribe((data) => {
      (err: any) => console.log(err);
      console.log(data);
    }
      // () => this.router.navigate(['list']),

    );
  }

}
