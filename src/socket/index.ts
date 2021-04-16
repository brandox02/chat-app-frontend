import io from 'socket.io-client';

const socket = io('http://192.168.100.36:5000/');

export default socket;