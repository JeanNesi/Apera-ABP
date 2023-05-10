import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Login } from './screens/Authentication/Login';

const AppRoutes = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/login" element={<Login />} />

      <Route path="*" element={<Login />} />
    </Routes>
  </BrowserRouter>
);

export default AppRoutes;
