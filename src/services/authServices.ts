import { AxiosResponse } from 'axios';
import axios from '../customAxios'

interface Fe { token: string | null, faceDetecting: boolean, faceRecognition: boolean }

export async function registerNewUserAndGetToken(username: string, password: string, imgBase64: string) {
     const body = {
          username,
          password,
          userLogImage: imgBase64
     }
     try {
          console.log(body);
          const res: AxiosResponse<Fe> = await axios.post('/sign', body);
          return res.data;

     } catch (error) {
          console.log(`Registering new user. Error ${error.response?.data}`);
     }
}

interface F { username: string | null, token: string | null, faceDetecting: boolean | null }

export function verifyUserCorrectByFacialRecognitionService(
     imageSrc: string,
     callbackSucefully?: (arg0: F) => void, callbackError?: (error: Error) => void
): void {
     const obj = {
          base64image: imageSrc
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