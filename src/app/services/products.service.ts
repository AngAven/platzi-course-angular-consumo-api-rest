import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Product, CreateProductDTO } from './../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  private apiUrl = 'https://api.escuelajs.co/api/v1/products'

  constructor(
    private http: HttpClient
  ) { }

  getAllProducts() {
    return this.http.get<Product[]>( this.apiUrl + '?limit=20&offset=10');
  }

  getProduct(id: string){
    return this.http.get<Product>(this.apiUrl + '/' + id)
  }

  create(data: CreateProductDTO){
    return this.http.post<Product>(this.apiUrl, data)
  }

}
