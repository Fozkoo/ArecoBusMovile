// components/Loader.tsx
import React from 'react';
import '../theme/variables.css';
import logoBus from '../images/Logo.png';

const Loader: React.FC = () => {
  return (
    <div className="flex justify-center items-center w-full h-full bg-white">
      <div className="flex font-medium items-center justify-center animate-pulse flex-col gap-10">
        <img src={logoBus} alt="Cargando..." className="h-[45px] animate-spin-slow" />
        <p className="text-[#6464f2]">Cargando...</p>
      </div>
    </div>
  );
};

export default Loader;
