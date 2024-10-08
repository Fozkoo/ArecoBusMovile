// pages/Home.tsx
import React, { useEffect, useRef, useState } from 'react';
import { IonApp, IonContent } from '@ionic/react';
import Header from '../components/Header';
import '../theme/variables.css';
import Card2 from '../components/Card2';
import Loader from '../components/Loader';
import methods from '../service/Helper'; 
import TestPage from './TestPage';

function Home() {

  const [loading, setLoading] = useState(true);
  const ionContentRef = useRef<HTMLIonContentElement>(null);

  useEffect(() => {
    
    const timer = setTimeout(() => {
      setLoading(false);``
    }, 1000); 

    
    return () => clearTimeout(timer);
  }, []);

  return (
    <IonApp>
      <IonContent>
        {loading ? (
          <Loader /> 
        ) : (
          <>
            <div className="container-header fixed top-0 left-0 w-full bg-white z-50 shadow-sm">
              <Header />
            </div>
            <div className="container-cards pt-[65px]   flex items-center mt-5 p-7 flex-wrap ">
              <Card2 />
            </div>
          </>
        )}
      </IonContent>
    </IonApp>
  );
}

export default Home;
