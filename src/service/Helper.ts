import axios from "axios";

const URL = 'http://localhost:8080/api/buses';

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



const methods = {
    realData,
    rutabusInfo
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