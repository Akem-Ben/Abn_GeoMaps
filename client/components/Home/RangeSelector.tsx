import React from 'react'

const RangeSelector = () => {
  return (
    <div>
        <h2 className='font-bold px-2'>Select Range (in Metres)</h2>
        <input type='range' className='w-full h-2 rounded-lg cursor-pointer bg-gray-200 appearance-none'/>
    </div>
  )
}

export default RangeSelector