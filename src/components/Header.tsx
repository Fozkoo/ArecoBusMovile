import React from 'react'


import logoHeader from '..//../public/ArecoBus-logo.png'
import { IonHeader } from '@ionic/react'

function  Header() {
  return (
    <> 
    <IonHeader className="container-header fixed bg-white shadow-lg items-center h-16 justify-center flex">
        <div className="container-items mt-[7px] justify-center items-center flex gap-3">
            <img src={logoHeader} alt="" className='h-[60px]'/>
        </div>
    </IonHeader>
    </>
  )
}

export default Header