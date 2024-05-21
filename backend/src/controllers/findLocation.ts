import {Request, Response} from 'express';
import { makeApiGetRequests } from '../axios';


export const findLocation = async (request: Request, response: Response) => {
    try{
        const address = request.query.location;

        if(!address || address === ''){
            return response.status(400).json({message: 'Address is required'})
        }
        
        const url = `${process.env.API_URL}/search?q=${address}&api_key=${process.env.API_KEY}`

        const addressFinder = await makeApiGetRequests('GET', url)

        if(addressFinder.length === 0){
          return response.status(404).json({
            status: `error`,
            message: `Address not found, you can tweak the spellings and try again`
          })
        }

        return response.status(200).json({status: 'Success', data: addressFinder.data})

    }catch (error:any) {
        if (error.response) {
          console.log(error.response.data);
          return response.status(500).json({status: 'Error', message: "Internal Server Error"})
        } else if (error.request) {
          console.log(error.request);
          return response.status(400).json({status: 'Request error', message: error.request})
        } else {
          console.log("Error", error.message);
          return response.status(500).json({status: 'Error', message: error.request})
        }
      }
}