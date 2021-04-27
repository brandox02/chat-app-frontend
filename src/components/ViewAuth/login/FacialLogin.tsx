import React, { useEffect, useRef, useState } from 'react';
import Webcam from 'react-webcam';
import axiosClient from '../../../customAxios';
import backImage from '../../../images/back.png';
import { verifyUserCorrectByFacialRecognitionService } from '../../../services/authServices';

interface Props {
     switchFacialReconitionAndLoginWithCredentialsViews: () => void,
     runLoadApp: (token: string) => void
}

function FacialLogin({ switchFacialReconitionAndLoginWithCredentialsViews, runLoadApp }: Props) {
     const webcamRef = React.useRef(null);
     const [Loading, setLoading] = useState(false);

     async function capture() {
          setLoading(true);
          const imageSrc = (webcamRef.current as any).getScreenshot();
          verifyUserCorrectByFacialRecognitionService(imageSrc,
               async (data) => {
                    setLoading(false);
                    const { username, token, faceDetecting } = data;
                    if (!faceDetecting) {
                         alert('No se ha dectectado ninguna cara, intentalo de nuevo');
                    }else if(!username){
                         alert('No hay una cuenta que tenga tu cara anexada');
                    }else if (username && token) {
                         console.log(data);
                         await runLoadApp(token);   
                    } 
               },
               (error => setLoading(false))
          );
     }
     return (
          <div className='d-flex justify-content-center align-items-center w-100 vh-100' style={{ backgroundColor: '#F6F6F6', position: 'relative' }}>
               {/* LOADER */}
               {Loading && (
                    <div
                         className="d-flex justify-content-center align-items-center  text-success "
                         style={{ transform: 'scale(2)', margin: 'auto', position: 'absolute', left: 'calc(50% - 30px)', zIndex: 1 }}
                    >
                         <div className="spinner-border ms-auto " role="status" aria-hidden="true"></div>
                         <strong className='ml-3' style={{}}>Loading...</strong>
                    </div>
               )}
               <div className="card border p-4" style={{ width: 600, filter: Loading ? `blur(5px)` : '' }}>
                    <img
                         style={{ position: 'absolute', left: 0 }}
                         className='ml-4 hover' src={backImage}
                         alt="back-image"
                         onClick={switchFacialReconitionAndLoginWithCredentialsViews}
                    />
                    <h2 className='mb-4 text-center'>Inicio de Sesion</h2>
                    {/* {Loading && <h1>Loading...</h1>} */}

                    <Webcam
                         audio={false}
                         ref={webcamRef}
                         screenshotFormat="image/jpeg"
                         className='w-100 mb-3'
                    />

                    <p>Debe mirar a la camara y no hacer expresiones extranas, porfavor tener los menos elementos posibles y tambien que solo se vea su cara de preferencia</p>
                    <button onClick={capture} className='btn btn-primary'>Iniciar Sesion</button>
               </div>
          </div>
     );
};

export default FacialLogin;