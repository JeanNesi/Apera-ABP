import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Login } from './screens/Authentication/Login';

import { AuthProvider } from './context/AuthProvider';
import { Dashboard } from './screens/Dashboard';
import { RequireAuth } from './context/RequireAuth';
import { NotFoundPage } from './screens/NotFoundPage';
import { SignUp } from './screens/Authentication/SignUp';
import { Wallet } from './screens/Wallet';
import { Home } from './screens/Home';
import { Settings } from './screens/Settings';
import { AuthTemplate } from './screens/AuthTemplate';

const AppRoutes = () => (
  <AuthProvider>
    <BrowserRouter>
      <Routes>
        <Route path="/*" element={<NotFoundPage />} />
        <Route path="*" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />

        <Route
          path="/home"
          element={
            <RequireAuth>
              <Home />
            </RequireAuth>
          }
        />

        <Route
          path="/"
          element={
            <RequireAuth>
              <AuthTemplate />
            </RequireAuth>
          }
        >
          <Route path="/dashboard/:stockName" element={<Dashboard />} />
          <Route path="/wallet" element={<Wallet />} />
          <Route path="/settings" element={<Settings />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </AuthProvider>
);

export default AppRoutes;
