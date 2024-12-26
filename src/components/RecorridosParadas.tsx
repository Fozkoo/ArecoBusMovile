import React from "react";
import MapView from "..//components/MapView"
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import { LatLngTuple } from "leaflet";



const RecorridosParadas: React.FC = () => {
    return (
        <>
            <div className="container-table-horarios p-8">
                <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
                    <div className="p-6 bg-blue-600 text-white">
                        <h1 className="text-3xl font-bold mb-2">Recorrido y paradas</h1>
                        <p className="text-white font-medium">Lunes a Viernes</p>
                    </div>

                    <div className="container-map py-2 px-2 rounded-2xl flex w-full shadow-2xl overflow-hidden">
                        <MapContainer 
                            center={[-34.243774, -59.473800] as LatLngTuple}
                            zoom={14}
                            scrollWheelZoom={false}
                            style={{ borderRadius: '10px' }}
                            >
                            
                            <TileLayer
                                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                            />
                            <Marker position={[-34.243774, -59.473800] as LatLngTuple}>
                                <Popup>
                                    <p>Parada 1</p>
                                </Popup>
                            </Marker>

                        </MapContainer>


                    </div>



                </div>
            </div>
        </>
    );
}

export default RecorridosParadas;