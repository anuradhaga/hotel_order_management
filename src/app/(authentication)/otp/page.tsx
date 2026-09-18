import { getPageMetadata } from "@/config/metadata";
import OtpClient from "./otpClient";
// This runs on the server
export const generateMetadata = () => {
  return getPageMetadata('Otp');
};
export default function Otp(){
    return(
        <><OtpClient/></>
    )
}