import { MongoMemoryServer } from "mongodb-memory-server";
import request from "supertest";
import mongoose from "mongoose";
import { app } from "../utils/app";

describe("Main Test Suite", () => {
  let mongoServer: MongoMemoryServer;

  /**
   * Connect to the in-memory database before executing the test suite
   */
  beforeAll(async () => {
    mongoServer = await MongoMemoryServer.create();
    await mongoose.connect(mongoServer.getUri(), { dbName: "test-product-db" });
  });

  /**
   * Drop database, close the connection and stop mongoServer after executing the test suite
   */
  afterAll(async () => {
    await mongoose.connection.dropDatabase();
    await mongoose.connection.close();
    await mongoServer.stop();
  });
  /**
   * Test the POST route to create a product
   */
  describe("POST /", () => {
    it("should create a product", async () => {
      const testProduct = {
        name: "Product 1",
        category: "Category 1",
        unitPrice: 200,
        quantity: 10,
        unitOfMeasure: "bottles",
        reorderLevel: 5,
      };

      const response = await request(app).post("/").send(testProduct);

      expect(response.statusCode).toBe(201);
      expect(response.body).toHaveProperty("status");
      expect(response.body).toHaveProperty("data");
      expect(response.body.data).toBeInstanceOf(Object);
      expect(response.body.data).toHaveProperty("_id");
      expect(response.body.data).toHaveProperty("name");
      expect(response.body.data).toHaveProperty("category");
      expect(response.body.data).toHaveProperty("unitPrice");
      expect(response.body.data).toHaveProperty("quantity");
      expect(response.body.data).toHaveProperty("unitOfMeasure");
      expect(response.body.data).toHaveProperty("reorderLevel");
      expect(response.body.status).toBe("Product created");
      expect(response.body.data.name).toEqual(testProduct.name);
      expect(response.body.data.category).toEqual(testProduct.category);
      expect(response.body.data.unitPrice).toEqual(testProduct.unitPrice);
      expect(response.body.data.quantity).toEqual(testProduct.quantity);
      expect(response.body.data.unitOfMeasure).toEqual(
        testProduct.unitOfMeasure
      );
      expect(response.body.data.reorderLevel).toEqual(testProduct.reorderLevel);
    });
  });
  /**
   * Test the GET route to return all products
   */
  describe("GET /", () => {
    it("should return all products", async () => {
      const response = await request(app).get("/");

      expect(response.statusCode).toBe(200);
      expect(response.body).toHaveProperty("status");
      expect(response.body).toHaveProperty("data");
      expect(response.body.status).toBe("Products found");
      expect(response.body.data).toBeInstanceOf(Array);
    });
  });
});
