import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { Provider } from 'react-redux'
import store from './redux/Store.js'
import { PersistGate } from 'redux-persist/integration/react'
import { persistStore } from 'redux-persist'
import { GoogleOAuthProvider } from '@react-oauth/google'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';

const persistor = persistStore(store)
//  const clientId = "8783031699-8e50uah3a57f9dgp3f8o56qjsmu4kfho.apps.googleusercontent.com"
createRoot(document.getElementById('root')).render(
  
   <>
      <ToastContainer />
      {/* <GoogleOAuthProvider clientId={clientId}> */}
         <StrictMode>
            <Provider store={store}>
               <PersistGate loading={null} persistor={persistor} >
                  <App />
               </PersistGate>
            </Provider>
         </StrictMode>
      {/* </GoogleOAuthProvider> */}
   </>
)