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

function isActiveFunction() {
  const now = new Date(); // Obtiene la hora actual
  const hour = now.getHours(); // Obtiene la hora en formato 24 horas
  const minute = now.getMinutes(); // Obtiene los minutos actuales

  // Convierte la hora actual a minutos desde la medianoche
  const currentTime = hour * 60 + minute;

  // Definir el rango de tiempo en minutos
  const startTime = 6 * 60; // 6:00 AM -> 6 * 60 = 360 minutos
  const endTime = 23 * 60 + 50; // 23:50 PM -> 23 * 60 + 50 = 1430 minutos

  // Verifica si la hora actual está dentro del rango
  return currentTime >= startTime && currentTime <= endTime;
}



const methodsExport = {
  horaActual,
  diaHoy,
  proximoColectivo,
  formatHoraAmPm,
  calcularDistancia,
  isActiveFunction,
}

export default methodsExport;
