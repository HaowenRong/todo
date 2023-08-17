import { searchUser } from "./backend/api.js";
import { loadUserPages } from "./pages.js";

export function accountBtnListener() {
  const accountBtn = document.getElementById('accountBtn');
  const accountBar = document.getElementById('accountBar');

  accountBtn.addEventListener('click', () => {
    accountBar.classList.toggle('accountBar__opened');
  });
}

// cookies
export function storeAccount(value, expiry) {
  const expiration = new Date();
  expiration.setTime(expiration.getTime() + (expiry * 24 * 60 * 60 * 1000));
  
  let expires = "expires=" + expiration.toUTCString();
  document.cookie = 'account=' + value + ';' + expires + ';path=/';
  console.log(document.cookie);
}

export function getAccount() {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; account=`);
  if (parts.length === 2) return parts.pop().split(';').shift();
}

export async function loadUserFromCookies() {
  const account = document.getElementById('accountBtn');
  const accountName = getAccount();
  if (accountName == undefined) {
    account.textContent = 'Account';
    return;
  }
  account.textContent = accountName;
  await loadUserPages(account.textContent);
}

function expiryDaysDetection() {
  const btn1 = document.getElementById('days1');
  const btn2 = document.getElementById('days7');
  const btn3 = document.getElementById('days14');
  const btn4 = document.getElementById('days30');

  function highlightBtn(event) {
    // check if selected button has already been selected
    const previouslySelected = event.target.classList.contains('expiryBtn__selected');

    // remove highlight from all buttons
    btn1.classList.remove('expiryBtn__selected');
    btn2.classList.remove('expiryBtn__selected');
    btn3.classList.remove('expiryBtn__selected');
    btn4.classList.remove('expiryBtn__selected');

    // if selected button is already highlighted, return and leave all buttons unselected
    if (previouslySelected == true) { return; }

    // give selected button the selected class
    event.target.classList.toggle('expiryBtn__selected');
  } 

  btn1.addEventListener('click', highlightBtn);
  btn2.addEventListener('click', highlightBtn);
  btn3.addEventListener('click', highlightBtn);
  btn4.addEventListener('click', highlightBtn);
}

function loginDetection() {
  const accName = document.getElementById('accountNameInput');
  const accBtn  = document.getElementById('logIn');
  accBtn.addEventListener('click', async () => {
    const currentlySelected = document.getElementsByClassName('expiryBtn__selected');
    console.log(currentlySelected.length);
    if (currentlySelected.length == 0) {
      return; 
    }
    console.log(currentlySelected[0].value);
    console.log(accName.value);
    // check name against db
    // create error messages

    if (accName.value.length == 0) { return; }
    // display error if empty

    // load user if name is found in db
    if (await searchUser(accName.value) != null) {
      const a = await searchUser(accName.value)
      console.log(a.pages);
      storeAccount(accName.value, currentlySelected[0].value);
      loadUserFromCookies();
      // todo check for same account
      submitForm();
    }
  });
}

function logoutDectection() {
  const logoutBtn = document.getElementById('logOut');
  logoutBtn.addEventListener('click', () => {
    // return if not signed in
    if (getAccount() == undefined) { return; }

    // change date of cookie to have browser delete it
    const unixEpoch = new Date(0);
    document.cookie = `account=; expires=${unixEpoch.toUTCString()}; path=/;`;
    
    loadUserFromCookies();
    closeForm();
    submitForm();
  });
}

function closeForm() {
  const accName = document.getElementById('accountNameInput');
  const currentlySelectedExpiry = Array.from(document.getElementsByClassName('expiryBtn__selected'));
  console.log(currentlySelectedExpiry.length);
  currentlySelectedExpiry.forEach(element => {
    element.classList.remove('expiryBtn__selected');
  });
  accName.value = '';
}

function submitForm() {
  const form = document.getElementById('accountBar');
  form.submit();
}

loadUserFromCookies();
expiryDaysDetection();
loginDetection();
logoutDectection();
