export const useBooking = () => {
  const aceptBooking = async (space_id, body) => {
    try {
      let response = await postAction(`spaces/${space_id}/acept`, body);
      console.log(response);
      alert('salio todo ok');
    } catch (e) {
      alert('rotura');
    }
  };

  const deleteTenant = async () => {
    try {
      const deleteReq = postAction(`users/removeTenant/${userId}`, bodyData);
      console.log(deleteReq);
      alert('el coso fue eliminado');
    } catch (error) {
      alert(error.response.data.message);
    }
  };

  // useEffect(() => {
  //   setBuilding(data?.building);
  // }, [loading, deleteHook?.loading]);

  useEffect(() => {
    if (deleteHook.data.message === 'REMOVED_USER_FROM_BUILDING') {
      alert('Eliminado');
      fetchGetData(`buildings/${buildingId}`);
    }
  }, [deleteHook?.loading]);
};
