import React from 'react';
import { IonApp, IonContent } from '@ionic/react';
import Header from '../components/Header';
import '..//theme/variables.css'
import Card2 from '../components/Card2';

function Home() {
  return (
    <IonApp>
      <IonContent>
          <div className="container-header fixed top-0 left-0 w-full bg-white z-50 shadow-sm">
            <Header/>
          </div>

          <div className="container-cards pt-[65px] flex items-center  mt-5 p-7 flex-col h-full">
            <Card2/>
          </div>
      </IonContent>
    </IonApp>
  );
}

export default Home;
