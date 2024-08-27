
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import App from './App.jsx'
import './index.css'
import { store,persistor } from './Redux/store.js'
import { PersistGate } from 'redux-persist/integration/react'
import {Toaster} from 'sonner'

createRoot(document.getElementById('root')).render(
<Provider store={store}>
<PersistGate loading={null} persistor={persistor}>

<Toaster richColors/>
    <App />
    </PersistGate>
    </Provider>
    
 
)
