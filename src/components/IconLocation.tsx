import L from 'leaflet';

export const IconLocation = new L.Icon({
    iconUrl: require('../images/Logo.png').default, 
    iconRetinaUrl: require('../images/Logo.png').default,
    iconSize: [60, 75],
    className: 'leaflet-venue-icon'
});


