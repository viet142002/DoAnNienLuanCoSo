import { Box } from '@mui/material';
import Navbar from '../../NavBar';

function DefaultLayout({ children }) {
  return (
    <>
      <Navbar />
      <Box paddingTop={'80px'} sx={{ height: '100%' }}>
        {children}
      </Box>
    </>
  );
}

export default DefaultLayout;
