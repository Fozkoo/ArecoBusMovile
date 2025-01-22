import React from "react";

interface BannerProps {
    image: string;
    empresaNombre: string;
    origen: string
    destino: string
}

const Banner: React.FC<BannerProps> = ({ image, empresaNombre, origen, destino }) => {
    return (
        <>
            <div className="container-card-principal flex flex-col mx-8 mt-5 rounded-lg shadow-xl overflow-hidden lg:max-w-4xl lg:mx-auto">
                <div className="h-[110px] relative">
                    <img src={image} className="absolute inset-0 w-full h-full object-cover " alt="Background" />
                    <div className="absolute inset-0 bg-gray-700 bg-opacity-70 "></div>
                </div>
                <div className="flex justify-center -mt-[70px]  relative">
                    <img
                        className="w-24 h-24 rounded-full   object-cover transform ease-in-out"
                        src={image}
                        alt="Profile"
                    />
                </div>
                <div className="text-center px-6 py-2 pb-[23px]">
                    <h2 className="text-2xl font-bold text-gray-900">{empresaNombre}</h2>
                    <p className="text-gray-600 font-normal text-base">{origen} / {destino}</p>
                </div>
            </div>
        </>
    )
}

export default Banner;