import React from 'react';

interface ContainerTitleAndInfoProps {
  image: string;
  empresaNombre: string;
  destino: string;
}

const ContainerTitleAndInfo: React.FC<ContainerTitleAndInfoProps> = ({ image, empresaNombre, destino }) => {
  return (
    <div className="container-title-and-info mt-[60px] bg-violet-500 overflow-hidden flex flex-col justify-center items-center w-full h-[180px] max-xl:h-[190px] max-xl:mt-[65px]">
      <img className="w-[100%] brightness-50  max-xl:h-[280px]" src={image} alt="Imagen de la empresa" />

  
      <section className="absolute">
        <div className="container-title flex justify-center w-full">
          <h1 className="font-bold text-6xl max-lg:text-4xl text-white">{empresaNombre}</h1>
        </div>
        <div className="destination w-full flex justify-center">
          <p className="font-semibold text-2xl max-lg:text-xl text-white">Areco - {destino}</p>
        </div>
      </section>
    </div>
  );
};

export default ContainerTitleAndInfo;
