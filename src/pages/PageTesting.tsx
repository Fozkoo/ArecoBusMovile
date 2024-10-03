import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import rutabusData from '../service/Helper';

interface Horarios {
    id: number;
    horarios: string[];
}

function PageTesting() {
    const [data, setData] = useState([])

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await rutabusData.realData();
                console.log(response.data);
                
                setData(response.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchData();
    }, []);

    return (
        <>
            <Header />

            <div className="bg-red-500 mt-[80px] m-[3%] bg-cover bg-center h-[177px] rounded-xl shadow-lg relative" style={{ backgroundImage: "url('http://www.rutabus.com.ar/images/hero-bg.jpeg')" }}>
                <div className="absolute inset-0 rounded-xl bg-gray-700 bg-opacity-60 flex flex-col justify-center items-center p-4">
                    <h1 className="text-white text-4xl font-bold mb-2">Rutabus</h1>
                    <nav className="text-white">
                        <ul className="flex space-x-2 text-sm">
                            <p className='font-semibold'>Areco &gt; Pilar</p>
                        </ul>
                    </nav>
                </div>
            </div>

            <div className="horarios flex flex-col m-[10%] justify-center rounded-xl bg-white border border-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 h-[500px] focus:ring-gray-500 p-4 shadow-md">

            </div>
        </>
    );
}

export default PageTesting;
