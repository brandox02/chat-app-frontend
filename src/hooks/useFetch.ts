import React, { useEffect, useState } from 'react';
import clienteAxios, { AxiosError } from '../customAxios';


// this hook is unutilize
function useFetch<T>(url: string, dataStart: T, params?: any,
     callbackCorrect?: (data: T) => void, callbackError?: (error: AxiosError) => void) {

     const [isFetching, setIsFetching] = useState(true);
     const [data, setData] = useState<T>(dataStart);
     const retorno: [boolean, T, typeof reload] = [isFetching, data, reload];

     useEffect(() => {
          clienteAxios.get(url, { params })
               .then(res => {
                    setData(res.data)
                    setIsFetching(false)
                    callbackCorrect && callbackCorrect(res.data)
                    
               })
               .catch((error: AxiosError) => {
                    setIsFetching(false)
                    callbackError && callbackError(error)
               })
     }, [isFetching]);

     function reload() {
          setIsFetching(true)
     }

     return retorno;
}

export default useFetch;