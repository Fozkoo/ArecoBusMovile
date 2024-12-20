import L from "leaflet";
import LogoSube from '../images/pin_punto_sube.svg';
import logo from '..//..//public/posibleIconoEnAzul (1).svg';

const Markers = [

     {
        geocode: [-34.25834726980355, -59.47936598436395],
     },
     {
        geocode: [-34.255680, -59.466153],
     },
     {
        geocode: [-34.246493193558955, -59.47333860012311],
     },
     {
        geocode: [-34.256982748664235, -59.4769451341818],
     },
     {
        geocode: [-34.24691250783543, -59.47713954602023],
     },
     {
        geocode: [-34.2519971722742, -59.46895284142659],
     }

]


const customIcon = new L.Icon({
    iconUrl: LogoSube,
    iconSize: [50, 50],
    iconAnchor: [25, 16]
  });


  const IconBusStop = new L.Icon({
      iconUrl: logo,
      iconSize: [20, 20],
      iconAnchor: [25, 16]
  });


export { Markers, customIcon, IconBusStop };



// -34.2519971722742, -59.46895284142659