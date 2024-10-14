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



const methodsExport = {
  horaActual,
  diaHoy,
  proximoColectivo,
  formatHoraAmPm
}

export default methodsExport;
