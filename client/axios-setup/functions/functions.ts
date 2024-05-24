import axios from '../configurations/setup';

export const getCoordinates = async (location: string) => {
    try {
        const response = await axios.get(`/api/findlocation`, {
            params: { location },
        }
        );
        return response;
    } catch (error: any) {
        return error.response;
        // console.error('Error fetching coordinates:', error);
        // return error.response ? error.response.data : error.message;
    }
};

export const saveMarkers = async (body: any) => {
    try {
        const response = await axios.post(`/api/savemarkers`, body);
        return response;
    } catch (error: any) {
        return error.response;
    }
};

export const getAllMarkers = async () => {
    try {
        const response = await axios.get(`/api/getallmarkers`);
        return response;
    } catch (error: any) {
        return error.response;
    }
};

export const getSingleMarker = async (_id:string) => {
    try {
        const response = await axios.get(`/api/getsinglemarker/${_id}`);
        return response;
    } catch (error: any) {
        return error.response;
    }
};

export const editMarkers = async (_id:string, body: any) => {
    try {
        const response = await axios.put(`/api/edit-marker-title/${_id}`, body);
        return response;
    } catch (error: any) {
        return error.response;
    }
};

export const deleteMarkers = async (_id:string) => {
    try {
        const response = await axios.delete(`/api/deletemarker/${_id}`);
        return response;
    } catch (error: any) {
        return error.response;
    }
};