const youhodlerStaking = require("./exchanges/youhodler");
const nexoStaking = require("./exchanges/nexo");


const getAllStakings = async () => {
  try {
    const [youhodler, nexo] = await Promise.all([
      youhodlerStaking(),
      nexoStaking(),
    ]);
    console.log("youhodler response", youhodler);
    console.log("nexo response", nexo);
    return [...youhodler, ...nexo];
  } catch (error) {
    console.error("error", error);
  }
};

/**
 * @type {import('@types/aws-lambda').APIGatewayProxyHandler}
 */
const handler = async () => {
  const [allStakings] = await Promise.all([
    getAllStakings(),
  ])
  console.log("allStakings", JSON.stringify(allStakings, null, 2));
  return {
    statusCode: 200,
    //  Uncomment below to enable CORS requests
    //  headers: {
    //      "Access-Control-Allow-Origin": "*",
    //      "Access-Control-Allow-Headers": "*"
    //  },
    body: JSON.stringify("Successfully finished!"),
  };
};

handler();