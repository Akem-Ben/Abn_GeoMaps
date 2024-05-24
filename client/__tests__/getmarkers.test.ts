import { GET } from "@/app/api/getallmarkers/route";
import mongoose from "@/__mocks__/mongoose";

jest.mock("@/database/database"); // Mock the database connection
jest.mock("mongoose"); // Mock mongoose

const mockFind = jest.fn();

describe("GET /api/getallmarkers", () => {
    beforeAll(() => {
        // Mock the Markers model
        const mockMarkers = [
            { 
                _id: "1", markerName: "Marker1", 
            markerDisplayName: "Display1", 
            longitude: 10, 
            latitude: 20, 
            updatedAt: new Date('2023-01-01') 
        },
            { 
                _id: "2", markerName: "Marker2", 
            markerDisplayName: "Display2", 
            longitude: 30, 
            latitude: 40, 
            updatedAt: new Date('2023-02-01') 
        },
        ];
        mockFind.mockResolvedValue(mockMarkers);
        mongoose.model.mockReturnValue({ find: mockFind });
        mongoose.models.Markers = { find: mockFind };
    });

    it("should return all markers sorted by updatedAt in descending order", async () => {
        const response = await GET();

        const responseData = await response.json();

        const expectedMarkers = [
            { 
                _id: "2", 
            markerName: "Marker2", 
            markerDisplayName: "Display2", 
            longitude: 30, 
            latitude: 40, 
            updatedAt: new Date('2023-02-01') 
        },
            { 
                _id: "1", 
            markerName: "Marker1", 
            markerDisplayName: "Display1", 
            longitude: 10, 
            latitude: 20, 
            updatedAt: new Date('2023-01-01') 
        },
        ];

        expect(responseData.status).toBe("success");
        expect(responseData.message).toBe("All Markers fetched successfully");
        expect(responseData.finalMarkers).toEqual(expectedMarkers);
    });

    it("should handle errors correctly", async () => {
        mockFind.mockRejectedValueOnce(new Error("Database error"));

        const response = await GET();
        const responseData = await response.json();

        expect(response.status).toBe(500);
        expect(responseData.message).toBe("Internal Server Error");
    });
});
