import axios from '../customAxios'

export const registerNewUserAndGetToken = async (username: string, password: string) => {
     const body = {
          username,
          password
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