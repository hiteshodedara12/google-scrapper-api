import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-product',
  standalone: true,
  imports: [HttpClientModule, FormsModule, CommonModule],
  templateUrl: './product.component.html',
  styleUrl: './product.component.scss',
})
export class ProductComponent {
  constructor(private http: HttpClient) {}
  inputValue: any;
  data: any;
  onSearch() {
    console.log(this.inputValue, 'inputValue');
    if (this.inputValue) {
      this.http
        .get<any>(
          `http://localhost:3000/api/products/?apiKey=abcdefghijk&platform=google&country=in&query=${this.inputValue}`
        )
        .subscribe((response) => {
          console.log('Data from backend:', response, 'macbook-m2');
          this.data = response;
        });
    }
  }
}
