import { login, logout } from './login'
import { displayMap } from './mapbox';
import { updateSettings } from './updateSettings';

const mapBox = document.querySelector('#map');
const loginForm = document.querySelector('.form--login');
const updateForm = document.querySelector('.form-user-data');
const updatePwForm = document.querySelector('.form-user-settings');
const logoutBtn = document.querySelector('.nav__el--logout');

if(mapBox){
  const locations = JSON.parse(mapBox.dataset.locations);
  displayMap(locations);
}

if(loginForm){
  loginForm.addEventListener('submit', e => {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    login(email, password)
  })
}

if(updateForm) {
  updateForm.addEventListener('submit', e => {
    e.preventDefault();
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    updateSettings( { name, email}, 'data');
  })
}

if(updatePwForm) {
  updatePwForm.addEventListener('submit', async e => {
    e.preventDefault();

    document.querySelector('.btn--save-password').textContent = 'Updating...';

    const passwordCurrent = document.getElementById('password-current').value;
    const password = document.getElementById('password').value;
    const passwordConfirm= document.getElementById('password-confirm').value;
    await updateSettings( { passwordCurrent, password, passwordConfirm }, 'password');
    document.querySelector('.btn--save-password').textContent = 'SAVE PASSWORD';

    document.getElementById('password-current').value = '';
    document.getElementById('password').value = '';
    document.getElementById('password-confirm').value = '';
  })
}

if(logoutBtn) logoutBtn.addEventListener('click', logout)
