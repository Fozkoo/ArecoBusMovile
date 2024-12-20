// components/Loader.tsx
import React from 'react';
import '../theme/variables.css';
import logoBus from '..//../public/ArecoBus-logo.png';

const Loader: React.FC = () => {
  return (
    <div className="flex justify-center items-center w-full h-full ">
      <div className="flex font-medium  items-center justify-center animate-pulse flex-col gap-5">
        <img src={logoBus} alt="Cargando..." className="h-[95px]"/>
      </div>
    </div>
  );
};

export default Loader;
