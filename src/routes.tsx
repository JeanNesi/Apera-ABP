import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Login } from './screens/Authentication/Login';

import { AuthProvider } from './hook/AuthProvider';
import { Dashboard } from './screens/Dashboard';

const AppRoutes = () => (
  <AuthProvider>
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />

        <Route path="/dashboard" element={<Dashboard />} />

        <Route path="*" element={<Login />} />
      </Routes>
    </BrowserRouter>
  </AuthProvider>
);

export default AppRoutes;
