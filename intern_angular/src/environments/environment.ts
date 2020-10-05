let domain = 'http://localhost:3000/';
export const environment = {
  production: false,
  signup: domain + 'user/signup',
  login: domain + 'user/login',
  getContacts: domain + 'contact/getContacts',
  addContact: domain + 'contact/addContact',
  deleteContact: domain + 'contact/deleteContact',
  updateContact: domain + 'contact/updateContact',
};
