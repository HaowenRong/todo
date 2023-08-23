/**
 * process
 * 
 * get account - accounts / local
 * - local = ''
 * go through pages and store each page
 * - go through pages with cookies
 * - store to cookies
 */

export class accountCookie {
  #cookie;
  constructor(json) {
    this.#cookie = JSON.stringify(json);
  }
  constructor(accountId='') {
    this.#cookie = {
      _id: accountId,
      pages: []
    }
  }
  addPage(page) {
    this.#cookie.push(page);
  }
}

function getPage() {
  const page = {
    
  }
  return page;
}

export function createCookie() {
  
  return initialCookie;
}

export function addPage(json, page) {
  json.pages.push(page);
}

export function getNodes() {
  
}
