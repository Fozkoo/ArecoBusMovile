import React from 'react';
import { arrowUp } from 'ionicons/icons';
import { IonIcon } from '@ionic/react';
import "..//theme/variables.css"


interface UpProps {
  ionContentRef: React.RefObject<HTMLIonContentElement>;
}

const Up: React.FC<UpProps> = ({ ionContentRef }) => {
  const scrollToTop = () => {
    if (ionContentRef.current) {
      ionContentRef.current.scrollToTop(0); 
    }
  };

  return (
    <button
    className="globo up fixed top-[90%] left-[75%] !z-50  w-[45px] h-[45px] bg-blue-500 rounded-full cursor-pointer flex justify-center items-center"
    onClick={scrollToTop}
>
    <IonIcon icon={arrowUp} className="w-[30px] h-[30px] text-white" />
    </button>
  );
};

export default Up;
  