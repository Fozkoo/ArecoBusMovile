import L from "leaflet";
import LogoSube from '../images/pin_punto_sube.svg';

const Markers = [

     {
        geocode: [-34.25834726980355, -59.47936598436395],
     },
     {
        geocode: [-34.255680, -59.466153],
     },
     {
        geocode: [-34.246493193558955, -59.47333860012311],
     }

]


const customIcon = new L.Icon({
    iconUrl: LogoSube,
    iconSize: [50, 50],
    iconAnchor: [25, 16]
  });


export { Markers, customIcon };



// -34.25834726980355, -59.47936598436395