import React from 'react'
import FormAltaClienteAnimal from '../components/FormAltaClienteAnimal'
import HeaderComponent from '../components/HeaderComponent'

export default function FormAltaAdmin() {
  return (
    <>
      <HeaderComponent />
      <h1>Alta Nuevo Usuario</h1>
      <FormAltaClienteAnimal />
    </>
  )
}
