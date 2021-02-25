import React, {useState, useEffect} from 'react';
import io from 'socket.io-client';

const socket = io(); // Connects to socket connection

export function Square(props) {
    useEffect(() => {
    socket.on('clickSuccessX', ( data ) => {
        if (data.id==props.id){
            console.log('Square #' + data.id + ' has changed to X by <' + data.username + '>');
            document.getElementById(data.id).innerHTML = "X";
        }
    });
    socket.on('clickSuccessO', ( data ) => {
        if (data.id==props.id){
            console.log('Square #' + data.id + ' has changed to O by <' + data.username + '>');
            document.getElementById(data.id).innerHTML = "O";
        }
    });
    socket.on('clickFailed', ( data ) => {
        console.log('Click Failed');
        console.log(data);
    });
  }, []);
  
  
    function clickDiv(id, username) {
        console.log('Square #' + id + ' has been attempt to be changed by you (<' + username + '>)');
        socket.emit('clickAttempt',  {id: id, username: username} );
    }
    
    return(
        
        <div id={props.id} className="box" onClick={() => clickDiv(props.id, props.username)}>{props.face}</div>
    )
}
        


