import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Product } from '../payload/product';

@Injectable({
  providedIn: 'root'
})

export class ProductService {

  // environment.apiUrl: "http://localhost:8080"
  // private baseUrl = environment.apiUrl + '/products';
  // private baseUrl = environment.apiUrl;
  host = environment.apiUrl;

  // inject httpClient
  constructor(
    private httpClient: HttpClient
  ) { }

  // get products by page and based on the search criteria
  searchProducts(pageNumber: number, pageSize: number, searchTerm: string): Observable<Product[]> {

    // ex: url = http://localhost:8080/product-search?pageNumber=0&pageSize=8&searchTerm=
    console.log(`${this.host}/product-search?pageNumber=${pageNumber}&pageSize=${pageSize}&searchTerm=${searchTerm}`)

    return this.httpClient.get<Product[]>(
      `${this.host}/product-search?pageNumber=${pageNumber}&pageSize=${pageSize}&searchTerm=${searchTerm}`
    )
  }

  // calculate total products for counting total pages
  getTotalProducts(searchTerm: string): Observable<number> {

    return this.httpClient.get<number>(
      `${this.host}/product-total-elements?searchTerm=${searchTerm}`
    );

  }

  // find product by id
  findById(id: number): Observable<Product> {

    return this.httpClient.get<Product>(`${this.host}/product-list/${id}`);

  } // end of findById()

}
