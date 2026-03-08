import {ToastContainer, ToastContainerProps} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export type BaseToastContainerProps = ToastContainerProps
const BaseToastContainer = (props: BaseToastContainerProps) => {
    return (
        <ToastContainer
            position="top-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="colored"
            {...props}
        />
    );
}

export default BaseToastContainer;
