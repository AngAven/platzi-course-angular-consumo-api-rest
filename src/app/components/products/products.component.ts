import { Component, OnInit } from '@angular/core';

import { Product, CreateProductDTO, UpdateProductDTO } from '../../models/product.model';

import { StoreService } from '../../services/store.service';
import { ProductsService } from '../../services/products.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {

  myShoppingCart: Product[] = [];
  total = 0;
  products: Product[] = [];
  showProductDetail = false
  productChosen: Product = {
    id: '',
    price: 0,
    images: [],
    title: '',
    category: {
      id: '',
      name: ''
    },
    description: ''
  };

  constructor(
    private storeService: StoreService,
    private productsService: ProductsService
  ) {
    this.myShoppingCart = this.storeService.getShoppingCart();
  }

  ngOnInit(): void {
    this.productsService.getAllProducts()
    .subscribe(data => {
      console.log('data => ', data)
      this.products = data;
    });
  }

  onAddToShoppingCart(product: Product) {
    this.storeService.addProduct(product);
    this.total = this.storeService.getTotal();
  }

  toggleProductDetail(){
    this.showProductDetail = !this.showProductDetail
  }

  onShowDetail(id: string){
    console.log('id => ', id)
    this.productsService.getProduct(id)
    .subscribe(data => {
      console.log('product chosen => ', data)
      this.toggleProductDetail()
      this.productChosen = data
    })
  }

  createNewProduct(){
    const product: CreateProductDTO = {
      title: 'nuevo producto',
      description: 'aqui esta la descripción',
      images: ['https://images.unsplash.com/photo-1695030306817-38c591d61885?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=4221&q=80'],
      price: 10,
      categoryId: 2

    }
    this.productsService.create(product)
    .subscribe(data => {
      console.log('Response create product', data)
      this.products.unshift(data)
    })
  }

  updateProduct(){
    const changes: UpdateProductDTO = {
      title: 'nuevo título'
    }

    const id = this.productChosen.id

    this.productsService.update(id, changes)
    .subscribe(dto => {
      console.log('updated => ', dto)
      const productIndex = this.products.findIndex(item => item.id === this.productChosen.id)
      this.products[productIndex] = dto
    })
  }
}
