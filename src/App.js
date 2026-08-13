import { BrowserRouter, Routes, Route } from "react-router-dom";

import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Modules from "./pages/Modules";
import ModulePage from "./pages/ModulePage";
import PrivateRoute from "./components/PrivateRoute";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminRoute from "./components/admin/AdminRoute"
import AdminQuiz from "./pages/admin/AdminQuiz";
import AdminLayout from "./components/admin/AdminLayout";
import AdminAnalytics from "./pages/admin/AdminAnalytics";
import AboutUs from "./pages/AboutUs";
import Resources from "./pages/Resources";
import FAQ from "./pages/Faq";
import Profile from "./pages/Profile";
import AdminUsers from "./pages/admin/AdminUsers";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* Public */}
        <Route path="/" element={<Signup />} />
        <Route path="/login" element={<Login />} />

        {/* Protected */}
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />

        <Route
          path="/modules"
          element={
            <PrivateRoute>
              <Modules />
            </PrivateRoute>
          }
        />

        <Route
          path="/module/:id"
          element={
            <PrivateRoute>
              <ModulePage />
            </PrivateRoute>
          }
        />

        <Route
          path="/about"
          element={
            <PrivateRoute>
              <AboutUs />
            </PrivateRoute>
          }
        />

        <Route
          path="/resources"
          element={
            <PrivateRoute>
              <Resources />
            </PrivateRoute>
          }
        />

        <Route
          path="/faq"
          element={
            <PrivateRoute>
              <FAQ />
            </PrivateRoute>
          }
        />

        <Route
          path="/profile"
          element={
            <PrivateRoute>
              <Profile />
            </PrivateRoute>
          }
        />

        <Route
          path="/admin"
          element={
            <AdminRoute>
              <AdminLayout>
                <AdminDashboard />
              </AdminLayout>
            </AdminRoute>
          }
        />

        <Route
          path="/admin/users"
          element={
            <AdminLayout>
              <AdminUsers />
            </AdminLayout>
          }
        />

        <Route
          path="/admin/quiz/:moduleId"
          element={
            <AdminRoute>
              <AdminLayout>
                <AdminQuiz />
              </AdminLayout>
            </AdminRoute>
          }
        />

        <Route
          path="/admin/analytics"
          element={
            <AdminRoute>
              <AdminLayout>
                <AdminAnalytics />
              </AdminLayout>
            </AdminRoute>
          }
        />

      </Routes>
    </BrowserRouter>
  );
}

export default App;