import React from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function toast_msg(level, message){
    if(level === "error"){
        toast.error(message, {
            position: toast.POSITION.TOP_RIGHT
          });
    }else{
        toast.success(message, {
            position: toast.POSITION.TOP_RIGHT
          });
    }
}

