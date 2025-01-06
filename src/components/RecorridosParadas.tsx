import React, { useEffect, useState } from "react";
import { MapContainer, Polyline, TileLayer } from "react-leaflet";
import { LatLngExpression, LatLngTuple } from "leaflet";
import methods from "../service/Helper";
import logo from '..//..//public/posibleIconoEnAzul (1).svg';
import L from "leaflet";

let coordenadasExternas: LatLngExpression[][] = [];



const RecorridosParadas: React.FC = () => {
    const [coordenadas, setCoordenadas] = useState<LatLngExpression[]>([]);

    const IconBusStop = new L.Icon({
        iconUrl: logo,
        iconSize: [20, 20],
        iconAnchor: [25, 16]
    });


    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await methods.getCordenadasById("1");
                setCoordenadas(data);
                coordenadasExternas = data.coordenadas;
            } catch (err) {
                console.error("Error fetching data:", err);
            }
        };
        fetchData();
    }, []);

    return (
        <>
            <div className="container-table-horarios p-8 ">
                <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
                    <div className="p-6 bg-blue-600 text-white">
                        <h1 className="text-3xl font-bold mb-2">Recorrido y paradas</h1>
                        <p className="text-white font-medium">Lunes a Viernes</p>
                    </div>

                    <div className="container-map  py-2 px-2 rounded-2xl flex w-full shadow-2xl overflow-hidden">
                        <MapContainer
                            center={[-34.243774, -59.473800] as LatLngTuple}
                            zoom={14}
                            scrollWheelZoom={false}
                            style={{ borderRadius: '10px', zIndex: 20 }}
                        >
                            <TileLayer
                                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                            />
                            <Polyline positions={coordenadasExternas} />
                        </MapContainer>
                    </div>
                </div>
            </div>
        </>
    );
};

export default RecorridosParadas;
