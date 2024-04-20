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
