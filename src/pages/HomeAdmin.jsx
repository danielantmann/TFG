import React from 'react'
import NavComponent from '../components/NavComponent'
import CardCitas from '../components/CardCitas'
import HeaderComponent from '../components/HeaderComponent'
import AdminGestion from '../components/AdminGestion'

function HomeAdmin() {
  return (
    <section style={{height: "100vh"}}>
 
    <HeaderComponent/>
    <AdminGestion/>
    <h1>Proxima Cita: </h1>
    <CardCitas/>

  
    </section>
  )
}

export default HomeAdmin