import React from 'react'


import logoHeader from '..//../public/ArecoBus-logo.png'
import { IonHeader } from '@ionic/react'

function  Header() {
  return (
    <> 
    <IonHeader className="container-header fixed bg-white shadow-md items-center h-16 justify-center flex z-[1000]">
        <div className="container-items mt-[7px] z-10 justify-center items-center flex gap-3">
            <img src={logoHeader} alt="" className='h-[60px]'/>
        </div>
    </IonHeader>
    </>
  )
}

export default Header