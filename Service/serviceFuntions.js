function filterData(data, priceParams, bedroomsParams, bathroomsParams) {
    const matchingData = [];

    data.forEach((item,i) => {

        if (item.hasOwnProperty('price') && item.hasOwnProperty('bedrooms') && item.hasOwnProperty('bathrooms')) {
            // Convert price to number if it's a string
            const price = typeof item.price === 'string' ? parseFloat(item.price) : item.price;
            
            // Check if price is within the specified range
            if (!isNaN(price) && price >= priceParams[0] && price <= priceParams[1]) {
                // Check if bedrooms and bathrooms match exactly
                if (item.bedrooms === bedroomsParams.rooms && item.bathrooms === bathroomsParams.bathrooms) {
                    matchingData.push(item);
                }
            }
        }
    });

    return matchingData;
}


function parsePropertyDetails(inputString) {
    const propertyDetails = {
      price: null,
      location: null,
      type: null,
      bedrooms: null,
      bathrooms: null,
      size: {
        buildingArea: null,
        landArea: null,
      },
      constructionStatus: {
        percentageComplete: null,
        completionDate: null,
      },
      additionalInfo: {
        floor: null,
        leaseholdTerm: null,
        designStyle: null,
        inUnitAmenities: null,
        views: null,
        proximityToAmenities: null,
        furnishing: null,
      },
    };
  
    // Regular expressions to extract information
    const priceRegex = /Price:\s*\$([\d,]+)/i;
    const locationRegex = /Location:\s*(https:\/\/goo\.gl\/maps\/[^\s]+)/i;
    const typeRegex = /Type:\s*(.+)/i;
    const bedroomsRegex = /Number of Bedrooms:\s*(\d+)/i;
    const bathroomsRegex = /Number of Bathrooms:\s*(\d+)/i;
    const buildingAreaRegex = /Building area\),\s*([\d.]+)\s*sq m/i;
    const landAreaRegex = /Land area\),\s*([\d.]+)\s*sq m/i;
    const constructionStatusRegex =
      /Construction Status:\s*([\d.]+)% complete, Completion expected in (.+)/i;
    const floorRegex = /Floor:\s*(\d+)/i;
    const leaseholdTermRegex = /Leasehold Term:\s*(\d+ years .+)/i;
    const designStyleRegex = /Design\/Style:\s*(.*)/i;
    const inUnitAmenitiesRegex = /In-Unit Amenities:\s*(.*)/i;
    const viewsRegex = /Views:\s*(.*)/i;
    const proximityToAmenitiesRegex = /Proximity to Amenities:\s*(.*)/i;
    const furnishingRegex = /Furnishing:\s*(.*)/i;
  
    // Extract and assign values
    propertyDetails.price =
      inputString.match(priceRegex)?.[1]?.replace(/,/g, "") || null;
    propertyDetails.location = inputString.match(locationRegex)?.[1] || null;
    propertyDetails.type = inputString.match(typeRegex)?.[1] || null;
    propertyDetails.bedrooms =
      parseInt(inputString.match(bedroomsRegex)?.[1]) || null;
    propertyDetails.bathrooms =
      parseInt(inputString.match(bathroomsRegex)?.[1]) || null;
    propertyDetails.size.buildingArea =
      parseFloat(inputString.match(buildingAreaRegex)?.[1]) || null;
    propertyDetails.size.landArea =
      parseFloat(inputString.match(landAreaRegex)?.[1]) || null;
    propertyDetails.constructionStatus.percentageComplete =
      parseFloat(inputString.match(constructionStatusRegex)?.[1]) || null;
    propertyDetails.constructionStatus.completionDate =
      inputString.match(constructionStatusRegex)?.[2] || null;
    propertyDetails.additionalInfo.floor =
      parseInt(inputString.match(floorRegex)?.[1]) || null;
    propertyDetails.additionalInfo.leaseholdTerm =
      inputString.match(leaseholdTermRegex)?.[1] || null;
    propertyDetails.additionalInfo.designStyle =
      inputString.match(designStyleRegex)?.[1] || null;
    propertyDetails.additionalInfo.inUnitAmenities =
      inputString.match(inUnitAmenitiesRegex)?.[1] || null;
    propertyDetails.additionalInfo.views =
      inputString.match(viewsRegex)?.[1] || null;
    propertyDetails.additionalInfo.proximityToAmenities =
      inputString.match(proximityToAmenitiesRegex)?.[1] || null;
    propertyDetails.additionalInfo.furnishing =
      inputString.match(furnishingRegex)?.[1] || null;
  
    return propertyDetails;
  }


module.exports = {filterData, parsePropertyDetails };