import { object, string, TypeOf } from "zod";

const payload = {
  body: object({
    name: string({
      required_error: "Name is required",
    }),
  }),
};

export const createTestSchema = object({
  ...payload,
});

export const getTestSchema = object({
  params: object({
    testId: string({
      required_error: "testId is required",
    }),
  }),
});

export const getTestListSchema = object({});

export type CreateTestInput = TypeOf<typeof createTestSchema>;

export type GetTestInput = TypeOf<typeof getTestSchema>;

export type GetTestListInput = TypeOf<typeof getTestListSchema>;
