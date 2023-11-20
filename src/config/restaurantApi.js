import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import Constants from "expo-constants";


const urlApi = Constants.expoConfig.extra.urlApi;

export const restaurantApiUrl = axios.create({
    baseURL: urlApi,
    timeout: 120000,
    headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin':  '*',
    }
});

restaurantApiUrl.interceptors.request.use(

    async(config) => {
        const token = await AsyncStorage.getItem('x-access-token')?.token;
        if(token){
            config.headers['x-access-token'] = token;
        }

        return config;
    }
)

