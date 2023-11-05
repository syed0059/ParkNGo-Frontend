import address from "../../../carparkManager/localHostAddress";

const localhost = address + ":3000/search/trend/";

export default getTrend = async (carparkID) => {
  let data;
  data = await fetch(localhost + carparkID);
  data = await data.json();
  return data;
};
