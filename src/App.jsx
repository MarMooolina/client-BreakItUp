import "./App.css";
import { Routes, Route } from "react-router-dom";
import DashboardPage from "./pages/DashboardPage/DashboardPage"
import HomePage from "./pages/HomePage/HomePage";
import ProfilePage from "./pages/ProfilePage/ProfilePage";
import LogOutPage from "./pages/LogOutPage/LogOutPage";
import Authentication from "./pages/Authentication/Authentication"

function App() {
  return (
    <div className="App">

      <Routes>
        
        <Route path="/" element={<HomePage />} />
        <Route path="/dashboard" element={<DashboardPage />}/>
        <Route path="/login" element={<Authentication/>}/>
        <Route path="/signup" element={<Authentication signup={true}/>}/>
        <Route path="/profile" element={<ProfilePage/>}/>
        <Route path="/logout" element={<LogOutPage/>}/>

        
        <Route path="*" element={<h1>404</h1>}/>

        {/**
         * <Route path="/create" element={<Create/>}/>
        */}
        

      </Routes>
    </div>
  );
}

export default App;

{ /**<Route
path="/profile"
element={
  <IsPrivate>
    <ProfilePage />
  </IsPrivate>
}
/>

<Route
path="/signup"
element={
  <IsAnon>
    <SignupPage />
  </IsAnon>
}
/>
<Route
path="/login"
element={
  <IsAnon>
    <LoginPage />
  </IsAnon>
}
/>*/}
