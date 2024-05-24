import {Schema} from 'mongoose';

const findMock = jest.fn();

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
  Schema: jest.fn(),
};

export default mongoose;
