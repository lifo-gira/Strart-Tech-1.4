import React from 'react'

function Detail({title, value}) {
  return (
    <div className='flex flex-col flex-none justify-center items-center space-x-2 space-y-2'>
        <p className='text-gray-400 font-light text-xs'>{title}</p>
        <h3>{value}</h3>

    </div>
  )
}

export default Detail