import React from "react";
import { FaBus, FaClock } from "react-icons/fa";

interface SchedulesProps {
    horarios: string[];
    destino: string;
    formatHoraAmPm: (horario: string) => string;
    showAll: boolean;
    setShowAll: React.Dispatch<React.SetStateAction<boolean>>;
}

const SchedulesTable: React.FC<SchedulesProps> = ({ horarios, destino, formatHoraAmPm, showAll, setShowAll }) => {
    return (
        <div className="container-table-horarios p-8">
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
                                {horarios.length > 0 ? (
                                    horarios.slice(0, showAll ? horarios.length : 5).map((horario, index) => (
                                        <tr key={index} className="hover:bg-gray-50 transition-colors duration-200 ease-in-out">
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="flex items-center">
                                                    <FaBus className="text-blue-500 mr-2" />
                                                    <span>{destino}</span>
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
                    {horarios.length > 5 && (
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
    );
};

export default SchedulesTable;