import L from "leaflet";
import LogoSube from '../images/pin_punto_sube.svg';

const Markers = [

    {
        geocode: [-34.245703, -59.472414],
    },
    {
        geocode: [-34.245890, -59.473668],
    },
     {
        geocode: [-34.254199, -59.480504],
     },
     {
        geocode: [-34.255680, -59.466153],
     }

]


const customIcon = new L.Icon({
    iconUrl: LogoSube,
    iconSize: [50, 50],
    iconAnchor: [25, 16]
  });


export { Markers, customIcon };


