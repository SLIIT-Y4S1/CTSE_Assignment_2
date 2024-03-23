import mongoose from "mongoose";
import { customAlphabet } from "nanoid";
const nanoid = customAlphabet("0123456789", 10);

export interface TestInput {
  name: string;
}

export interface TestDocument extends TestInput, mongoose.Document {
  testId: string;
  createdAt: Date;
  updatedAt: Date;
}

const testSchema = new mongoose.Schema(
  {
    testId: {
      type: String,
      required: true,
      unique: true,
      default: () => `T-${nanoid()}`,
    },
    name: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

const TestModel = mongoose.model<TestDocument>("Test", testSchema);

export default TestModel;
