import React, { lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ContentProvider } from "./context/ContentContext";
import Portfolio from "./components/Portfolio";

const DevPanel = lazy(() => import("./dev/DevPanel"));

const Fallback = () => (
  <div className="min-h-screen grid place-items-center bg-gray-950">
    <div className="w-10 h-10 rounded-full border-2 border-sky-500/30 border-t-sky-400 animate-spin" />
  </div>
);

function App() {
  return (
    <ContentProvider>
      <BrowserRouter>
        <Suspense fallback={<Fallback />}>
          <Routes>
            <Route path="/" element={<Portfolio />} />
            <Route path="/dev" element={<DevPanel />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </ContentProvider>
  );
}

export default App;
