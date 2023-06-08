import { Slide, ToastContainer } from 'react-toastify';
import GlobalCSS from './styles/globalCSS';
import 'react-toastify/dist/ReactToastify.css';
import { ThemeProvider } from 'styled-components';
import { theme } from './styles/theme';
import AppRoutes from './routes';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <GlobalCSS />
      <ToastContainer
        position="top-right"
        autoClose={2500}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        transition={Slide}
      />
      <AppRoutes />
    </ThemeProvider>
  );
}

export default App;
