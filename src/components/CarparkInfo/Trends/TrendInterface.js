import { REACT_APP_LOCAL_IP } from "@env"

const localhost = String(REACT_APP_LOCAL_IP) + ":3000/trend/";

export default getTrend = async (carparkID) => {
  let data;
  console.log("getTrend using carparkID: " + carparkID);
  data = await fetch(localhost + carparkID);
  data = await data.json();
  return data;
};
