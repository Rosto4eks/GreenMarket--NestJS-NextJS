import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../app.module';

describe('e2e', () => {
  let app: INestApplication

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile()

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    app.close()
  })
  
  describe("products module", () => {
    it("/products should return first 5 products", () => {
      return request(app.getHttpServer())
        .get("/products")
        .expect([{"id":1,"name":"крассула","price":"15.99"},{"id":2,"name":"пахиподиум","price":"22.99"},{"id":3,"name":"селагинелла","price":"18.99"},{"id":4,"name":"спатифиллум","price":"12.99"},{"id":5,"name":"хамедория изящная","price":"23.99"}])
    })
  
    it("/products/1 should return first product", () => {
      return request(app.getHttpServer())
        .get("/products/1")
        .expect({"id": 1, "name": "крассула","price": "15.99"})
    })
  
    it("/products/15 should return last product", () => {
      return request(app.getHttpServer())
        .get("/products/15")
        .expect({"id": 15,"name": "портулакария","price": "69.99"})
    })
  
    it("/products/search?product=крассула should return the product with name крассула", () => {
      return request(app.getHttpServer())
        .get(encodeURI("/products/search?product=крассула"))
        .expect([{"id":1,"name":"крассула","price":"15.99"}])
    })
  
    it("/products/search?product=са should return an array of products, which have the letters 'са' in their names", () => {
      return request(app.getHttpServer())
        .get(encodeURI("/products/search?product=са"))
        .expect([{"id":10,"name":"кресс салат","price":"27.99"},{"id":13,"name":"серисса","price":"78.99"},{"id":12,"name":"сакура бонсай","price":"99.99"}])
    })
  })
  
})
