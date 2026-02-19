import './index.css';
import '../src/styles/index.scss';
import {Route, Routes} from "react-router-dom";
import {APP_ROUTES} from "./system/router/constants.ts";
import ProtectedRoute from "./system/router/ProtectedRoute.tsx";
import {AuthProvider} from "./system/context/AuthContext.tsx";
import {AdsPage} from "./pages/Ads";
import {ToastProvider} from "./system/context/ToasContext.tsx";
import MainLayout from "./components/organisms/MainLayout";
import NotFound from "./pages/NotFound";
import CreateAdPage from "./pages/Ads/components/create.tsx";

function App() {
  return (
      <AuthProvider>
          <ToastProvider>
              <MainLayout>
                  <Routes>
                      <Route path={APP_ROUTES.index} element={<AdsPage/>} />
                      <Route element={<ProtectedRoute/>}>
                          <Route path={APP_ROUTES.ads.create} element={<CreateAdPage/>} />
                      </Route>

                      <Route path="*" element={<NotFound/>}/>
                  </Routes>
              </MainLayout>
          </ToastProvider>
      </AuthProvider>
  )
}

export default App
