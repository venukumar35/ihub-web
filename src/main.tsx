import ReactDOM from "react-dom/client";
import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import App from "./App";
import Login from "./pages/login";
import MainPage from "./pages/main.page";
import "./index.css";
import Landing from "./pages/landing/landing";
import Home from "./pages/home";

const route = createBrowserRouter(
  createRoutesFromElements(
    <Route path="" element={<App />}>
      <Route index element={<Home />}/>
      <Route path="/login" element={<Login />} />
      <Route path="/" element={<MainPage />}>
      <Route path="/landing" element={<Landing />} />
      </Route>
    </Route>
  )
);
ReactDOM.createRoot(document.getElementById("root")!).render(
  <RouterProvider router={route} />
);
