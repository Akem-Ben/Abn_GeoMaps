import { Schema as MongooseSchema } from "mongoose";

const findMock = jest.fn();

const Schema = MongooseSchema;

const mongoose = {
  connect: jest.fn(() => Promise.resolve()),
  model: jest.fn(() => ({
    find: findMock,
  })),
  models: {
    Markers: {
      find: findMock,
    },
  },
  Schema,
};

export default mongoose;
