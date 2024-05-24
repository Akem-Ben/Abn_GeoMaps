import { makeApiGetRequests } from '../../../axios-backend';
import { NextResponse, NextRequest } from 'next/server';

export const GET = async (request: NextRequest ) => {
    try{
        const address = request.nextUrl.searchParams.get('location');

        if(!address || address === ''){
            return NextResponse.json({message: 'Address is required'}, {status: 400})
        }
        
        const url = `${process.env.API_URL}/search?q=${address}&api_key=${process.env.API_KEY}`

        const addressFinder = await makeApiGetRequests('GET', url)
        
        if(addressFinder.length === 0){
          return NextResponse.json({
            message: `Address not found, you can tweak the spellings and try again`
          }, {status: 404})
        }

        return NextResponse.json({ message: `Location found Successfully`, data: addressFinder}, {status: 200})

    }catch (error:any) {
        if (error.response) {
          console.log('err1', error.response.data);
          return NextResponse.json({message: "Internal Server Error"}, {status: 500,})
        } else if (error.request) {
          console.log('err2',error.request);
          return NextResponse.json({ message: error.request }, {status: 400,})
        } else {
          console.log("Error", error.message);
          return NextResponse.json({message: error.request}, {status: 500,})
        }
      }
}