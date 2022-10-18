import { Tooltip, Icon, ClickAwayListener } from '@mui/material';
import { useState, useEffect } from 'react';

const MyToolTip = ({ text, icon }) => {
  const [open, setOpen] = useState(false);

  const handleTooltipClose = () => {
    setOpen(false);
  };
  const handleTooltipOpen = () => {
    setOpen(true);
  };

  return (
    <ClickAwayListener onClickAway={handleTooltipClose}>
      <Tooltip
        PopperProps={{
          disablePortal: true,
        }}
        arrow
        title={text}
        onClose={handleTooltipClose}
        onMouseOver={handleTooltipOpen}
        open={open}
        // disableFocusListener
        // disableHoverListener
        disableTouchListener
        sx={{ position: 'absolute', left: 'calc(100% - 1.5em)', top: '.5em' }}
      >
        <Icon fontSize="tiny" onClick={handleTooltipOpen}>
          {icon}
        </Icon>
      </Tooltip>
    </ClickAwayListener>
  );
};

export default MyToolTip;
