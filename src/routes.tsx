import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Login } from './screens/Authentication/Login';

import { AuthProvider } from './context/AuthProvider';
import { Dashboard } from './screens/Dashboard';
import { Navbar } from './components/Navbar';
import { RequireAuth } from './context/RequireAuth';
import { NotFoundPage } from './screens/NotFoundPage';
import { SignUp } from './screens/Authentication/SignUp';
import { Wallet } from './screens/Wallet';
import { Home } from './screens/Home';

const AppRoutes = () => (
  <AuthProvider>
    <BrowserRouter>
      <Routes>
        <Route path="/*" element={<NotFoundPage />} />
        <Route path="*" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route
          path="/"
          element={
            <RequireAuth>
              <Navbar />
            </RequireAuth>
          }
        >
          <Route path="/home" element={<Home />} />
          <Route path="/dashboard/:stockName" element={<Dashboard />} />
          <Route path="/wallet" element={<Wallet />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </AuthProvider>
);

export default AppRoutes;
