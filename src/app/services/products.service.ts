import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpErrorResponse, HttpStatusCode } from '@angular/common/http';
import {catchError} from "rxjs/operators";
import {throwError} from "rxjs/";

import {Product, CreateProductDTO, UpdateProductDTO} from './../models/product.model';
import {environment} from '../../environments/environment'

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  private apiUrl = `${environment.API_URL}/api/v1/products`

  constructor(
    private http: HttpClient
  ) { }

  getAllProducts(limit?: number, offset?: number) {
    let params = new HttpParams()
    if(limit && offset !== undefined){
      params = params.set('limit', limit)
      params = params.set('offset', offset)
    }

    return this.http.get<Product[]>( this.apiUrl, {params});
  }

  getProduct(id: string){
    return this.http.get<Product>(`${this.apiUrl}/${id}`)
    .pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 500){
          return throwError('Ups algo salió mal en el server')
        }
        if (error.status == HttpStatusCode.NotFound){
          return throwError('El producto no existe')
        }
        if (error.status === HttpStatusCode.Unauthorized){
          return throwError('No estas permitido')
        }
        return throwError('Ups algo salió mal')
      })
    )
  }

  getPRroductsByPage(limit: number, offset: number){
    return this.http.get<Product[]>(`${this.apiUrl}`, {
      params: {
        limit,
        offset
      }
    })
  }

  create(dto: CreateProductDTO){
    return this.http.post<Product>(this.apiUrl, dto)
  }

  update(id: string, dto: UpdateProductDTO){
    return this.http.put<Product>(`${this.apiUrl}/${id}`, dto)
  }

  delete(id: string){
    return this.http.delete<boolean>(`${this.apiUrl}/${id}`)
  }
}
