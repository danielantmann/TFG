import React from 'react';
import HeaderComponent from '../components/HeaderComponent';
import CardCitas from '../components/CardCitas';
import ProximasCitas from '../components/ProximasCitas';

function HomeUser() {
    return (<>
        <HeaderComponent/>
        <h1>Proxima Cita: </h1>
        <CardCitas/>
    </>);
}

export default HomeUser;