export const notificationsMenuStyle = {
  filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
  mt: 1.5,
  maxHeight: 60 * 5,
  '& .MuiMenuItem-root': {
    height: 60,
    minWidth: '30vw',
    display: 'flex',
    alignItems: 'stretch',
    whiteSpace: 'normal',
    paddingInline: '.5rem',
  },
  '& .MuiTypography-root': {
    fontSize: '0.9rem',
  },

  // '&:before': {
  //   content: '""',
  //   display: 'block',
  //   position: 'absolute',
  //   top: 0,
  //   right: 14,
  //   width: 10,
  //   height: 10,
  //   bgcolor: 'background.paper',
  //   transform: 'translateY(-50%) rotate(45deg)',
  //   zIndex: 0,
  // },
};

export const initialFormStyle = {
  margin: '1em',
  width: '80vw',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  '& .MuiTextField-root': { m: 1 },
};

export const titleStyle = {
  marginBlock: '1rem .5rem',
  width: '80vw',
  height: '3rem',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
};

export const findeItems = {
  marginBlock: '1rem .5rem',
  paddingInline: '1em',
  width: '80vw',
  height: '3rem',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
};

export const accordeonStyle = {
  width: '90vw',
  marginBlock: '.5rem',
};

export const accordionSummaryStyle = {
  display: 'flex',
  flexDirection: 'row-reverse',
  '& .MuiAccordionSummary-content': {
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  gap: '1rem',
};

export const buildingCard = {
  minWidth: '90vw',
  maxWidth: '95vw',
  display: 'flex',
  justifyContent: 'space-between',
  marginBlock: '.5em',
};

export const cardContent = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
};

export const inviteBuildingCard = {
  display: 'flex',
  justifyContent: 'space-between',
  minWidth: '90vw',
  maxWidth: '95vw',
};

export const inviteRequestCard = {
  display: 'flex',
  justifyContent: 'space-between',
  // minWidth: '90vw',
  maxWidth: '95vw',
};

export const backButtonStyle = {
  position: 'absolute',
  left: ' 2vw',
};

export const profileInformationStyle = {
  marginBlock: '1rem .5rem',
  padding: '1rem .5rem ',
  minWidth: '80vw',
  maxWidth: '95vw',
  minHeight: '3rem',
  display: 'flex',
  flexDirection: 'column',
};

const nightColor = '#102040';

export const calendarDayStyle_night = {
  position: 'relative',
  '& >span': { overflow: 'visible' },
  '& >::before': {
    content: `''`,
    position: 'absolute',
    right: '0',
    top: '0',
    width: '1px',
    height: '1px',
    background: nightColor,
    border: `solid 4px ${nightColor}`,
    borderRadius: '50%',
  },
};

const afternoonColor = '#F28322';

export const calendarDayStyle_afternon = {
  position: 'relative',
  '&::after': {
    content: `''`,
    position: 'absolute',
    left: 'calc(50% - 4px)',
    top: '0',
    width: '1px',
    height: '1px',
    background: afternoonColor,
    border: `solid 4px ${afternoonColor}`,
    borderRadius: '50%',
  },
};

const morningColor = '#5E7358';
// background: '#D5DCF2',

export const calendarDayStyle_morning = {
  position: 'relative',
  '&::before': {
    content: `''`,
    position: 'absolute',
    left: '0',
    top: '0',
    width: '1px',
    height: '1px',
    background: morningColor,
    border: `solid 4px ${morningColor}`,
    borderRadius: '50%',
  },
};
