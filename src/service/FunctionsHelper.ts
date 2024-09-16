import moment from "moment";


const horaActual = moment().format("HH:mm:ss");

const diaHoy = moment().isoWeekday();

const proximoColectivo = (horarios: any[]) => {
  let proximo=horarios.find(horario => moment(horario, 'HH:mm:ss').isAfter(moment(horaActual, 'HH:mm:ss')));
  if (proximo) {
    
    const proximoHorario = moment(proximo, 'HH:mm:ss').format('HH:mm');
    return proximoHorario
  } else {
    return "No hay más viajes por hoy";
  }
  

};


const methodsExport = {
  horaActual,
  diaHoy,
  proximoColectivo
}

export default methodsExport;
