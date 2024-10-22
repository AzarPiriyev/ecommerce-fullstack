import React from 'react'
import Basket from '../../components/cart/basket'
import Total from '../../components/cart/total'
import Container from '../../components/common/container'

const CartPage = () => {
  return (
    <>
    <Container>
    <div className='lg:flex lg:justify-between'>
    <Basket/>
    <Total/>
    </div>
    </Container>
    </>
  )
}

export default CartPage