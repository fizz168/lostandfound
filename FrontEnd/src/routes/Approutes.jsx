import { Routes, Route } from "react-router-dom";
import { Navigate } from "react-router-dom";
import Home from "../pages/Homepage";
import Browse from "../pages/Browse";
import Detail from "../pages/Detail";
import Login from "../pages/Login";
import Admin from "../pages/Admin";
import ReportForm from "../pages/ReportForm";
import Claim from "../pages/Claim";

export default function AppRoutes({ items, addItem, setAuthed }) {
  return (
    <Routes>
      <Route path="/" element={<Home items={items} />} />
      <Route path="/home" element={<Navigate to="/" replace />} />
      <Route path="/browse" element={<Browse items={items} />} />
      <Route path="/detail/:id" element={<Detail items={items} />} />
      <Route path="/claim/:id" element={<Claim items={items} />} />
      <Route path="/login" element={<Login setAuthed={setAuthed} />} />
      <Route path="/admin" element={<Admin />} />
      <Route path="/report-lost" element={<ReportForm type="lost" addItem={addItem} />} />
      <Route path="/report-found" element={<ReportForm type="found" addItem={addItem} />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}