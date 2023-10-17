import { loadUserPages, createPageBtn } from "../pages.js";

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
  if (parts.length === 2) {
    return parts.pop().split(';').shift();
  }
}

export async function loadUserFromCookies() {
  const accountBtn = document.getElementById('accountBtn');
  const account    = getAccount();

  // check if there is an account stored
  if (account === undefined) {
    accountBtn.textContent = 'Account';
    return;
  }

  // decode the users data
  const userData = JSON.parse(decodeURIComponent(account));

  accountBtn.textContent = userData.name;
  await loadUserPages(userData.id);
  new createPageBtn();
}
