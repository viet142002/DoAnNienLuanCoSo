import { Menu, MenuItem, IconButton } from '@mui/material';

import { useState } from 'react';

function MyPopper({ contents, children, handleDelete, handleUpdate }) {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <IconButton
        id="basic-button"
        aria-controls={open ? 'basic-menu' : undefined}
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
      >
        {children}
      </IconButton>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        disableScrollLock={true}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
      >
        {contents &&
          contents.map((content, index) => (
            <MenuItem
              onClick={() => {
                handleClose();
                if (content.action === 'update') handleUpdate();
                if (content.action === 'delete') handleDelete();
              }}
              key={index}
            >
              {content.text}
            </MenuItem>
          ))}
      </Menu>
    </div>
  );
}

export default MyPopper;
