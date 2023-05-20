import "./styles/App.css";
import Routers from "./routers/Routers";
import { ContextProvider } from "./context/auth-context";

function App() {
  return (
    <div className="App">
      <ContextProvider>
        <Routers />
      </ContextProvider>
    </div>
  );
}

export default App;
