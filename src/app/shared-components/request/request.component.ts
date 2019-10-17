import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { BookService } from 'src/app/book.service';

@Component({
  selector: 'app-request',
  templateUrl: './request.component.html',
  styleUrls: ['./request.component.css']
})
export class RequestComponent implements OnInit {
  requestBooksForm: FormGroup;
  constructor(private formBuilder: FormBuilder, private bookService: BookService) { }

  ngOnInit() {
    this.requestBooksForm = this.formBuilder.group({
      userId: ['', [Validators.required]],
      bookId: ['', [Validators.required]],
      fromDate: ['', [Validators.required]],
      endDate: ['', [Validators.required]],
    });
    const barrowID = localStorage.getItem('BookID');
    const userId = localStorage.getItem("userId");
    this.requestBooksForm.patchValue({
      // country: this.CountryResponse,
      userId: userId,
      bookId: barrowID
    });

  }
  requestBook() {
    console.log(this.requestBooksForm.value);
    this.bookService.requestBook(this.requestBooksForm.value).subscribe((data) => {
      (err: any) => console.log(err);
      console.log(data);
    }
      // () => this.router.navigate(['list']),

    );
  }

}
