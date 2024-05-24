import { createMocks } from 'node-mocks-http';
import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';
import { POST } from '../app/api/savemarkers/route';
import Markers from '../models/markerModel';
import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '../database/database';

let mongoServer: MongoMemoryServer;

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  await connectDB();
  mongoose.connection.once('connected', async () => {
    const collections = await mongoose.connection.db.collections();
    for (let collection of collections) {
      await collection.deleteMany({});
    }
  });
});
afterAll(async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
});

test('POST /api/savemarkers', async () => {
  const mockData = {
    markerName: 'Marker 3',
    longitude: 50,
    latitude: 60
  };

  const { req, res } = createMocks({
    method: 'POST',
    body: mockData
  });

  req.json = async () => mockData;

  await POST(req as unknown as NextRequest);
    expect(res._getStatusCode()).toBe(200);
});
