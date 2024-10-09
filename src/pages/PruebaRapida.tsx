import React, { useState, useEffect } from "react";
import { FaBus, FaClock } from "react-icons/fa";
import { IonContent, IonHeader } from "@ionic/react";
import Helper from "../service/Helper";
import ContainerTitleAndInfo from "../components/ContainterTittleAndInfo";
import Header from "../components/Header";

interface MasterbusData {
    image: string;
    empresaNombre: string;
    destino: string;
    origen: string;
    horarios: string[];
    puntoPartida: string;
}

const PruebaRapida: React.FC = () => {
    const [masterbusData, setMasterbusData] = useState<MasterbusData | null>(null);
    const [masterbusDataDomingo, setMasterbusDataDomingo] = useState<MasterbusData | null>(null);
    const [showAll, setShowAll] = useState<boolean>(false); // Control to show all schedules

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [data1, data3] = await Promise.all([
                    Helper.masterbusInfo(),
                    Helper.masterbusInfoDomingo(),
                ]);

                if (data3.length > 0) {
                    data3[0].horarios.sort();
                }

                setMasterbusData(data1.length > 0 ? data1[0] : null);
                setMasterbusDataDomingo(data3.length > 0 ? data3[0] : null);
            } catch (err) {
                console.error('Error fetching data:', err);
            }
        };
        fetchData();
    }, []);

    const formatHoraAmPm = (horario: string): string => {
        const [hour, minute] = horario.split(":").map(Number);
        const ampm = hour >= 12 ? "PM" : "AM";
        const hour12 = hour % 12 || 12; // Convierte 0 a 12 para la medianoche
        return `${hour12}:${minute.toString().padStart(2, '0')} ${ampm}`;
    };


    return (
        <>
            <IonHeader>
                <Header />
            </IonHeader>
            <IonContent>


                <div className="max-w-xs mx-auto mt-24 bg-white rounded-lg shadow-lg overflow-hidden">
                    {/* Header con el fondo degradado */}
                    <div className="h-20 bg-gradient-to-r from-blue-400 via-red-200 to-blue-100"></div>

                    {/* Imagen circular en el centro */}
                    <div className="flex justify-center -mt-12">
                        <img
                            className="w-24 h-24 rounded-full border-4 border-white object-cover"
                            src={masterbusData?.image} // Reemplaza esta URL con la imagen deseada
                            alt="Profile"
                        />
                    </div>

                    {/* Información del usuario */}
                    <div className="text-center px-6 py-4">
                        <h2 className="text-lg font-bold text-gray-900">{masterbusData?.empresaNombre}</h2>
                        <p className="text-gray-600">{masterbusData?.origen} / {masterbusData?.destino}</p>
                    </div>
                </div>














                <div className="min-h-screen bg-gray-100 p-8">
                    <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
                        <div className="p-6 bg-blue-600 text-white">
                            <h1 className="text-3xl font-bold mb-2">Horarios Disponibles</h1>
                            <p className="text-white font-medium">Lunes a Viernes</p>
                        </div>

                        <div className="p-6">
                            <div className="overflow-x-auto">
                                <table className="w-full">
                                    <thead>
                                        <tr className="bg-gray-50 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                            <th className="px-6 py-3">Destino</th>
                                            <th className="px-6 py-3">Horario</th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-200">
                                        {masterbusData ? (
                                            masterbusData.horarios.slice(0, showAll ? masterbusData.horarios.length : 5).map((horario, index) => (
                                                <tr key={index} className="hover:bg-gray-50 transition-colors duration-200 ease-in-out">
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        <div className="flex items-center">
                                                            <FaBus className="text-blue-500 mr-2" />
                                                            <span>{masterbusData.destino}</span>
                                                        </div>
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        <div className="flex items-center">
                                                            <FaClock className="text-green-500 mr-2" />
                                                            <span>{formatHoraAmPm(horario)}</span>
                                                        </div>
                                                    </td>
                                                </tr>
                                            ))
                                        ) : (
                                            <tr>
                                                <td colSpan={2} className="text-center py-4 text-gray-500">
                                                    No existen horarios disponibles.
                                                </td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>

                            {masterbusData && masterbusData.horarios.length > 5 && (
                                <div className="text-center mt-4">
                                    <button
                                        onClick={() => setShowAll(!showAll)}
                                        className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
                                    >
                                        {showAll ? "Ver menos" : "Ver más"}
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="max-w-4xl mt-5 mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
                        <div className="p-6 bg-blue-600 text-white">
                            <h1 className="text-3xl font-bold mb-2">Horarios Disponibles</h1>
                            <p className="text-white font-medium">Sabados, Domingos y Feriados</p>
                        </div>

                        <div className="p-6">
                            <div className="overflow-x-auto">
                                <table className="w-full">
                                    <thead>
                                        <tr className="bg-gray-50 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                            <th className="px-6 py-3">Destino</th>
                                            <th className="px-6 py-3">Horario</th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-200">
                                        {masterbusDataDomingo ? (
                                            masterbusDataDomingo.horarios.slice(0, showAll ? masterbusDataDomingo.horarios.length : 5).map((horario, index) => (
                                                <tr key={index} className="hover:bg-gray-50 transition-colors duration-200 ease-in-out">
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        <div className="flex items-center">
                                                            <FaBus className="text-blue-500 mr-2" />
                                                            <span>{masterbusDataDomingo.destino}</span>
                                                        </div>
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        <div className="flex items-center">
                                                            <FaClock className="text-green-500 mr-2" />
                                                            <span>{formatHoraAmPm(horario)}</span>
                                                        </div>
                                                    </td>
                                                </tr>
                                            ))
                                        ) : (
                                            <tr>
                                                <td colSpan={2} className="text-center py-4 text-gray-500">
                                                    No existen horarios disponibles.
                                                </td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>

                            {masterbusDataDomingo && masterbusDataDomingo.horarios.length > 5 && (
                                <div className="text-center mt-4">
                                    <button
                                        onClick={() => setShowAll(!showAll)}
                                        className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
                                    >
                                        {showAll ? "Ver menos" : "Ver más"}
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </IonContent>
        </>
    );
};

export default PruebaRapida;
