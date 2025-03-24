import React from 'react'
import { Link } from 'react-router-dom';
function AdminMain() {
    return (
        <>
            <h1>Gestión</h1>

            <div className="container text-center ">
                <div className="row row-cols-auto justify-content-center">
                    <Link to= '/buscar'>
                    <button type="button" className="btn btn-secondary btn-lg">Buscar Fichas</button>
                    </Link>
                    <Link to='/adminalta'>
                    <button type="button" className="btn btn-secondary btn-lg">Alta Cliente</button>
                    </Link>
             
                    <Link>
                    <button type="button" className="btn btn-secondary btn-lg">Baja Cliente</button>
                    </Link>
                    <Link>
                    <button type="button" className="btn btn-secondary btn-lg">Large button</button>
                    </Link>
                </div>

            </div>
        </>
    )
}

export default AdminMain