import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import List from "./pages/list/List";
import UserPage from "./pages/single/UserPage";
import New from "./pages/new/New";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { productInputs, userInputs } from "./formSource";
import "./style/dark.scss";
import { useContext } from "react";
import { DarkModeContext } from "./context/darkModeContext";
import OrderList from "./pages/orders";
import MainLayout from "./layout/MainLayout";
import { HOME_PATH } from "./constants/path";
import UserList from './pages/user'
import CompanyDatatable from "./components/CompanyDatatable/CompanyDatatable";
import CompanyPage from "./pages/company/CompanyPage";
import Skills from "./pages/skill";
import UpdateSkill from "./pages/skill/[id]";
import NewSkill from "./pages/skill/new";
import Job from "./pages/job";
import Companies from "./pages/company";
import NewCompany from "./pages/company/new";
import UserDetail from "./pages/user/[id]";

function App() {
  const { darkMode } = useContext(DarkModeContext);


  return (
    <div className={darkMode ? "app dark" : "app"}>
      <BrowserRouter>
        <Routes>
          <Route path="login" element={<Login />} />
          <Route element={<MainLayout/>}>
            <Route path={HOME_PATH} element={<Home />} />
            <Route path="profile" element={< UserPage/>}/>
            <Route path="users">
              <Route index element={<UserList />} />
              <Route path=":id" element={<UserDetail />} />
              <Route
                path="new"
                element={<New inputs={userInputs} title="Add New User" />}
              />
            </Route>

            <Route path="company">
              <Route index element={<Companies />} />
              <Route path=":id" element={<CompanyPage />} />
              <Route path="new" element={<NewCompany />} />
            </Route>

            
            <Route path="skills">
              <Route index element={<Skills />} />
              <Route path="new" element={<NewSkill />} />
              <Route path=":id" element={<UpdateSkill />} />
            </Route>

            <Route path="jobs">
              <Route index element={<Job />} />
            </Route>

          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
