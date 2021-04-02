export const setTokenLocalStorage = async (token?: string) => {
     if (token) {
          localStorage.setItem('token', token);
     } else {
          const tokenLS = localStorage.getItem('token') ;
          return tokenLS;
     }
}