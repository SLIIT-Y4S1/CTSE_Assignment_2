import { date } from "zod";
import supertest from "supertest";
import { MongoMemoryServer } from "mongodb-memory-server";

import createServer from "../utils/server";

import mongoose from "mongoose";

import { TestInput } from "../models/test.model";

const app = createServer();

const testId = new mongoose.Types.ObjectId().toString();

const sitePayload = {
  _id: testId,
  name: "Test name",
};
describe("test", () => {
  beforeAll(async () => {
    const mongoServer = await MongoMemoryServer.create();
    await mongoose.connect(mongoServer.getUri());
  });

  afterAll(async () => {
    await mongoose.disconnect();
    await mongoose.connection.close();
  });

  describe("create test route", () => {
    describe("given the required payload", () => {
      it("should return a 201", async () => {
        const { statusCode } = await supertest(app)
          .post("/api/v1/test")
          .send(sitePayload);

        expect(statusCode).toBe(201);
      });
    });
    // negative test case
    describe("given the required payload is missing", () => {
      it("should return a 400", async () => {
        const { statusCode } = await supertest(app).post("/api/v1/test");
        expect(statusCode).toBe(400);
      });
    });
  });

  describe("get test route", () => {
    describe("given the required testId", () => {
      it("should return a 200", async () => {
        const { statusCode } = await supertest(app).get(
          `/api/v1/test/${testId}`
        );
        expect(statusCode).toBe(200);
      });
    });

    // negative test case
    describe("given the required testId is invalid", () => {
      it("should return a 400", async () => {
        const { statusCode, body } = await supertest(app).get(
          `/api/v1/test/${new mongoose.Types.ObjectId().toString()}`
        );
        expect(statusCode).toBe(400);
      });
    });
  });

  describe("get test list route", () => {
    describe("given the test entries are alreadycreated ", () => {
      it("should return a 200", async () => {
        const { statusCode } = await supertest(app).get("/api/v1/test");
        expect(statusCode).toBe(200);
      });
    });
  });
});
