import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BooksList } from './models/listBooks.model';
import { BorrowBooks } from 'src/app/models/borrow.model';

@Injectable({
  providedIn: 'root'
})
export class BookService {
  // library/users/login
  constructor(private httpClient: HttpClient) { }
  // 13.233.140.75
  searchBooks(userID: string): Observable<BooksList[]> {
    return this.httpClient.get<BooksList[]>('http://13.233.140.75:7770/library/books/' + userID);
  }

  viewHistory(userID: string): Observable<BooksList[]> {
    return this.httpClient.get<BooksList[]>('http://13.233.140.75:7770/library/book/' + userID);
  }

  addBook(book: BooksList): Observable<BooksList> {
    return this.httpClient.post<BooksList>('http://13.233.140.75:7770/library/books/', book, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    })
    // .pipe(catchError(this.handleError));
  }
  // library/books/request
  barrowBook(book: BorrowBooks): Observable<BorrowBooks> {
    return this.httpClient.post<BorrowBooks>('http://13.233.140.75:7770/library/books/borrow/', book, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    })
  }

  requestBook(book: BorrowBooks): Observable<BorrowBooks> {
    return this.httpClient.post<BorrowBooks>('http://13.233.140.75:7770/library/books/request/', book, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    })
  }
}
