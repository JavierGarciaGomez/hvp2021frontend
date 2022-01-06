import { Provider } from "react-redux";
import "./App.css";
import { AppRouter } from "./routes/AppRouter";
import { store } from "./store/store";

function App() {
  return (
    <Provider store={store}>
      <div className="app-container">
        <AppRouter />
      </div>
    </Provider>
  );
}

export default App;
