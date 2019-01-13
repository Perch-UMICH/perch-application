import { logoutCurrentUser } from '../../../backend/index';

/* 
  logs out current user and redirects to home page 
*/
export default function() {
  logoutCurrentUser();
  window.location.href='/'
}