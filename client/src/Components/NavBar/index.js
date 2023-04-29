import {
  IconButton,
  InputBase,
  Typography,
  Select,
  MenuItem,
  FormControl,
  useTheme,
} from '@mui/material';
import {
  Message,
  DarkMode,
  LightMode,
  Notifications,
} from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';
import { setMode, logout } from '../../Redux/Actions/authAction';
import { useNavigate, NavLink } from 'react-router-dom';
import FlexBetween from '../FlexBetween';
import MyPopper from '../MyPopper';
import MySearch from './MySearch';
import notifications from '../Notifications';

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, mode } = useSelector((state) => state.auth);
  const handleClickSetMode = () => dispatch(setMode(mode));

  const theme = useTheme();
  const neutralLight = theme.palette.neutral.light;
  const dark = theme.palette.neutral.dark;
  const primaryLight = theme.palette.primary.light;
  const alt = theme.palette.background.alt;

  const fullName = `${user.firstName} ${user.lastName}`;

  return (
    <FlexBetween
      padding="1rem 6%"
      backgroundColor={alt}
      position={'fixed'}
      width={'100%'}
      top={'0'}
      zIndex={99}
    >
      <FlexBetween gap="1.75rem">
        <Typography
          fontWeight="bold"
          fontSize="clamp(1rem, 2rem, 2.25rem)"
          color="primary"
          onClick={() => navigate('/')}
          sx={{
            '&:hover': {
              color: primaryLight,
              cursor: 'pointer',
            },
          }}
        >
          ViNet
        </Typography>
      </FlexBetween>
      <MySearch bgColor={neutralLight} />
      {/* DESKTOP NAV */}
      <FlexBetween gap="2rem">
        <IconButton onClick={handleClickSetMode}>
          {theme.palette.mode === 'dark' ? (
            <DarkMode sx={{ fontSize: '25px' }} />
          ) : (
            <LightMode sx={{ color: dark, fontSize: '25px' }} />
          )}
        </IconButton>

        <NavLink to={`/message/${user._id}`} color="inherit">
          {({ isActive }) => (
            <IconButton
              sx={{
                color: 'inherit',
                backgroundColor: isActive && neutralLight,
              }}
            >
              <Message fontSize="25px" />
            </IconButton>
          )}
        </NavLink>

        <MyPopper contents={notifications}>
          <Notifications fontSize="25px" />
        </MyPopper>

        <FormControl value={fullName}>
          <Select
            MenuProps={{
              disableScrollLock: true,
            }}
            value={fullName}
            sx={{
              backgroundColor: neutralLight,
              borderRadius: '0.25rem',
              p: '0.25rem 1rem',
              '& .MuiSvgIcon-root': {
                pr: '0.25rem',
                width: '3rem',
              },
              '& .MuiSelect-select:focus': {
                backgroundColor: neutralLight,
              },
            }}
            input={<InputBase />}
          >
            <MenuItem
              value={fullName}
              onClick={() => navigate(`/profile/${user._id}`)}
            >
              <Typography>{fullName}</Typography>
            </MenuItem>
            <MenuItem onClick={() => dispatch(logout(navigate))}>
              <Typography>Đăng xuất</Typography>
            </MenuItem>
          </Select>
        </FormControl>
      </FlexBetween>
    </FlexBetween>
  );
};

export default Navbar;
