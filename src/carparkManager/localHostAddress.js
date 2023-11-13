import { NetworkInfo } from "react-native-network-info";

let address;

NetworkInfo.getIPAddress()
  .then((ipAddress) => {
    console.log(ipAddress);
  })
  .catch((error) => {
    console.log("Error fetching IP address:", error);
  });

let temp = "http://192.168.10.101";
export default temp;
