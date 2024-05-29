import axios from 'axios';

export class ProductClient {
  private static instance: ProductClient;
  private url: string;
  private token: string;

  private constructor() {
    this.url = 'http://localhost:3005/';
  }

  public static getInstance() {
    if (!ProductClient.instance) {
      ProductClient.instance = new ProductClient();
    }

    return ProductClient.instance;
  }

  public async loadAllProducts(product: any){
    await axios.post(
      `${this.url}products`,
      product,
      {
        headers: {
          Authorization: this.token,
        }
      }
    )
  }

  public async destroyer(id: number) {
    return (await axios.delete(
      `${this.url}products?id=${id}`,
      {
        headers: {
          Authorization: this.token,
        }
      }
    )).data
  }
  public async authenticationProcess(email, password) {
    this.token = (
      await axios.get(
        `${this.url}auth/login?email=${email}&password=${password}`,
      )
    ).data.token;
  }

  public async products() {
    return await axios.get(`${this.url}products`, {
      headers: {
        Authorization: this.token,
      },
    });
  }
}