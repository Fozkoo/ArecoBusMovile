import React, { useEffect, useState } from "react";
import { useMap } from "react-leaflet";

interface StartPointProps {
    puntoPartida: string;
    src: string;
}



const StartPoint: React.FC<StartPointProps> = ({ puntoPartida, src }) => {
    const [showMap, setShowMap] = useState(false); // Estado para controlar la visibilidad completa del mapa


    const UpdateMapSize: React.FC = () => {
        const map = useMap();
        useEffect(() => {
            map.invalidateSize();
        }, [showMap, map]);

        return null;
    };

    return (
        <div className="container-punto-partida bg-gray-100 p-8">
            <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
                <div className="p-6 bg-blue-600 text-white">
                    <h1 className="text-3xl font-bold mb-2">Punto de partida</h1>
                    <p className="text-white font-medium">{puntoPartida}</p>
                </div>
                <div className="p-3 text-center">
                    <div className={`transition-all duration-500 overflow-hidden ${showMap ? 'h-[350px]' : 'h-[150px]'}`}>
                        <iframe src={src} width="100%" height="100%"></iframe>
                    </div>
                    <button
                        onClick={() => setShowMap(!showMap)}
                        className="bg-blue-500 text-white px-4 py-2 mt-4 rounded-lg"
                    >
                        {showMap ? 'Mostrar menos' : 'Ver mapa completo'}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default StartPoint;
