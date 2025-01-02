import { IonContent } from "@ionic/react";
import { ArrowLeft } from 'lucide-react';
import { Search } from 'lucide-react';
import { History } from 'lucide-react';
import { Link, useHistory } from "react-router-dom";

const SearchLocality: React.FC = () => {

    const history = useHistory();

    const handlePlaceSelect = (latitude: number, longitude: number) => {
        history.push('/PuntosSube', { state: { latitude, longitude } });
    };


    const places = [
        {
            id: 1,
            name: 'San Antonio de Areco',
            province: 'Buenos Aires',
            country: 'Argentina',
            latitude: -34.2456,
            longitude: -59.4716,
        },
        {
            id: 2,
            name: 'San Andes de Giles',
            province: 'Buenos Aires',
            country: 'Argentina',
            latitude: -34.4492,
            longitude: -59.4473,
        },
        {
            id: 3,
            name: 'Pilar',
            province: 'Buenos Aires',
            country: 'Argentina',
            latitude: -34.4588,
            longitude: -58.9148,
        },
    ];


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
                            {places.map((place) => (
                                <div
                                    key={place.id}
                                    className="flex items-center justify-between p-4 rounded-lg shadow-sm cursor-pointer"
                                    onClick={() => handlePlaceSelect(place.latitude, place.longitude)}
                                >
                                    <div className="flex flex-col gap-2">
                                        <h3 className="text-lg font-medium">{place.name}</h3>
                                        {place.province && (
                                            <p className="text-sm text-gray-500">{place.province}, {place.country}</p>
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
