import { NetworkInfo } from "react-native-network-info";

let address;

NetworkInfo.getIPAddress()
  .then((ipAddress) => {
    console.log(ipAddress);
  })
  .catch((error) => {
    console.error("Error fetching IP address:", error);
  });

let temp = "http://192.168.1.92";
export default temp;
