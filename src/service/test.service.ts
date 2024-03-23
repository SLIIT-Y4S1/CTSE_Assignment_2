import TestModel, { TestInput } from "../models/test.model";

export const createTestService = async (input: TestInput) => {
  return TestModel.create(input);
};

export const findTestService = async (testId: any) => {
  const testDocument = await TestModel.findById(testId);
  if (!testDocument) {
    throw new Error("Document not found");
  }
  return testDocument;
};

export const listTestService = async () => {
  return TestModel.find();
};
