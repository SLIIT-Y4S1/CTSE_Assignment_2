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
  describe("POST /api/v1", () => {
    it("should create a product", async () => {
      const testProduct = {
        name: "Product 1",
        category: "Category 1",
        unitPrice: 200,
        quantity: 10,
        unitOfMeasure: "bottles",
        reorderLevel: 5,
      };

      const response = await request(app).post("/api/v1").send(testProduct);

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
  describe("GET /api/v1", () => {
    it("should return all products", async () => {
      const response = await request(app).get("/api/v1");

      expect(response.statusCode).toBe(200);
      expect(response.body).toHaveProperty("status");
      expect(response.body).toHaveProperty("data");
      expect(response.body.status).toBe("Products found");
      expect(response.body.data).toBeInstanceOf(Array);
    });
  });

  /**
   * Test the DELETE route to delete a specific product
   */
  describe("DELETE /api/v1/:id", () => {
    it("should delete a product", async () => {
      const response1 = await request(app).get("/api/v1");
      const response2 = await request(app).delete(
        `/api/v1/${response1.body.data[0]._id}`
      );

      expect(response2.statusCode).toBe(204);
      expect(response2.body).toEqual({});
    });

    it("should not delete a product", async () => {
      const characters: string = "abcdefghijklmnopqrstuvwxyz0123456789";
      let invalidTestId: string = "";

      for (let i = 0; i < 24; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        invalidTestId += characters[randomIndex];
      }

      const response = await request(app).delete(`/api/v1/${invalidTestId}`);

      expect(response.statusCode).toBe(400);
      expect(response.body).toHaveProperty("status");
      expect(response.body).toHaveProperty("error");
      expect(response.body.status).toBe("Product not deleted");
    });
  });
});
