
import { getPageMetadata } from '@/config/metadata';
import LoginClient from './loginClient';


// This runs on the server
export const generateMetadata = () => {
  return getPageMetadata('Sign In');
};

export default function Login() {
  return <LoginClient />;
}