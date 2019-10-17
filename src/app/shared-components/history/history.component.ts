import { Component, OnInit } from '@angular/core';
import { BookService } from 'src/app/book.service';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css']
})
export class HistoryComponent implements OnInit {
  history: any;
  constructor(private bookService: BookService) { }

  ngOnInit() {
    const userId = localStorage.getItem("userId");
    this.bookService.viewHistory(userId).subscribe((data: any) => {
      console.log(data);
      this.history = data.bookDetails;
    })

  }

}
