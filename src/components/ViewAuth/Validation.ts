import { userExistsFetch } from "../../crudMongoDB/user";

export const validateUserSign = async (username: string) => {
     let res = { messageError: '', bootstrapStyleInput: 'is-valid' };

     if (!validateSpaceBlack(username)) {
          res.messageError = 'El usuario no puede tener espacios en blanco';
          res.bootstrapStyleInput = 'is-invalid';
     } else if (username.trim().length <= 5) {
          res.messageError = 'La usuario debe tener mas de 5 caracteres';
          res.bootstrapStyleInput = 'is-invalid';
     } else if (!has2numbers(username.trim())) {
          res.messageError = 'La usuario debe tener por lo menos 2 numeros';
          res.bootstrapStyleInput = 'is-invalid';
     }
     const userExists: boolean = await userExistsFetch(username) as boolean;
     if (userExists) {
          res.bootstrapStyleInput = 'is-invalid';
          res.messageError = 'Este nombre de  usuario ya existe';
     }
     return res;
}

export const validatePassSign = (cadena: string) => {
     const res = { messageError: '', bootstrapStyleInput: 'is-valid' }
     if (!validateSpaceBlack(cadena)) {
          res.messageError = 'La contrasena no puede tener espacios en blanco';
          res.bootstrapStyleInput = 'is-invalid';
     }
     else if (cadena.length <= 5) {
          res.messageError = 'La contrasena debe tener mas de 5 caracteres';
          res.bootstrapStyleInput = 'is-invalid';
     } else if (!has2numbers(cadena)) {
          res.messageError = 'La contrasena debe tener por lo menos 2 numeros';
          res.bootstrapStyleInput = 'is-invalid';
     }
     return res;
}

const has2numbers = (cadena: string) => {
     let countNumbers = 0;
     for (const letter of cadena) if (isNumber(Number(letter))) countNumbers++;
     return countNumbers >= 2 ? true : false;
}

const validateSpaceBlack = (cadena: string) => {
     for (const letter of cadena) {
          if (letter === ' ') return false;
     }
     return true
}


function isNumber(n: any) { return Number(n) === n }