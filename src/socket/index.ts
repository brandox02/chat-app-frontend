import io from 'socket.io-client';


const host: string = process.env.REACT_APP_HOST_PC as string;
const socket = io(host);



export default socket;