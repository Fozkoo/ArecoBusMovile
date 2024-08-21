import React, { useEffect } from 'react'
import '@fontsource-variable/onest';
import '..//theme/variables.css';
import { useState } from 'react';
import helper from '../service/Helper.js';
import Card from '../components/Card';
import Header from '../components/Header';
import Menu from '../components/Menu';
import logoHeader from '..//images/rutabus.jpg'
import { IonContent } from '@ionic/react';
import Card2 from '../components/Card2';


function Home() {



  return (
    <>
      <IonContent>
      <Header/>
      <div className="container-content-home flex items-center p-3 flex-col h-full">
        <Card2/> 
      </div>
      </IonContent>

      
    </>
  )
}

export default Home