import React from 'react';
import { MapPin, Clock3 } from 'lucide-react';


interface StoreCardProps {
  nombre: string;
  descripcion: string;
  distance: string;
  horario?: string;
  urlimagen: string;
  urllogo?: string;
}

export default function CardPuntoSube({
  nombre,
  descripcion,
  distance,
  horario,
  urlimagen,
  urllogo
}: StoreCardProps) {
  return (
    <div className="relative bg-white rounded-xl overflow-hidden shadow-md max-w-sm">
      {/* Discount Badge */}
      {horario && (
        <div className="absolute top-4 left-4 bg-black text-yellow-400 px-3 py-1 rounded-full text-sm font-semibold z-10 flex items-center gap-1">
          <Clock3 size={14} />
          <span>08:00 / 21:00</span>
        </div>
      )}
      
      {/* Main Image */}
      <div className="relative h-48 w-full">
        <img
          src={urlimagen}
          alt={nombre}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
      </div>
      
      {/* Content */}
      <div className="p-4">
        <div className="flex items-start gap-3">
          {/* Logo */}
          {urllogo && (
            <div className="w-12 h-12 rounded-lg overflow-hidden flex-shrink-0">
              <img src={urllogo} alt={`${nombre} logo`} className="w-full h-full object-cover" />
            </div>
          )}
          
          <div className="flex-1">
            <h3 className="font-semibold text-lg text-gray-900">{nombre}</h3>
            <div className="flex items-center gap-2 mt-1">
              <span className="text-orange-500 text-sm">{descripcion}</span>
              <div className="flex items-center text-gray-600 text-sm">
                <MapPin size={14} className="mr-1" />
                <span>{distance}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
 