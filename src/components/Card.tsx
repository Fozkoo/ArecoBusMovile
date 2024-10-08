import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import helper from '../service/Helper';




interface Bus {
    id: number;
    path: string;
    image: string;
    origen: string;
    empresaNombre: string;
    destino: string;
    precio: number;
    horarios: string[]; 
}

function getNextSchedule(horarios: string[]): string | null {
    const now = new Date();
    const nowTime = now.getHours() * 60 + now.getMinutes(); // Tiempo actual en minutos

    let nextSchedule: string | null = null;
    let nextTimeDifference = Number.MAX_VALUE;

    for (const horario of horarios) {
        const [hours, minutes] = horario.split(':').map(Number);
        const scheduleTime = hours * 60 + minutes; // Horario en minutos desde medianoche
        const timeDifference = scheduleTime - nowTime;

        if (timeDifference > 0 && timeDifference < nextTimeDifference) {
            nextTimeDifference = timeDifference;
            nextSchedule = horario;
        }
    }

    return nextSchedule;
}





function Card() {
    const [data, setData] = useState<Bus[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await helper.realData();
                setData(data);
            } catch (err) {
                console.log(err + " error");
            } finally {
                setLoading(false);
            }
        };

        fetchData();

        // Set interval to refresh data every minute (60000 ms)
        const intervalId = setInterval(() => {
            fetchData();
        }, 60000);

        // Clear interval on component unmount
        return () => clearInterval(intervalId);
    }, []);

    return (
        <>
            {loading ? (
                <div className="loader text-black">
                    <p>loading....</p>
                </div>
            ) : (
                data.map((bus) => {
                    const nextSchedule = getNextSchedule(bus.horarios);
                    return (
                        <Link key={bus.id} to={bus.path} className='
                        bg-transparent
                        w-[70%] 
                        h-[185px]
                        flex
                        justify-between
                        items-center
                        rounded-[5px]
                        border-2
                        shadow-md
                        transition duration-500 transform hover:scale-105
                        max-lg:w-[100%]
                        max-[300px]:hidden
                        '>
                            <div className="container-card
                                w-[100%] 
                                h-[185px]
                                flex
                                justify-between
                                items-center
                                p-4
                                rounded-[5px]
                                max-lg:w-[100%]
                                max-lg:h-full
                                max-lg:p-1
                            ">
                                <div className="container-img
                                    flex                    
                                    justify-center
                                    items-center
                                    overflow-hidden
                                    w-[37%]
                                    h-full
                                    max-lg:w-[40%]
                                    max-lg:mr-3
                                ">
                                    <span className="relative inline-block">
                                        <img src={bus.image} className="object-cover w-28 h-28 rounded-full" alt="Bus" />
                                    </span>
                                </div>
                                <div className="container-info
                                    flex
                                    p-0  
                                    flex-col
                                    w-[60%]
                                    h-full
                                    border-l-2
                                    border-x-gray-800
                                    max-lg:w-[65%]
                                ">
                                    <div className="container-title
                                        flex
                                        justify-center
                                        flex-col
                                        h-[50%]
                                        rounded-[5px]
                                        pl-5
                                    ">  
                                        <div className="title">
                                            <p className='font-semibold'>{bus.empresaNombre}</p>
                                        </div>
                                        <div className="destino flex gap-1">
                                            <p className='text-gray-600'>Destino:</p>
                                            <p className='font-semibold'>{bus.destino}</p>
                                        </div>
                                        <div className="flex justify-center flex-col items-center text-center left-[90%] max-lg:left-[80%] absolute container-ver-mas">
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="black" className="w-6 h-6">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                                            </svg>
                                            <p className='text-sm text-gray-600 font-semibold'>Ver más</p>
                                        </div>
                                    </div>
                                    <div className="container-extra-info
                                        flex
                                        p-2
                                        h-[50%]
                                    ">
                                        <div className="container-next-travel flex flex-col items-center justify-center  w-[50%]
                                        max-sm:w-[60%]
                                        border-r-2
                                        border-x-gray-800
                                        ">
                                            <p className='text-gray-600'>Próxima salida</p>
                                            <p className='font-semibold max-lg:text-sm text-center'>{nextSchedule || "No hay más salidas hoy"}</p>
                                        </div>
                                        <div className="container-price flex flex-col items-center justify-center  w-[50%]
                                        max-sm:w-[40%]
                                        ">
                                            <p className='text-gray-600'>Precio</p>
                                            <p className='font-semibold text-black'>${bus.precio}</p>
                                        </div>
                                    </div>
                                </div>   
                            </div>
                        </Link>
                    );
                })
            )}
        </>
    );
}



export default Card;



