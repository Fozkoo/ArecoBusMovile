import axios from "axios";

const URL = 'http://localhost:8080/api/buses';
// http://localhost:8080/api/buses  o https://api.arecobus.cfl401areco.edu.ar/api/buses

const api = axios.create({
    baseURL: URL
});



const realData = async () => {
    try {
        const response = await api.get("/getAllBusesInfo")
        return response.data;
        
    } catch (err) {
        console.log(err + " error");
        return [];
    }
}

const rutabusInfo = async () => {

    try {
        const response = await api.get("/getBusInfoById/3")
        return response.data;
    }
    catch (err) {
        console.log(err + " error");
        return [];
    }
}


const masterbusInfo = async () => {

    try {
        const response = await api.get("/getBusInfoById/4")
        return response.data;
    }
    catch (err) {
        console.log(err + " error");
        return [];
    }
}

const ricarditoDugganInfo = async () => {
    try {
        const response = await api.get("/getBusInfoById/5")
        return response.data;
    }
    catch (err) {
        console.log(err + " error");
        return [];
    }
}

const ricarditoVillaLiaInfo = async () => {
    try {
        const response = await api.get("/getBusInfoById/6")
        return response.data;
    }
    catch (err) {
        console.log(err + " error");
        return [];
    }
}




const methods = {
    realData,
    rutabusInfo,
    masterbusInfo,
    ricarditoDugganInfo,
    ricarditoVillaLiaInfo
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