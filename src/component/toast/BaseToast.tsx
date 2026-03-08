import {toast, type ToastOptions} from 'react-toastify';
import type {ReactNode} from "react";

type BaseToastProps = {
    message: string | ReactNode;
    type?: 'success' | 'error' | 'info' | 'warning' | 'default';
    options?: ToastOptions;
};

// Create the BaseToast component
const BaseToast = ({message, type = 'default', options = {}}: BaseToastProps) => {
    console.log("im in toast")
    const defaultOptions: ToastOptions = {
        position: options.position || "top-right",
        autoClose: options.autoClose ?? 5000, // Auto close after 5 seconds
        hideProgressBar: options.hideProgressBar ?? false,
        closeOnClick: options.closeOnClick ?? true,
        pauseOnHover: options.pauseOnHover ?? true,
        draggable: options.draggable ?? true,
        progress: options.progress,
        theme: options.theme || "colored",
    };

    switch (type) {
        case 'success':
            return toast.success(message, {
                ...defaultOptions, ...options,
                // bodyStyle: {...options?.bodyStyle},
            });
        case 'error':
            return toast.error(message, {...defaultOptions, ...options});
        case 'info':
            return toast.info(message, {...defaultOptions, ...options});
        case 'warning':
            return toast.warning(message, {...defaultOptions, ...options});
        default:
            return toast(message, {...defaultOptions, ...options});
    }
};

export default BaseToast;
