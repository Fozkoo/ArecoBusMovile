import React from "react";

interface MainInfoProps {
    proximo: string;
    metodo: string;
    precio: string;
}

const MainInfo: React.FC<MainInfoProps> = ({ proximo, metodo, precio }) => {
    return (
        <div className="container-info-horarios  p-8 pb-[1px]">
            <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
                <div className="p-4 pb-[3px] flex bg-blue-600 text-white">
                    <h2 className="text-3xl  font-bold mb-2">Información principal</h2>
                </div>


                <div className="p-0 ">



                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead>
                                <tr className="bg-gray-50 text-xs font-semibold text-gray-600 uppercase">
                                    <th className="px-6 py-3 text-center">Próximo</th>
                                    <th className="px-6 py-3 text-center">Precio</th>
                                    <th className="px-6 py-3 text-center">Método</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                <tr className="hover:bg-gray-50 transition-colors duration-200 ease-in-out">
                                    <td className="px-6 py-4 text-center whitespace-nowrap">
                                        <span>{proximo}</span>
                                    </td>
                                    <td className="px-6 py-4 text-center whitespace-nowrap">
                                        <span>${precio}</span>
                                    </td>
                                    <td className="px-6 py-4 text-center whitespace-nowrap">
                                        <span>{metodo}</span>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>


                </div>
            </div>
        </div>
    );
};

export default MainInfo;