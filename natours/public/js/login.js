
import axios from 'axios';
import { showAlert } from './alerts';

export const login = async(email,password) => {
  try{
    const result = await axios({
      method: 'POST',
      url: 'http://localhost:3000/api/v1/users/login',
      data: {
        email,
        password
      }
    });

    if(result.data.status === 'success'){
      showAlert('success', 'Logged in Successfully');
      window.setTimeout(() => {
        location.assign('/');
      }, 1000)
    }

  } catch(err){
    console.log( err.response.data);
    showAlert('error', err.response.data.message);
  }
}
