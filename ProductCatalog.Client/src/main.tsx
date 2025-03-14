import ReactDOM from 'react-dom/client'
import './assets/css/index.css'

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import App from './App.tsx'
import {store} from "./store";
import {Provider} from "react-redux";
import {ToastContainer} from "react-toastify";

ReactDOM.createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    <ToastContainer
      position="bottom-right"
      autoClose={5000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
    />
    <App/>
  </Provider>
)
