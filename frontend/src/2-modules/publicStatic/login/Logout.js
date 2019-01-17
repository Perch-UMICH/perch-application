import { logout } from '../../../backend/index';

/* 
  logs out current user and redirects to home page 
*/
export default function() {
  logout();
  window.location.href='/'
}