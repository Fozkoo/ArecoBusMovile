import { IonContent } from "@ionic/react";
import { ArrowLeft, Search, History } from 'lucide-react';
import { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import methods from "../service/Helper";

const SearchLocality: React.FC = () => {
    const [data, setData] = useState<Localidad[]>([]);
    const [searchTerm, setSearchTerm] = useState<string>("");
    const history = useHistory();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await methods.getAllLocalidades();
                setData(response);
            } catch (err) {
                console.error(err);
            }
        };
        fetchData();
    }, []);

    interface Localidad {
        idlocalidad: number;
        nombre: string;
        provincia?: string;
        latitud: string;
        longitud: string;
    }



    const handlePlaceSelect = (latitud: string, longitud: string) => {
        history.push('/PuntosSube', { state: { latitud, longitud } });
    };

    const filteredData = data.filter((item) =>
        item.nombre.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <>
            <IonContent class="flex justify-center items-center flex-col bg-white">
                <div className="flex items-center justify-between px-4 py-7">
                    <div className="flex items-center w-full">
                        <Link to="/PuntosSube">
                            <button className="p-1">
                                <ArrowLeft className="w-6 h-6" />
                            </button>
                        </Link>
                        <div className="relative flex items-center w-full bg-gray-100 rounded-xl px-6 py-2">
                            <Search className="w-5 h-5 text-gray-400 mr-2" />
                            <input
                                type="text"
                                placeholder="Buscar por localidad"
                                className="w-full bg-transparent outline-none text-gray-600 placeholder-gray-400"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>
                    </div>
                </div>

                <div className="flex flex-col py-5 px-4">
                    <div className="space-y-4">
                        <div className="flex items-center space-x-3">
                            <History className="w-5 h-5 text-gray-400" />
                            <h2 className="text-xl font-semibold ">Posibles búsquedas</h2>
                        </div>

                        <div className="mt-4">
                            {filteredData.map((item) => (
                                <div
                                    key={item.idlocalidad}
                                    className="flex items-center justify-between p-4 rounded-lg shadow-sm cursor-pointer"
                                    onClick={() => handlePlaceSelect(item.latitud, item.longitud)}
                                >
                                    <div className="flex flex-col gap-2">
                                        <h3 className="text-lg font-medium">{item.nombre}</h3>
                                        {item.provincia && (
                                            <p className="text-sm text-gray-500">{item.provincia}</p>
                                        )}
                                    </div>
                                </div>
                                
                            ))}
                        </div>
                    </div>
                </div>
            </IonContent>
        </>
    );
};

export default SearchLocality;
