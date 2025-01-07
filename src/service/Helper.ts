import axios from "axios";

const URL = 'https://api.arecobus.cfl401areco.edu.ar/api/buses';//https://api.arecobus.cfl401areco.edu.ar
const URLHORARIOS = 'https://api.arecobus.cfl401areco.edu.ar/api/horario'
// http://localhost:8080/api/buses  o https://api.arecobus.cfl401areco.edu.ar/api/buses


const urlPrueba = "https://api.arecobus.cfl401areco.edu.ar/api/recorrido"

const dataPuntoSube = "https://api.arecobus.cfl401areco.edu.ar/api/puntosSube"

const coordenadas = "https://api.arecobus.cfl401areco.edu.ar/api/coordenadas"


const localidades = "https://api.arecobus.cfl401areco.edu.ar/api/localidad"


const createLocalidades = axios.create({
    baseURL: localidades
})

const createCoordenadass = axios.create({
    baseURL: coordenadas
})

const puntoSube = axios.create({
    baseURL: dataPuntoSube
})

const test = axios.create({
    baseURL: urlPrueba
})

const api = axios.create({
    baseURL: URL
});

const apiHorarios = axios.create({
    baseURL: URLHORARIOS
});

// queda
const getAllLocalidades = async () => {
    try {
        const response = await createLocalidades.get("/getAllLocalidades");
        return response.data;
    } catch (err) {
        console.log(err + " error");
        return [];
    }
}

//queda
const getAllPuntosSube = async () => {
    try {
        const response = await puntoSube.get("/getAllPuntosSube");
        return response.data;
    } catch (err) {
        console.log(err + " error");
        return [];
    }
}

//queda
const createCoordenadas = async (coordenadas:any) => {
    try {
        const response = await createCoordenadass.post("/createCoordenadas", coordenadas);
        return response.data;
    } catch (err) {
        console.log(err + " error");
    }
}

//queda
const getCordenadasById = async (idcoordenada:any) => {
    try {
        const response = await test.get("/getRecorridoById/"+idcoordenada);
        return response.data;
    } catch (err) {
        console.log(err + " error");
        return [];
    }
}


//queda se usa en cada page rutabusAP, etc
const getBusInfoConIdDia=async(iddia:any)=>{
    try{
        const response = await api.get("/getBusInfoConIdDia/"+iddia);
        return response.data;
    }
    catch (err) {
        console.log(err + " error");
        return [];
    }
}


// quedaaa se usa en el home 
const infoBusesById = async (idDia:any) => {
    try {
        const response = await api.get("/getBusInfoConIdDia/" + idDia);
        return response.data;
    }
    catch (err){
        console.log(err + " error");
        return [];
    }
}

// a chequear
const getAllDataBuses = async () => {
    try {
        const response = await api.get("/getAllBusesInfo")
        return response.data;
        
    } catch (err) {
        console.log(err + " error");
        return [];
    }
}

//queda
const busInfoById = async (idBus:any) => {

    try {
        const response = await api.get("/getBusInfoById/" + idBus);
        return response.data;
    }
    catch (err) {
        return [];
    }
}


const getHorariosByIdBusIdDia = async (idBus:any, idDia:any) => {
    try {
        const response = await apiHorarios.get("/bus/" + idBus + "/" + idDia);
        return response.data;
    } catch (err) {
        return [];
    }
}




const methods = {
    getAllDataBuses,
    busInfoById,
    infoBusesById,
    getHorariosByIdBusIdDia,
    getBusInfoConIdDia,
    getCordenadasById,
    getAllPuntosSube,
    createCoordenadas,
    getAllLocalidades,
    api
}

export default methods;










/*

const getBuses = async () => {
    try {
        const response = await api.get("/getAllBuses");
        return response.data; 
    } catch (err) {
        console.log(err + " error");
        return [];
    }
}

const getHorariosRutabus = async () => {
    try {
        const response = await api.get("3/schedules/1");
        return response.data; 
    } catch (err) {
        console.log(err + " error");
        return [];
    }
}

const getHorariosMasterbus = async () => {
    try {
        const response = await api.get("4/schedules/1");
        return response.data; 
    } catch (err) {
        console.log(err + " error");
        return [];
    }
}



*/