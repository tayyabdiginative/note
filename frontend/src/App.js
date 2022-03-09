import React, { useEffect, useState } from "react";
import Footer from "./components/footer/Footer";
import Header from "./components/header/Header";
import MainScreen from "./components/MainScreen";
import MyNotes from "./components/MyNotes";
import LandingPage from "./screens/LandingPage/LandingPage";
import LoginScreen from "./screens/LoginScreen/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen/RegisterScreen";
import ProfileScreen from "./screens/ProfileScreen/ProfileScreen";
import CreateNote from "./screens/SingleNote/CreateNote";
import SingleNote from "./screens/SingleNote/SingleNote";
import {NotFound} from "./screens/SingleNote/NotFound";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
function App() {
  const [search, setSearch] = useState("");
  return (
    <>
      <Header setSearch={setSearch} />
      <main>
        <Routes>
          <Route exact path="/" element={<LandingPage />} />
          <Route
            exact
            path="/notes"
            element={ <MyNotes search={search} />}
          />
          <Route exact path="/login" element={<LoginScreen />} />
          <Route exact path="/register" element={<RegisterScreen />} />
          <Route exact path="/createNote" element={<CreateNote />} />
          <Route exact path="/profile" element={<ProfileScreen />} />
          <Route exact path="/note/:id" element={<SingleNote />} />

          <Route path="*" element={<NotFound />}/>
        </Routes>
      </main>
      <Footer />
    </>
  );
}

export default App;
