import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import Helper from '../service/Helper';
import { IonContent } from '@ionic/react';

function PageTesting() {
    const [data, setData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await Helper.rutabusInfoHorariosLunes();
                setData(response);
            } catch (error) {
                console.log(error);
            }
        };
        fetchData();
    }, []);

    return (
        <>
            <Header />
            {/* 
            <IonContent>
                <div className="container-page flex flex-col m-[3%]">
                    <div className=" mt-[80px] bg-cover bg-center h-[177px] rounded-xl shadow-lg relative" style={{ backgroundImage: "url('http://www.rutabus.com.ar/images/hero-bg.jpeg')" }}>
                        <div className="absolute inset-0 rounded-xl bg-gray-700 bg-opacity-60 flex flex-col justify-center items-center p-4">
                            <h1 className="text-white text-4xl font-bold mb-2">Rutabus</h1>
                            <nav className="text-white">
                                <ul className="flex space-x-2 text-sm">
                                    <p className='font-semibold'>Areco &gt; Pilar</p>
                                </ul>
                            </nav>
                        </div>
                    </div>

                    <section className="horarios flex justify-center items-center flex-col  mt-6">
                        <div className="container-title items-center justify-center text-center flex flex-wrap shadow-lg  bg-[#6464f2] rounded-lg p-2">
                            <h2 className="font-bold  text-white text-xl tracking-wide ">
                                ¡Conoce los horarios disponibles!
                            </h2>
                        </div>

                        <div className="container-lun-vier mt-3   bg-white justify-center items-center   rounded-xl  text-black text-center flex flex-col ">
                            <h2 className="mt-2 w-[70%]  text-2xl  rounded-lg text-black font-semibold py-2">
                                Lunes a Viernes
                            </h2>

                            <div className="container-buttons shadow-lg  rounded-xl pt-5  mt-0  flex flex-wrap justify-center items-center ">
                                {data.length > 0 && data[0].horarios.map((horario, index) => (
                                    <button
                                        key={index}
                                        className="bg-[#6464f2] m-2 text-white font-semibold py-2 px-6 rounded-lg shadow-md transition-transform transform hover:scale-105  focus:outline-none focus:ring-2 "
                                    >
                                        {horario.slice(0, 5)}
                                    </button>
                                ))}
                            </div>
                        </div>
                        <div className="container-lun-vier mt-3   bg-white justify-center items-center    rounded-xl  text-black text-center flex flex-col ">
                            <h2 className="mt-2 w-[70%]  text-2xl   rounded-lg text-black font-semibold py-2">
                                Sabados, Domingos y Feriados
                            </h2>

                            <div className="container-buttons shadow-lg  rounded-xl pt-5  mt-0  flex flex-wrap justify-center items-center ">
                                {data.length > 0 && data[0].horarios.map((horario, index) => (
                                    <button
                                        key={index}
                                        className="bg-[#6464f2] m-2 text-white font-semibold py-2 px-6 rounded-lg shadow-md transition-transform transform hover:scale-105  focus:outline-none focus:ring-2 "
                                    >
                                        {horario.slice(0, 5)}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </section>



                </div>
            </IonContent>

            */}
        </>
    );
}

export default PageTesting;
