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
  if (parts.length === 2) return parts.pop().split(';').shift();
}

export async function loadUserFromCookies() {
  // todo change method of getting account name
  const account = document.getElementById('accountBtn');
  const accountName = getAccount();
  if (accountName == undefined) {
    account.textContent = 'Account';
    return;
  }
  account.textContent = accountName;
  await loadUserPages(account.textContent);
  new createPageBtn();
}
