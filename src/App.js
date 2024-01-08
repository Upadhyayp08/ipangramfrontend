import logo from "./logo.svg";
import "./App.css";
import Home from "./pages/Home";
import { AllRoutes } from "./routes/AllRoutes";

import "react-notifications/lib/notifications.css";
import { NotificationContainer } from "react-notifications";
// import { AllRoutes } from "./Routes/routes";

function App() {
  return (
    <>
      <>
        <NotificationContainer />
        <AllRoutes />
      </>
    </>
  );
}

export default App;
