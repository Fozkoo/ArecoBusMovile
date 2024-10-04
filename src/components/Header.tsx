import React from 'react'


import logoHeader from '..//images/Logo.png'
import { IonHeader } from '@ionic/react'

function  Header() {
  return (
    <> 
    <IonHeader className="container-header fixed bg-white shadow-md items-center h-16 justify-center flex">
        <div className="container-items justify-center items-center flex gap-3">
            <img src={logoHeader} alt="" className='h-10'/>
        </div>
    </IonHeader>
    </>
  )
}

export default Header