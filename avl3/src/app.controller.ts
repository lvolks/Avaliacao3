import { Controller, Get, Query, Delete, Post, Body } from '@nestjs/common';
import { ProductClient } from './clients/ProductClient';
import { delay } from 'rxjs';

@Controller()
export class AppController {
  private productClient:ProductClient;

  public constructor() {
    this.productClient = ProductClient.getInstance();
  }

  @Post('post-avaliacao')
  public async Authandinsert(
    @Body() body: {
      user: string 
      password: string 
      products: any[]
    }
  ){

    const { user, password, products } = body

    await this.productClient.authenticationProcess(user, password);

    for (const product of products) {
      await this.productClient.loadAllProducts(product);
    }

    return (await this.productClient.products()).data;
  }
}