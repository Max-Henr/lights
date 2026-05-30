import { Routes, Route } from "react-router-dom";
import MobileMenu from "./components/mobileMenu/MobileMenu";
import Dashboard from "./pages/dashboard/Dashboard";
import EditLight from "./pages/editLight/EditLight";
import Settings from "./pages/settings/Settings";

function App() {
  return (
    <div className="container">
      <MobileMenu />
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/edit-light/:id/:name" element={<EditLight />} />
        <Route path="/settings" element={<Settings />} />
      </Routes>
    </div>
  );
}

export default App;
