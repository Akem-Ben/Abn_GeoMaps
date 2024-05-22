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
        const response = await axios.get(`/location/allmarkers`, {
            headers: {
                'Content-Type': 'Application/Json'
            }
        });
        return response;
    } catch (error: any) {
        return error.response;
    }
};

export const getSingleMarker = async (_id:string) => {
    try {
        const response = await axios.get(`/location/singlemarker/${_id}`, {
            headers: {
                'Content-Type': 'Application/Json'
            }
        });
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