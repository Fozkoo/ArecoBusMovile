import React from "react";

interface StartPointProps {
    src: string;
}

const Tour: React.FC<StartPointProps> = ({ src }) => {
    return (
        <div className="container-punto-partida bg-gray-100 p-8">
            <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
                <div className="p-6 bg-blue-600 text-white">
                    <h2 className="text-3xl font-bold mb-2">Recorrido</h2>
                </div>
                <div className="p-2 h-[450px]">
                    <iframe
                        className='rounded-lg'
                        src={src}
                        width="100%"
                        height="100%"
                        style={{ border: '0' }}
                        allowFullScreen
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                    ></iframe>
                </div>
            </div>
        </div>
    );
};

export default Tour;
