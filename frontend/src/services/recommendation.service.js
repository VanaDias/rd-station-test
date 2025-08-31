// getRecommendations.js

const countPreferencesMatch = (product, selectedPreferences) => {
  let preferencesMatchCount = 0;
  selectedPreferences.forEach((preference) => {
      if (product.preferences.includes(preference)) {
        preferencesMatchCount += 1;
      }
    });
  return preferencesMatchCount;
};

const countFeaturesMatch = (product, selectedFeatures) => {
  let featuresMatchCount = 0;
  selectedFeatures.forEach((feature) => {
      if (product.features.includes(feature)) {
        featuresMatchCount += 1;
      }
    });
  return featuresMatchCount;
};


const getRecommendations = (
  formData = { selectedPreferences: [], selectedFeatures: [], selectedRecommendationType: '' },
  products
) => {
  const productsRank = products.map((product, index) => {
    product.originalIndex = index;
    product.matchScore = countFeaturesMatch(product, formData.selectedFeatures) +
                         countPreferencesMatch(product, formData.selectedPreferences);
    return product;
  }).filter(product => product.matchScore > 0);
  
  productsRank.sort((a, b) => b.matchScore - a.matchScore || b.originalIndex - a.originalIndex);

  if (formData.selectedRecommendationType === 'SingleProduct') return productsRank[0] ? [productsRank[0]] : [];
  return productsRank;
};

export default { getRecommendations };
