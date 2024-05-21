"use client"
import { LoadScript, GoogleMap as Map } from '@react-google-maps/api'
import React from 'react'

const GoogleMap = () => {
    const containerStyle = {
        width: '100%',
        height: '70vh'
    }
  return (

    // mapContainerStyle={containerStyle}
    <div>
        <LoadScript googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_API_KEY!}>
            <Map mapContainerStyle={}>

            </Map>
        </LoadScript>
    </div>
  )
}

export default GoogleMap