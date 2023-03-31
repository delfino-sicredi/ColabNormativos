import * as React from 'react';
import { toast, ToastContainer } from 'react-toastify';
import { useEffect } from 'react';
import 'react-toastify/dist/ReactToastify.css';
interface ToastyProps {
    mensage: string;
    type?: 'info' | 'success' | 'warning' | 'error' | 'default';
    position: 'top-right' | 'top-center' | 'top-left' | 'bottom-left' | 'bottom-right' | 'bottom-center';
    delay?: number;
    progressBar?: boolean;
    pauseOnHover?: boolean;
    draggable?: boolean;
    theme?: 'light' | 'dark' | 'colored'
}

export default function Toasty(props : ToastyProps) : JSX.Element {
    useEffect(() =>{
        toast(props.mensage, {
            type: props.type? props.type : 'default',
            autoClose: props.delay,
            draggable: props.draggable,
            theme: props.theme? props.theme : 'light',
            position: props.position,
            hideProgressBar: !props.progressBar

        })
    })
    return(
        <ToastContainer />
    )
}