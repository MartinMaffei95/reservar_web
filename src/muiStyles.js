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
export const notificationStyle = {
  display: 'flex',
  gap: '.5em',
  '& .MuiIcon-root': {
    height: '100%',
  },
};

export const notificationStyle_last = {
  display: 'flex',
  gap: '.5em',
  alignSelf: 'center',
  fontSize: '1.1rem',
  fontWeight: 'bolder',
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
export const bookingCardContainer = {
  display: 'flex',
  justifyContent: 'space-evenly',
  flexWrap: 'wrap',
};

export const bookingCard = {
  minWidth: '20em',
  maxWidth: '50vw',
  display: 'flex',
  justifyContent: 'space-between',
  marginBlock: '.5em',
};

export const bookingData = {
  display: 'flex',
  marginBlock: '.5em',
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

const allDayColor = 'red';
// background: '#D5DCF2',

export const calendarDayStyle_allDay = {
  position: 'relative',
  border: `solid 2px ${allDayColor}`,
  // '&::before': {
  //   content: `''`,
  //   position: 'absolute',
  //   left: '0',
  //   top: '0',
  //   width: '1px',
  //   height: '1px',
  //   background: allDayColor,
  //   border: `solid 4px ${allDayColor}`,
  //   borderRadius: '50%',
  // },
};

// buttons styles

export const successButtonStyle = {
  background: 'green',
};

export const profileEditStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  '& .MuiBox-root': {
    display: 'flex',
    flexGrow: '1',
    '& .MuiTextField-root': { width: '100%' },
  },
};

// -- TABLET GRID STYLE
export const resizeAsideStyle = {
  minWidth: '95%',
  maxWidth: '100%',
  overflowY: 'scroll',
  alignItems: 'center',

  '& .MuiPaper-root': {
    minWidth: '90%',
    maxWidth: '95%',
  },
};
