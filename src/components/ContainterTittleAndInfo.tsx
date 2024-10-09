import React from 'react';

interface ContainerTitleAndInfoProps {
  image: string;
  empresaNombre: string;
  origen: string;
  destino: string;
}

const ContainerTitleAndInfo: React.FC<ContainerTitleAndInfoProps> = ({ image, empresaNombre, destino, origen }) => {
  return (
    <div className=" mt-[60px] bg-cover bg-center h-[177px]  shadow-xl relative" style={{ backgroundImage: `url(${image})` }} >
      <div className="absolute inset-0 rounded-xl bg-gray-700 bg-opacity-60 flex flex-col justify-center items-center p-4">
        <h1 className="text-white text-4xl font-bold mb-2">{empresaNombre}</h1>
        <nav className="text-white">
          <ul className="flex space-x-2 text-sm">
            <p className='font-semibold text-base'>{origen} &gt; {destino}</p>
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default ContainerTitleAndInfo;
