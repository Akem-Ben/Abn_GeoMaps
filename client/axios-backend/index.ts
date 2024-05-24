import axios, { AxiosResponse } from 'axios';


export const makeApiGetRequests = async (httpMethod: string, resourceUrl: string): Promise<any> => {
const response: AxiosResponse<any> = await axios({
    method: httpMethod,
    url: resourceUrl,
  })
return response.data
}