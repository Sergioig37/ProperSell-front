import { Route, BrowserRouter, Routes} from "react-router-dom"
import { LandingPage } from "./components/LandingPage"
import { Login } from "./components/Login"
import { Register } from "./components/Register"
import { AlertasDashboard } from "./components/alerta/AlertaDashboard"
import { AdminPanel } from "./components/admin/AdminPanel"
import { PropiedadesDashboard } from "./components/propiedades/PropiedadesDashboard"
import {AlertaProfile} from "./components/alerta/AlertaProfile"
import { AlertaCreate} from "./components/alerta/AlertaCreate"
import { AlertaUpdate } from "./components/alerta/AlertaUpdate"
import { PropiedadProfile } from "./components/propiedades/PropiedadProfile"
import { PropiedadUpdate } from "./components/propiedades/PropiedadUpdate"
import { PropiedadCreate } from "./components/propiedades/PropiedadCreate"
import { Explorar } from "./components/Explorar"
import { Unauthorized } from "./components/Unauthorized"
import { UsuariosDashboard } from "./components/usuario/UusariosDashboard"
import { UsuarioAccount } from "./components/usuario/UsuarioAccount"
import { UsuarioProfile } from "./components/usuario/UsuarioProfile"
import { UsuarioUpdate } from "./components/usuario/UsuarioUpdate"
import { MisPropiedades } from "./components/propiedades/MisPropiedades"
import { MisAlertas } from "./components/alerta/MisAlertas"



export const App = () => {


  return (
    <>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<Login />}/>
            <Route path="/register" element={<Register/>}/>
            <Route path="/explore" element={<Explorar/>}/>
            <Route path="/alerta/:id" element={<AlertaProfile/>} />
            <Route path="/alerta/edit/:id" element={<AlertaUpdate/>}/>
            <Route path="/alerta/create" element={<AlertaCreate/>}/>
            <Route path="/cliente/:id/propiedad/create" element={<PropiedadCreate/>}/>
            <Route path="/propiedad/:id" element={<PropiedadProfile/>}/>
            <Route path="/propiedad/edit/:id" element={<PropiedadUpdate/>}/>
            <Route path="/propiedad/create" element={<PropiedadCreate/>}/>
            <Route path="/admin/alerta-dashboard" element={<AlertasDashboard/>}/>
            <Route path="/admin/propiedades-dashboard" element={<PropiedadesDashboard/>}/>
            <Route path="/admin/usuarios-dashboard" element={<UsuariosDashboard/>}/>
            <Route path="/admin" element={<AdminPanel/>}/>
            <Route path="/denegado" element={<Unauthorized/>}/>
            <Route path="/account" element={<UsuarioAccount/>}/>
            <Route path="/usuario/:username" element={<UsuarioProfile/>}/>
            <Route path="/usuario/edit/:username" element={<UsuarioUpdate/>}/>
            <Route path="/account" element={<UsuarioAccount/>}/>
            <Route path="/mis-propiedades" element={<MisPropiedades/>}/>
            <Route path="mis-alertas" element={<MisAlertas/>}/>
            
          </Routes> 
        </BrowserRouter>
    </>
  )
}


