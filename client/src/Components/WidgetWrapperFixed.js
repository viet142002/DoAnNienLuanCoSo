import { Box } from '@mui/material';
import { styled } from '@mui/system';

const WidgetWrapperFixed = styled(Box)(({ theme }) => ({
  padding: '1.5rem 1.5rem 0.75rem 1.5rem',
  backgroundColor: theme.palette.background.alt,
  borderRadius: '0.75rem',
  position: 'fixed',
  maxWidth: '347px',
}));

export default WidgetWrapperFixed;
