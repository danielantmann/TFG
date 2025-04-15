import React from 'react'
import IconComponent from './IconComponent'
import NavComponent from './NavComponent'
import './HeaderComponent.css'
function HeaderComponent() {
    return (
        <header >
            <div className='logoComp'>
                <IconComponent></IconComponent>
            </div>
            
            <NavComponent></NavComponent>
        </header>
    )
}

export default HeaderComponent