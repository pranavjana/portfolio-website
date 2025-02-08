import React from "react";
import { Suspense } from "react";
import { useRoutes, Routes, Route } from "react-router-dom";
import Home from "./components/home";
import routes from "tempo-routes";
import NavigationMenu from "./components/NavigationMenu";
import ChatBot from "./components/ChatBot";

function App() {
  return (
    <div className="relative">
      <NavigationMenu />
      <Suspense fallback={<p>Loading...</p>}>
        <>
          <Routes>
            <Route path="/" element={<Home />} />
          </Routes>
          {import.meta.env.VITE_TEMPO === "true" && useRoutes(routes)}
        </>
      </Suspense>
      <ChatBot />
    </div>
  );
}

export default App;
