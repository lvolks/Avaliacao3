import { Injectable } from '@nestjs/common';
import { Product } from './models/Product';
import { InjectModel } from '@nestjs/sequelize';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AppService {
  public constructor(
    @InjectModel(Product)
    private product: typeof Product,
    private readonly jwtService: JwtService,
  ) {}

  public async generateToken(payload: any): Promise<string> {
    return this.jwtService.signAsync(payload);
  }

  public async selectProduct(name) {
    return name
      ? this.product.findAll({
          where: {
            name,
          },
        })
      : this.product.findAll();
  }

  public createProduct(body: any) {
    this.product.create(body);
  }

  public updateProduct(body: any, id: any) {
    this.product.update(body, {
      where: {
        id,
      },
    });
  }

  public deleteProduct(id: any) {
    this.product.destroy({
      where: {
        id,
      },
    });
  }
}
