import { Route, Routes } from "react-router-dom";
import LoginPage from "./pages/Login";
import SignUpPage from "./pages/SignUp";
import PreferencesPage from "./pages/Preferences";
import ArticlesPage from "./pages/Articles";
import NavBar from "./pages/NavBar";
import PrivateRoute from "./PrivateRoute";
import PublicRoute from "./PublicRoute";

function App() {
  return (
    <div>
      <NavBar />
      <Routes>
        <Route path="/" element={<PrivateRoute />} />

        <Route element={<PublicRoute />}>
          <Route path="/login" element={<LoginPage />}></Route>
          <Route path="/register" element={<SignUpPage />}></Route>
        </Route>

        <Route element={<PrivateRoute />}>
          <Route path="/preferences" element={<PreferencesPage />}></Route>
          <Route path="/articles" element={<ArticlesPage />}></Route>
        </Route>
      </Routes>
    </div>
  );
}

export default App;
