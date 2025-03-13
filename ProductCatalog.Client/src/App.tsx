import {BrowserRouter} from "react-router-dom";
import {AppRouters} from "./routes";
import {store} from "./store";
import {Provider} from "react-redux";

function App() {
  return (
    <BrowserRouter>
      <Provider store={store}>
        <AppRouters />
      </Provider>
    </BrowserRouter>
  )
}

export default App
