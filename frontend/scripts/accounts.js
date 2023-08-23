import { searchUser } from "./backend/api.js";
import { storeAccount, getAccount, loadUserFromCookies } from "./cookies/accounts.js";
import { message } from "./messages.js";

export function accountBtnListener() {
  const accountBtn = document.getElementById('accountBtn');
  const accountBar = document.getElementById('accountBar');

  accountBtn.addEventListener('click', () => {
    const opened = accountBar.classList.toggle('accountBar__opened');
    // if the bar is closed, clear fields
    if (!opened) {
      setTimeout(() => {
        closeForm();
        return;
      }, 100);
    }
    displayAccountInfo();
  });
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
      message("Please select login duration", 'error')
      return; 
    }
    console.log(currentlySelected[0].value);
    console.log(accName.value);
    // check name against db
    // create error messages

    if (accName.value.length == 0) {
      message("Please provide a user id", 'error')
      return;
    }

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

  // disable the button if there is no account currently logged in
  if (getAccount() == undefined) { logoutBtn.disabled = true; }

  logoutBtn.addEventListener('click', () => {

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

  // use accname to determine whether the form is available
  if (accName == null) { return; }

  const currentlySelectedExpiry = Array.from(document.getElementsByClassName('expiryBtn__selected'));
  currentlySelectedExpiry.forEach(element => {
    element.classList.remove('expiryBtn__selected');
  });
}

function submitForm() {
  const form = document.getElementById('accountBar');
  form.submit();
}

// todo display user account information when logged in
function displayAccountInfo() {
  const accountsBar = document.getElementById('accountBar');

  // const userCreationDate = 
  //const test = document.createElement('h1');
  //test.textContent = "hello";
  //accountsBar.appendChild(test);
}

loadUserFromCookies();
expiryDaysDetection();
loginDetection();
logoutDectection();
