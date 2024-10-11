import axios from 'axios';

interface Coordinate {
  latitude: number;
  longitude: number;
}

interface Route {
  id: number;
  name: string;
  description: string;
  coordinates: Coordinate[];
}

export const fetchRoutes = async (): Promise<Route[]> => {
  try {
    const response = await axios.get<Route[]>('/Cordenadas.json');
    return response.data;
  } catch (error) {
    console.error("Error fetching routes:", error);
    throw error;
  }
};
