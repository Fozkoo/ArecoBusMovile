// components/Loader.tsx
import React from 'react';
import '../theme/variables.css';
import logoBus from '..//assets/images/ArecoBus-logo.png';
import { IonContent } from '@ionic/react';

const Loader: React.FC = () => {
  return (

    <IonContent className='!z-10'>
      <div className="flex justify-center items-center w-full h-full ">
        <div className="flex font-medium  items-center justify-center animate-pulse flex-col gap-5">
          <img src={logoBus} alt="Cargando..." className="h-[95px]" />
        </div>
      </div>
    </IonContent>
  );
};

export default Loader;
