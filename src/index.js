import ReactDOM from "react-dom";
//Redux provider
import { Provider } from "react-redux";
import "./index.css";
import App from "./App";

// Redux store
import store from "./store";

// Make redux store accessible to the entire application
ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
