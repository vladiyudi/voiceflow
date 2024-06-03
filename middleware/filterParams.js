const {
  filterData,
  parsePropertyDetails,
} = require("../Service/serviceFuntions");

const filterByClientsParams = (req, res, next) => {
  let { clientSelection, realEstateDB } = req.body;

  // clientSelection = typeof clientSelection === 'object' ? clientSelection : JSON.parse(clientSelection);


  clientSelection = { "goal": ["buy", "house"], "budget": [800000, 900000], "criteria": [ {"rooms": 4}, {"bathrooms": 4} ] }

  const properlyTaggedProperties = realEstateDB.columns.Tags.map(
    (tag, i) => {
      const fixed = parsePropertyDetails(tag);
      fixed.Answers = realEstateDB.columns.Answers[i];
      fixed.Photo = realEstateDB.columns.Photo[i];
      return fixed;
    }
  );


  req.body.filteredProperties = filterData(
    properlyTaggedProperties,
    clientSelection.budget,
    clientSelection.criteria[0],
    clientSelection.criteria[1]
  );

  next();
};

module.exports = filterByClientsParams;
