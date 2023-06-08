import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Login } from './screens/Authentication/Login';

import { AuthProvider } from './hook/AuthProvider';
import { Dashboard } from './screens/Dashboard';
import { Navbar } from './components/Navbar';
import { RequireAuth } from './hook/RequireAuth';
import { NotFoundPage } from './screens/NotFoundPage';

const AppRoutes = () => (
  <AuthProvider>
    <BrowserRouter>
      <Routes>
        <Route path="/*" element={<NotFoundPage />} />
        <Route path="/login" element={<Login />} />

        <Route
          path="/"
          element={
            <RequireAuth>
              <Navbar />
            </RequireAuth>
          }
        >
          <Route path="/dashboard/:stockName" element={<Dashboard />} />
        </Route>

        <Route path="*" element={<Login />} />
      </Routes>
    </BrowserRouter>
  </AuthProvider>
);

export default AppRoutes;
