import React from 'react'

const Container = ({children}) => {
  return (
    <div className='px-[16px] max-w-[1500px] mx-auto md:px-[50px] lg:px-[100px] xl:px-[190px]'>
      {children}
    
    </div>
  )
}

export default Container