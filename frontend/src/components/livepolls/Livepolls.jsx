import React from 'react'
import { useState } from 'react';
import HeaderWithBackButton from '../header/HeaderWithBackButton'
import Pollquestion from '../pollquestion/Pollquestion'
import './Livepolls.css'


function Livepolls() {

  const [roomName, changeRoomName] = useState("")

  const [room, changeRoom] = useState(null);

  const [roomNotFound, changeRoomNotFound] = useState(false);


  function changeRoomData(e) {
    changeRoomName(e.target.value);
  }


  async function sendRoomReq(e){

    e.preventDefault();

    const Res= fetch(`http://localhost:5555/room/join`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
        },
        body: JSON.stringify({roomName: roomName})
    });

    const response= await Res;
    if (response.status === 200){
      const data = await response.json();
      console.log(data);
      changeRoom(data);
      changeRoomNotFound(false);
    }
    else{
      changeRoomNotFound(true);
    }
    
  }


  

  return (
    <>

    {(room == null) ? 
    <>
      <HeaderWithBackButton />


      <div className="room-sheduler">


        <label>Enter Room ID:</label>

        <form onSubmit={sendRoomReq}>
          <input type="text" onChange={changeRoomData} value={roomName} placeholder='Enter room ID' required/>
          {(roomNotFound === true) ? <><h4 className='notFound'>Error : Room Not Found !</h4></> : ""}
          <button>Enter</button>
        </form>
      </div>
    </> : <Pollquestion/>}
      
    </>
  )
}

export default Livepolls