import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Login } from './screens/Authentication/Login';

import { AuthProvider } from './context/AuthProvider';
import { RequireAuth } from './context/RequireAuth';
import { AuthTemplate } from './screens/AuthTemplate';
import { SignUp } from './screens/Authentication/SignUp';
import { Dashboard } from './screens/Dashboard';
import { Home } from './screens/Home';
import { NotFoundPage } from './screens/NotFoundPage';
import { PreferredAssets } from './screens/PreferredAssets';
import { Settings } from './screens/Settings';
import { Wallet } from './screens/Wallet';

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
          <Route path="/wallet/:walletId" element={<Wallet />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/preferredAssets" element={<PreferredAssets />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </AuthProvider>
);

export default AppRoutes;
