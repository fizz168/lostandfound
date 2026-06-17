import { Routes, Route } from "react-router-dom";
import { Navigate } from "react-router-dom";
import Home from "../pages/Homepage";
import Browse from "../pages/Browse";
import Detail from "../pages/Detail";
import Login from "../pages/Login";
import Admin from "../pages/Admin";
import ReportForm from "../pages/ReportForm";
import Claim from "../pages/Claim";

function RequireAuth({ authed, children }) {
  if (!authed) {
    return <Navigate to="/login" replace />
  }

  return children
}

export default function AppRoutes({ items, addItem, authed, setAuthed }) {
  return (
    <Routes>
      <Route path="/login" element={authed ? <Navigate to="/" replace /> : <Login setAuthed={setAuthed} />} />
      <Route
        path="/"
        element={
          <RequireAuth authed={authed}>
            <Home items={items} />
          </RequireAuth>
        }
      />
      <Route path="/home" element={<Navigate to="/" replace />} />
      <Route
        path="/browse"
        element={
          <RequireAuth authed={authed}>
            <Browse items={items} />
          </RequireAuth>
        }
      />
      <Route
        path="/detail/:id"
        element={
          <RequireAuth authed={authed}>
            <Detail items={items} />
          </RequireAuth>
        }
      />
      <Route
        path="/claim/:id"
        element={
          <RequireAuth authed={authed}>
            <Claim items={items} />
          </RequireAuth>
        }
      />
      <Route
        path="/admin"
        element={
          <RequireAuth authed={authed}>
            <Admin />
          </RequireAuth>
        }
      />
      <Route
        path="/report-lost"
        element={
          <RequireAuth authed={authed}>
            <ReportForm type="lost" addItem={addItem} />
          </RequireAuth>
        }
      />
      <Route
        path="/report-found"
        element={
          <RequireAuth authed={authed}>
            <ReportForm type="found" addItem={addItem} />
          </RequireAuth>
        }
      />
      <Route path="*" element={<Navigate to={authed ? "/" : "/login"} replace />} />
    </Routes>
  );
}