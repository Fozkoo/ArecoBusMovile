// components/Loader.tsx
import React from 'react';
import '../theme/variables.css';
import logoBus from '..//../public/ArecoBus-logo.png';

const Loader: React.FC = () => {
  return (
    <div className="flex justify-center items-center w-full h-full bg-white">
      <div className="flex font-medium items-center justify-center animate-pulse flex-col gap-10">
        <img src={logoBus} alt="Cargando..." className="h-[75px] animate-spin-slow" />
        <p className="text-[#3B82F6]">Cargando...</p>
      </div>
    </div>
  );
};

export default Loader;
