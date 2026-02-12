import './index.css';
import '../src/styles/index.scss';
import {Route, Routes} from "react-router-dom";
import {APP_ROUTES} from "./system/router/constants.ts";
import ProtectedRoute from "./system/router/ProtectedRoute.tsx";
import {AuthProvider} from "./system/context/AuthContext.tsx";
import MainPage from "./pages/MainPage";

function App() {
  return (
      <AuthProvider>
        <Routes>
            <Route path={APP_ROUTES.index} element={<MainPage/>} />
            <Route element={<ProtectedRoute/>}>
            </Route>
        </Routes>
      </AuthProvider>
  )
}

export default App
