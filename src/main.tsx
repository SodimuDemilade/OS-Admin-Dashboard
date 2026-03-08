import {createRoot} from 'react-dom/client'
import './index.css'
import {BrowserRouter} from "react-router-dom";
import {Provider} from "react-redux";
import {Router} from "./router/Router.tsx";
import {PersistGate} from "redux-persist/integration/react";
import {persistor, store} from "./configs/storeConfig.ts";
import NiceModal from '@ebay/nice-modal-react';
import BaseToastContainer from "./component/toast/BaseToastContainer.tsx";

createRoot(document.getElementById('root')!).render(
    // <StrictMode>
    //   <App />
    // </StrictMode>,
    <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
            {/*<NotificationProvider/>*/}
            <NiceModal.Provider>
                <BaseToastContainer/>
                <BrowserRouter>
                    <Router/>
                </BrowserRouter>
            </NiceModal.Provider>
        </PersistGate>
    </Provider>
)
