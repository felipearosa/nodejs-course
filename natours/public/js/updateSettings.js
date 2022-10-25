import axios from 'axios';
import { showAlert } from './alerts'

const form = document.querySelector('.form-user-data');

export const updateSettings = async(data, type) => {
  const url = type === 'password' ? 'http://localhost:3000/api/v1/users/updateMyPassword' : 'http://localhost:3000/api/v1/users/updateMe';

  try{
    const result = await axios({
      method: 'PATCH',
      url,
      data
    })

    if(result.data.status === 'success'){
      showAlert('success', `${type} successfully updated`);
      window.setTimeout(() => {
        location.assign('/me');
      }, 1000)
    }

  } catch (err){
    showAlert('error', err.response.data.message)
  }

}
