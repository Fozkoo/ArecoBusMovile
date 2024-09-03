// components/Loader.tsx
import React from 'react';
import '../theme/variables.css';
import logoBus from '../images/Logo.png';

const LoaderCard: React.FC = () => {
  return (
    <div className="flex justify-center items-center w-full h-full bg-white">
      <div className="flex font-medium items-center justify-center animate-pulse flex-col gap-10">
        <img src={logoBus} alt="Cargando..." className="h-[40px] animate-spin-slow" />
      </div>
    </div>
  );
};

export default LoaderCard;
