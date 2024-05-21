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
        console.error('Error fetching coordinates:', error);
        return error.response ? error.response.data : error.message;
    }
};