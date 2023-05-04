import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Fragment, useEffect, useMemo } from 'react';
import { createTheme } from '@mui/material/styles';
import { CssBaseline, ThemeProvider } from '@mui/material';

import { Login, Register } from './Pages';
import Alert from './Components/Alert';
import { refreshToken } from './Redux/Actions/authAction';
import { themeSettings } from './theme';
import { routes } from './Routes';
import DefaultLayout from './Components/Layouts/DefaultLayout';
function App() {
  const { token, mode } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);

  useEffect(() => {
    dispatch(refreshToken());
  }, [dispatch]);

  return (
    <div className="app">
      <Router>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Alert />
          <Routes>
            <Route path="/register" element={<Register />} />
            {routes.map((route, index) => {
              let Layout = DefaultLayout;
              if (!route.layout) {
                Layout = Fragment;
              }
              const Page = route.component;
              return (
                <Route
                  key={index}
                  path={route.path}
                  element={
                    token ? (
                      <Layout>
                        <Page />
                      </Layout>
                    ) : (
                      <Login />
                    )
                  }
                />
              );
            })}
          </Routes>
        </ThemeProvider>
      </Router>
    </div>
  );
}

export default App;
