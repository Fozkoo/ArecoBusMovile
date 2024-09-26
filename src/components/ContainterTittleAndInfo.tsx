import React from 'react';

interface ContainerTitleAndInfoProps {
  image: string;
  empresaNombre: string;
  destino: string;
}

const ContainerTitleAndInfo: React.FC<ContainerTitleAndInfoProps> = ({ image, empresaNombre, destino }) => {
  return (
    <div className="container-title-and-info bg-violet-500 overflow-hidden flex flex-col justify-center items-center w-full h-[180px] mt-10">
      <img className="w-[100%] h-[600px] brightness-50" src={image} alt="Imagen de la empresa" />
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
