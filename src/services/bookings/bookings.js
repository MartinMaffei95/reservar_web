import { postAction } from '../axiosActions';

export const aceptBooking = async (space_id, body) => {
  try {
    let response = await postAction(`spaces/${space_id}/acept`, body);
    console.log(response);
    alert('salio todo ok');
  } catch (e) {
    alert('rotura');
  }
};

export const denyBooking = async (space_id, body) => {
  try {
    let response = await postAction(`spaces/${space_id}/acept`, body);
    console.log(response);
    alert('salio todo ok');
  } catch (e) {
    alert('rotura');
  }
};
