import React, { useRef } from 'react';
import { arrowUp } from 'ionicons/icons';
import { IonIcon } from '@ionic/react';


interface UpProps {
  ionContentRef: React.RefObject<HTMLIonContentElement>;
}

const Up: React.FC<UpProps> = ({ ionContentRef }) => {
  const scrollToTop = () => {
    if (ionContentRef.current) {
      ionContentRef.current.scrollToTop(300); 
    }
  };

  return (
    <button
    className="globo fixed top-[90%] left-[75%] w-[45px] h-[45px] bg-[rgb(100,100,242)] rounded-full cursor-pointer flex justify-center items-center"
    onClick={scrollToTop}
>
    <IonIcon icon={arrowUp} className="w-[30px] h-[30px] text-white" />
    </button>
  );
};

export default Up;
