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

interface MasterbusData {
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


interface MasterbusDataLunesSabados {
    horarios: string[];
}

const MasterbusGA: React.FC = () => {
    const [masterbusData, setMasterbusData] = useState<MasterbusData | null>(null);
    const [showAll, setShowAll] = useState<boolean>(false);
    const ionContentRefDo = useRef<HTMLIonContentElement>(null);
    const [isActive, setIsActive] = useState<boolean>(false);
    const [data, setData] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [proximo, setProximo] = useState<string | null>(null);
    const [masterbusDataDomingo, setMasterbusDataDomingo] = useState<MasterbusData | null>(null);

    const [masterbusDataLunesSabados, setMasterbusDataLunesSabados] = useState<MasterbusData | null>(null);

    const { setMenuVisible } = useMenu();

    useEffect(() => {
        const fetchData = async () => {
            try {
                let data;
                if (helperExport.diaHoy >= 1 && helperExport.diaHoy <= 6) {
                    data = await Helper.getHorariosByIdBusIdDia(10, 1);
                } else if (helperExport.diaHoy === 7) {
                    data = await Helper.getHorariosByIdBusIdDia(10, 7);
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
                const [data1, data2, data3] = await Promise.all([
                    Helper.busInfoById(10),
                    Helper.getHorariosByIdBusIdDia(10, 1),
                    Helper.getHorariosByIdBusIdDia(10, 7)
                ]);

                if (data3.length > 0) {
                    data3[0].horarios.sort();
                }

                setMasterbusData(data1.length > 0 ? data1[0] : null);
                setMasterbusDataLunesSabados(data2.length > 0 ? data2[0] : null);
                setMasterbusDataDomingo(data3.length > 0 ? data3[0] : null);

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
                {masterbusData ? (
                    <>

                        <Banner
                            image={masterbusData.image}
                            empresaNombre={masterbusData.empresaNombre}
                            origen={masterbusData.origen}
                            destino={masterbusData.destino}
                            isActive={isActive}
                        />

                        <MainInfo
                            proximo={proximo || ""}
                            metodo={masterbusData.metodo}
                            precio={masterbusData.precio}
                        />

                        {masterbusDataLunesSabados && (
                            <SchedulesTable
                                dias="Lunes a Sábados."
                                horarios={masterbusDataLunesSabados.horarios}
                                destino={masterbusData.destino}
                                showAll={showAll}
                                setShowAll={setShowAll}
                            />
                        )}

                        {masterbusDataDomingo && (
                            <SchedulesTable
                                dias="Domingos y feriados."
                                horarios={masterbusDataDomingo.horarios}
                                destino={masterbusData.destino}
                                showAll={showAll}
                                setShowAll={setShowAll}
                            />
                        )}


                        <RecorridosParadas recorridoId="2" center={[-34.244991, -59.472629]} />

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

export default MasterbusGA;