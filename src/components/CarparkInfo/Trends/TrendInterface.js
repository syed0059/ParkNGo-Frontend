import address from "../../../carparkManager/localHostAddress";

const localhost = address + ":3000/trend/";

export default getTrend = async (carparkID) => {
  let data;
  console.log("getTrend using carparkID: " + carparkID);
  data = await fetch(localhost + carparkID);
  data = await data.json();
  return data;
};
