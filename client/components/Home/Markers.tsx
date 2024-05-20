import React from 'react'

const Markers = () => {
  return (
    <div className='bg-gray-300 w-[70%] rounded-lg h-[200px] flex flex-col px-6 py-2 gap-2 items-start justify-center'>
        <div className='text-xl'><span className='font-semibold'>Title:</span> Mushin</div>
        <div><span className='font-semibold'>Location:</span> Mushin</div>
        <div><span className='font-semibold'>Latitude:</span> 3'567896747</div>
        <div><span className='font-semibold'>Longitude:</span> 3'567896747</div>
        <div className=' w-full flex items-center justify-center gap-3 mt-2'>
        <button className='rounded-lg border p-2 bg-green-700 text-white hover:cursor-pointer hover:bg-white hover:text-green-700'>Edit</button>
        <button className='rounded-lg border p-2 bg-red-700 text-white hover:cursor-pointer hover:bg-white hover:text-red-700'>Delete</button>
        </div>
    </div>
  )
}

export default Markers