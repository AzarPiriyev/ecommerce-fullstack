import React from 'react'
import Filter from '../common/filter'
import Container from '../common/container'
import Products from '../common/products'

const New = () => {
  return (
    <Container>
    <div className='md:flex'>
    <Filter/>
    <Products/>
    </div>
    </Container>
  )
}

export default New