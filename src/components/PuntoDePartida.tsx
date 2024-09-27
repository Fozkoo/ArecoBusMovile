import React from 'react';

interface PuntoPartidaProps {
  puntoPartida: string;
}


const PuntoPartida: React.FC<PuntoPartidaProps> = ({ puntoPartida }) => {  // aca me falta agregar la prop del url
  return (
    <div className="container-punto-de-partida flex justify-center h-[700px]">
      <div className="title-punto-partida flex flex-col w-[100%] p-11">
        <div className="container-title-punto-partida flex flex-col justify-center items-center">
          <h2 className="font-semibold text-2xl">PUNTO DE PARTIDA</h2>
          <h2 className="font-semibold text-xl text-gray-600"></h2>
        </div>
        <div className="container-iframe flex justify-center mt-5 h-[100%] rounded-xl overflow-hidden">
          <iframe
            src="https://www.google.com/maps/embed?pb=!4v1725291140712!6m8!1m7!1sVep0fKFlLubfdTr_li-IMQ!2m2!1d-34.24556233752934!2d-59.46422813436158!3f91.3146240670629!4f-12.334637154740648!5f0.7820865974627469"
            width="100%"
            height="100%"
            style={{ border: '0' }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </div>
    </div>
  );
};

export default PuntoPartida;