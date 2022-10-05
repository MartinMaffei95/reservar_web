import { useEffect, useState } from 'react';
import moment from 'moment';

const useSwitchBookings = (objBookings) => {
  const [loadingBookings, setLoadingBookings] = useState(true);
  let morningBookings = [];
  let afternonBookings = [];
  let nightBookings = [];

  const switchBookings = (objBookings) => {
    setLoadingBookings(true);

    if (!objBookings) {
      return setLoadingBookings(false);
    }
    for (let i = 0; i < objBookings.length; i++) {
      let date = objBookings[i].date;
      switch (objBookings[i].time) {
        case 'MORNING':
          if (morningBookings.includes(moment(date).format('MM DD YY'))) break;
          morningBookings.push(moment(date).format('MM DD YY'));
          break;

        case 'AFTERNOON':
          if (afternonBookings.includes(moment(date).format('MM DD YY'))) break;
          afternonBookings.push(moment(date).format('MM DD YY'));
          break;

        case 'NIGHT':
          if (nightBookings.includes(moment(date).format('MM DD YY'))) break;
          nightBookings.push(moment(date).format('MM DD YY'));
          break;
      }
    }
    setLoadingBookings(false);
  };
  useEffect(() => {
    switchBookings(objBookings);
  }, [objBookings]);

  return { morningBookings, afternonBookings, nightBookings, loadingBookings };
};

export default useSwitchBookings;
