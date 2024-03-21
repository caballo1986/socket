import './App.css';
import {io} from 'socket.io-client';
import { useState,useEffect } from 'react';
import { UlMensajes, LiMensaje } from './ui-components';

const socket = io('http://localhost:1000');
function App() {
  const [IsConnected, setIsConnected] = useState();
  const [nuevoMensaje, setNuevoMensasje] = useState('');
  const [mensajes, setMensajes] = useState([]);

  useEffect(() => {
    socket.on('connect', () => setIsConnected(true));
    socket.on('chat_message', (data)=>{
      setMensajes(mensajes=> [...mensajes,data]);
      //console.log("🚀 ~ socket.on ~ data:", data) 
    });
    return()=>{
      socket.off('connect');//, () => setIsConnected(true));
      socket.off('chat_message');//, (data)=>{
        //console.log("🚀 ~ socket.on ~ data:", data) 
    };
  },[]);

  const enviarMensaje = () => { 
    socket.emit('chat_message', {
      usuario: socket.id,
      texto: nuevoMensaje
    });
  }

  return (
    <div className="App">
      <h2>{IsConnected ? 'CONECTADO' : 'DESCONECTADO'}</h2>
      <UlMensajes>
        {mensajes.map(mensaje => (
          <LiMensaje>{mensaje.usuario}: {mensaje.texto}</LiMensaje>
        ))}
      </UlMensajes>
      <input type="text"
        onChange={e => setNuevoMensasje(e.target.value)} 
        />
      <button onClick={enviarMensaje}>Enviar</button>
    </div>
  );
}

export default App;
