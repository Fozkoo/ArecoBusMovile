// src/service/scheduleHelper.ts
export function getNextSchedule(horarios: string[]): string {
    const now = new Date();
    const nowTime = now.getHours() * 60 + now.getMinutes();
  
    let nextSchedule: string | null = null;
    let nextTimeDifference = Number.MAX_VALUE;
  
    for (const horario of horarios) {
      const [hours, minutes] = horario.split(':').map(Number);
      const scheduleTime = hours * 60 + minutes;
      const timeDifference = scheduleTime - nowTime;
  
      if (timeDifference > 0 && timeDifference < nextTimeDifference) {
        nextTimeDifference = timeDifference;
        nextSchedule = horario;
      }
    }
  
    if (nextSchedule) {
      const [hours, minutes] = nextSchedule.split(':').map(Number);
      const formattedHours = hours.toString().padStart(2, '0');
      const formattedMinutes = minutes.toString().padStart(2, '0');
      return `${formattedHours}:${formattedMinutes}`;
    }
  
    return "No hay más viajes por hoy";
  }
  