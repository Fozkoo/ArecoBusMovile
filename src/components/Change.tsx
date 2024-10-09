import React, { useRef } from 'react';
import { arrowUp } from 'ionicons/icons';
import { IonIcon } from '@ionic/react';
import { Link } from 'react-router-dom';



const Change = () => {

    return (
        <>
            <Link
                to="#"
                className="globo fixed top-[90%] left-[75%] w-[45px] h-[45px] bg-blue-500 rounded-full cursor-pointer flex justify-center items-center"
            >
                <IonIcon icon={arrowUp} className="w-[30px] h-[30px] text-white" />
            </Link>
        </>
    );

};



export default Change;
