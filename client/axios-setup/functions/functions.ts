import axios from '../configurations/setup';

export const getCoordinates = async (location: string) => {
    try {
        const response = await axios.get(`/location/find`, {
            params: { location },
            headers: {
                'Content-Type': 'Application/Json'
            }
        });
        return response;
    } catch (error: any) {
        return error.response;
        // console.error('Error fetching coordinates:', error);
        // return error.response ? error.response.data : error.message;
    }
};

export const saveMarkers = async (body: any) => {
    try {
        const response = await axios.post(`/location/save`, body, {
            headers: {
                'Content-Type': 'Application/Json'
            }
        });
        return response;
    } catch (error: any) {
        return error.response;
    }
};

export const getAllMarkers = async () => {
    try {
        const response = await axios.get(`/location/allmarkers`);
        return response;
    } catch (error: any) {
        return error.response;
    }
};

export const getSingleMarker = async (_id:string) => {
    try {
        const response = await axios.get(`/location/singlemarker/${_id}`);
        return response;
    } catch (error: any) {
        return error.response;
    }
};

export const editMarkers = async (_id:string, body: any) => {
    try {
        const response = await axios.patch(`/location/edit/${_id}`, body, {
            headers: {
                'Content-Type': 'Application/Json'
            }
        });
        return response;
    } catch (error: any) {
        return error.response;
    }
};

export const deleteMarkers = async (_id:string) => {
    try {
        const response = await axios.delete(`/location/delete/${_id}`);
        return response;
    } catch (error: any) {
        return error.response;
    }
};