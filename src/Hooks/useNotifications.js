import { useState, useEffect, Fragment } from 'react';

import { useSelector, useDispatch } from 'react-redux';

import axios from 'axios';
import { getNotifications } from '../Redux/actions/userActions';
import moment from 'moment';
import translate from '../functions/translate';

const useNotifications = () => {
  const notifications = useSelector(
    (state) => state?.userReducer?.notifications?.notifications
  );
  const page = useSelector((state) => state?.userReducer?.pageData?.page);
  const hasNextPage = useSelector(
    (state) => state?.userReducer?.pageData?.hasNextPage
  );
  const dispatch = useDispatch();

  const [unviewedNotifications, setUnviewedNotifications] = useState(
    notifications?.filter((n) => n?.viewed === false) || []
  );
  const [renderNotifications, setRenderNotifications] = useState([]);
  const [actualPage, setActualPage] = useState(1);

  const viewNotifications = async () => {
    try {
      axios(
        `${process.env.REACT_APP_URI}/users/${localStorage.getItem(
          'userID'
        )}/view_notifications`,
        {
          method: 'PUT',
          headers: {
            contentType: 'application/json',
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
          data: { notifications_id: unviewedNotifications },
        }
      ).then((res) => {
        dispatch(getNotifications());
      });
    } catch (e) {
      alert('errorrrrrrr');
    }
  };

  const loadMoreNotifications = () => {
    dispatch(getNotifications(actualPage + 1));
    setActualPage((actualPage) => actualPage + 1);
  };

  useEffect(() => {
    setRenderNotifications((oldNotif) => oldNotif.concat(notifications));
  }, [notifications]);

  return {
    hasNextPage,
    renderNotifications,
    actualPage,
    loadMoreNotifications,
  };
};

export default useNotifications;
