import moment from 'moment';


const horaActual = moment().format("HH:mm:ss");

const diaHoy = moment().isoWeekday();

const proximoColectivo = (horarios: any[]) => {
  const horaActual = moment(); // Obtener la hora actual en cada llamada
  const proximo = horarios.find(horario => moment(horario, 'HH:mm:ss').isAfter(horaActual));
  
  return proximo ? moment(proximo, 'HH:mm:ss').format('HH:mm') : "No hay más viajes por hoy";
};



const methodsExport = {
  horaActual,
  diaHoy,
  proximoColectivo
}

export default methodsExport;
