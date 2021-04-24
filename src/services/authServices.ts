import { AxiosResponse } from 'axios';
import axios from '../customAxios'

export const registerNewUserAndGetToken = async (username: string, password: string, imgBase64: string) => {
     const body = {
          username,
          password,
          userLogImage: imgBase64
     }
     try {
          console.log(body);
          const res = await axios.post('/sign', body);
          return res.data;
     } catch (error) {

          console.log(`Registering new user. Error ${error.response?.data}`);
          return null;
     }
}

interface F {username: string, token: string}

export function verifyUserCorrectByFacialRecognitionService(imageSrc: string,
     callbackSucefully?: (arg0: F) => void, callbackError?: (error: Error) => void
): void {
     const obj = {
          resource: {
               base64image: imageSrc
          }
     }

     axios.post('/log', obj)
          .then((res: AxiosResponse<F>) => {
               callbackSucefully && callbackSucefully(res.data);
          }).catch(error => {
               callbackError && callbackError(error);
               console.log(error);
          });
}



export const verifyUserCorrect = async (username: string, password: string) => {
     const body = {
          user: {
               username,
               password
          }
     }
     try {
          const res = await axios.post('/log', body);
          return res.data;
     } catch (error) {
          console.log(`Verifing user correct. Error ${error.response?.data}`);
          return { token: null };
     }
}

export const verifyValidToken = async (token: string) => {
     const body = { token }
     try {
          const res = await axios.post('log', body);
          return res.data.tokenValid;

     } catch (error) {
          console.log(`Verifing valid token. Error ${error.response?.data}`);
          return null;
     }
}