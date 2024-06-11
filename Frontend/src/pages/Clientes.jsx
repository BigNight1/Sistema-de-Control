import React from 'react'
import Sliderbar from '../components/Welcome/Sliderbar'
import ViewClientes from '../components/Clientes/ViewClientes'

const Clientes = () => {
  return (
    <div className="clientes flex h-screen">
        <Sliderbar/>
        <div className='flex-grow p-4'>
            <ViewClientes/>
        </div>
    </div>
  )
}

export default Clientes