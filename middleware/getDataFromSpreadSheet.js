const axios = require("axios");

const fetchFromSpreadSheet = async (req, res, next) => {
  const { spreadSheetUrl, spreadSheetId, sheet } = req.body;
  try {
    const response = await axios.get(
      `https://gsx2json.voiceflow.studio/api?id=1K_zPUnMsrlQOzPiMDsMZv2QN9TSZ141a-aUwlOaUyhA&sheet=Var_eng`
    );
    // const response = await axios.get(`${spreadSheetUrl}?id=${spreadSheetId}&sheet=${sheet}`);
    req.body.realEstateDB = response.data;
  } catch (error) {
    console.log("Error fetching data from spread sheet", error);
    res.status(500).send("Error fetching data from spread sheet");
  }
  next();
};

module.exports = fetchFromSpreadSheet;
