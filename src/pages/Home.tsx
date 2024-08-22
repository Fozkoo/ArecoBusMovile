import React from 'react';
import '@fontsource-variable/onest';
import '..//theme/variables.css';
import Card2 from '../components/Card2';
import Header from '../components/Header';
import { IonContent } from '@ionic/react';

function Home() {
  return (
    <>
      <IonContent>
        <div className="fixed top-0 left-0 w-full bg-white z-50 shadow-sm"> {/* Encabezado fijo */}
          <Header />
        </div>
        <div className="pt-[65px] flex items-center mt-5 p-5 flex-col h-full"> {/* Espacio superior para no solapar el contenido */}
          <Card2 />
        </div>
      </IonContent>
    </>
  );
}

export default Home;
