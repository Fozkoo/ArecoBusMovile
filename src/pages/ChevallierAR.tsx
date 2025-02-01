import React, { useState, useEffect, useRef } from "react";
import { IonContent } from "@ionic/react";
import Helper from "../service/Helper";
import Up from "../components/Up";
import Banner from "../components/Banner";
import SchedulesTable from "../components/SchedulesTable";
import Loader from "../components/Loader";
import MainInfo from "../components/MainInfo";
import Change from "../components/Change";
import helperExport from "../service/FunctionsHelper";
import "..//theme/variables.css"
import RecorridosParadas from "../components/RecorridosParadas";
import { useMenu } from '../context/MenuContextProps';

interface ChevallierARData {
    image: string;
    empresaNombre: string;
    origen: string;
    destino: string;
    horarios: string[];
    puntoPartida: string;
    proximoHorario?: string;
    metodo: string;
    precio: string;
}


interface ChevallierAR {
    horarios: string[];
}

const ChevallierAR: React.FC = () => {
    const [chevallierData, setChevallierData] = useState<ChevallierARData | null>(null);
    const [showAll, setShowAll] = useState<boolean>(false);
    const ionContentRefDo = useRef<HTMLIonContentElement>(null);
    const [isActive, setIsActive] = useState<boolean>(false);
    const [data, setData] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [proximo, setProximo] = useState<string | null>(null);
    const { setMenuVisible } = useMenu();

    useEffect(() => {
        const fetchData = async () => {
            try {
                let data;
                if (helperExport.diaHoy >= 1 && helperExport.diaHoy <= 7) {
                    data = await Helper.getHorariosByIdBusIdDia(7, 1);
                } 
                setData(data);
                const proximoHorario = helperExport.proximoColectivo(data[0].horarios);
                setProximo(proximoHorario);
            } catch (err) {
                setError("Error al cargar los datos.");
            }
        };


        fetchData();


        const intervalId = setInterval(() => {
            fetchData();
        }, 30000);


        return () => clearInterval(intervalId);

    }, []);


    useEffect(() => {
        const fetchData = async () => {
            try {
                const [data1] = await Promise.all([
                    Helper.busInfoById(7),
                    Helper.getHorariosByIdBusIdDia(7, 1),
                ]);

                if (data1.length > 0) {
                    data1[0].horarios.sort();
                }

                setChevallierData(data1.length > 0 ? data1[0] : null);

            } catch (err) {
                console.error('Error fetching data:', err);
                setError('Error al cargar la información');
            } finally {
                setLoading(false);
                setMenuVisible(true);
            }
        };
        fetchData();
    }, [])


    return (
        <>
            <IonContent ref={ionContentRefDo}>
                {chevallierData ? (
                    <>

                        <Banner
                            image={chevallierData.image}
                            empresaNombre={chevallierData.empresaNombre}
                            origen={chevallierData.origen}
                            destino={chevallierData.destino}
                            isActive={isActive}
                        />

                        <MainInfo
                            proximo={proximo || ""}
                            metodo={chevallierData.metodo}
                            precio={chevallierData.precio}
                        />

                        {chevallierData && (
                            <SchedulesTable
                                dias="Lunes a Domingos."
                                horarios={chevallierData.horarios}
                                destino={chevallierData.destino}
                                showAll={showAll}
                                setShowAll={setShowAll}
                            />
                        )}
           
                        <Change
                            path="/MasterbusAG"
                        />
                        <Up ionContentRef={ionContentRefDo} />
                    </>
                ) : (
                    <Loader />
                )}
            </IonContent>
        </>
    );
};

export default ChevallierAR;