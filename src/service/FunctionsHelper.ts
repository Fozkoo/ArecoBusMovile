import moment from 'moment';

const horaActual = moment().format("HH:mm:ss");

const diaHoy = moment().isoWeekday();

const proximoColectivo = (horarios: any[]) => {
  const horaActual = moment(); 
  const proximo = horarios.find(horario => moment(horario, 'HH:mm:ss').isAfter(horaActual));
  
  return proximo ? moment(proximo, 'HH:mm:ss').format('HH:mm') : "No hay más viajes por hoy";
};


function formatHoraAmPm(horario: string): string {
  const [hour, minute] = horario.split(":").map(Number);
  const ampm = hour >= 12 ? "PM" : "AM";
  const hour12 = hour % 12 || 12;
  return `${hour12}:${minute.toString().padStart(2, "0")} ${ampm}`;
}


const calcularDistancia = (lat1: number, lon1: number, lat2: number, lon2: number) => {
  const R = 6371; 
  const dLat = (lat2 - lat1) * (Math.PI / 180); 
  const dLon = (lon2 - lon1) * (Math.PI / 180); 
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * (Math.PI / 180)) * Math.cos(lat2 * (Math.PI / 180)) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distancia = R * c; 
  return distancia;
};



const methodsExport = {
  horaActual,
  diaHoy,
  proximoColectivo,
  formatHoraAmPm,
  calcularDistancia,
  
}

export default methodsExport;
