import React from 'react';

const useTranslate = (word) => {
  switch (word) {
    case 'MORNING':
      return 'Mañana';
    case 'AFTERNOON':
      return 'Tarde';
    case 'NIGHT':
      return 'Noche';
    case 'ALL_DAY':
      return 'Todo el dia';

    default:
      break;
  }
};

export default useTranslate;
