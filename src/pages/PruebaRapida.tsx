import React, { useState, useEffect, useRef } from "react";
import { IonContent, IonHeader } from "@ionic/react";
import Helper from "../service/Helper";
import Header from "../components/Header";
import Up from "../components/Up";
import Banner from "../components/Banner";
import SchedulesTable from "../components/SchedulesTable";
import StartPoint from "../components/StartPoint";
import Loader from "../components/Loader";

interface MasterbusData {
    image: string;
    empresaNombre: string;
    origen: string;
    destino: string;
    horarios: string[];
    puntoPartida: string;
}

const PruebaRapida: React.FC = () => {
    const [masterbusData, setMasterbusData] = useState<MasterbusData | null>(null);
    const [showAll, setShowAll] = useState<boolean>(false);
    const ionContentRefDo = useRef<HTMLIonContentElement>(null);
    const [isActive, setIsActive] = useState<boolean>(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data1 = await Helper.masterbusInfo();
                if (Array.isArray(data1) && data1.length > 0) {
                    data1[0].horarios.sort();  // Ordena los horarios
                    setMasterbusData(data1[0]);

                    // Actualiza isActive basado en la hora actual
                    setIsActive(isActiveFunction());
                } else {
                    console.error('Unexpected data format:', data1);
                }
            } catch (err) {
                console.error('Error fetching data:', err);
            }
        };
        fetchData();
    }, []);


    function formatHoraAmPm(horario: string): string {
        const [hour, minute] = horario.split(":").map(Number);
        const ampm = hour >= 12 ? "PM" : "AM";
        const hour12 = hour % 12 || 12;
        return `${hour12}:${minute.toString().padStart(2, '0')} ${ampm}`;
    }

    function isActiveFunction() {
        const now = new Date();              // Obtiene la hora actual
        const hour = now.getHours();         // Obtiene la hora en formato 24 horas
        const minute = now.getMinutes();     // Obtiene los minutos actuales

        // Convierte la hora actual a minutos desde la medianoche
        const currentTime = hour * 60 + minute;

        // Definir el rango de tiempo en minutos
        const startTime = 6 * 60;           // 6:00 AM -> 6 * 60 = 360 minutos
        const endTime = 23 * 60 + 50;       // 23:50 PM -> 23 * 60 + 50 = 1430 minutos

        // Verifica si la hora actual está dentro del rango
        return currentTime >= startTime && currentTime <= endTime;
    }

    const iframeSrc = "https://maps.google.com/?q=Punto+de+Partida&output=embed";




    return (
        <>
            <IonHeader>
                <Header />
            </IonHeader>
            <IonContent ref={ionContentRefDo}>
                {masterbusData ? (
                    <>
                        <Banner
                            image={masterbusData.image}
                            empresaNombre={masterbusData.empresaNombre}
                            origen={masterbusData.origen}
                            destino={masterbusData.destino}
                            isActive={isActive}  // Esto determinará si el círculo es verde o rojo
                        />


                        <SchedulesTable
                            horarios={masterbusData.horarios}
                            destino={masterbusData.destino}
                            formatHoraAmPm={formatHoraAmPm}
                            showAll={showAll}
                            setShowAll={setShowAll}
                        />

                        <StartPoint
                            puntoPartida={masterbusData.puntoPartida}
                            src={iframeSrc}
                        />
                    </>
                ) : (
                    <Loader />
                )}

                <Up ionContentRef={ionContentRefDo} />

            </IonContent>
        </>
    );
};

export default PruebaRapida;
