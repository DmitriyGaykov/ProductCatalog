import {BrowserRouter} from "react-router-dom";
import {useCurrentUser} from "./store";
import {AppRouters} from "./routes";
import {Header} from "./layouts";

function App() {
  const currentUser = useCurrentUser();

  return (
    <BrowserRouter>
        <div className="d-flex flex-column min-vw-100 min-vh-100 first-bg-color">
          {
            currentUser &&
            <Header/>
          }
          <AppRouters/>
        </div>
    </BrowserRouter>
  )
}

export default App
