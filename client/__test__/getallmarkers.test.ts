import { createMocks } from 'node-mocks-http';
import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';
import { GET } from '../app/api/getallmarkers/route';
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

beforeEach(async () => {
    const mockData = [
      { markerName: 'Marker 1', longitude: 10, latitude: 20 },
      { markerName: 'Marker 2', longitude: 30, latitude: 40 },
      { markerName: 'Marker 3', longitude: 50, latitude: 60 },
    ];
  
    const Marker = mongoose.models.Markers || mongoose.model('Markers', Markers);
    await Marker.create(mockData);
  });

  test('GET /api/getallmarkers', async () => {
    const { req, res } = createMocks({
      method: 'GET',
    });
  
    await GET();
  
    expect(res._getStatusCode()).toBe(200);
  });
