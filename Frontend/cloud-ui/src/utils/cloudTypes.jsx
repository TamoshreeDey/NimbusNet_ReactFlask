export const ccsn_cloudTypes = {
  'cirrus': {
    riskLevel: 'low',
    weatherImpact: 'Fair weather, high altitude ice crystals',
    typicalWeather: 'Clear skies, possible weather change in 24–48 hours',
    description: 'Thin, wispy clouds at high altitude'
  },
  'cirrocumulus': {
    riskLevel: 'low',
    weatherImpact: 'Generally fair weather',
    typicalWeather: 'Dry conditions, slight temperature variations',
    description: 'Small white patches in rows at high altitude'
  },
  'cirrostratus': {
    riskLevel: 'medium',
    weatherImpact: 'Approaching weather system',
    typicalWeather: 'Overcast skies, possible precipitation within 24 hours',
    description: 'Thin sheet-like clouds covering the sky'
  },
  'altocumulus': {
    riskLevel: 'medium',
    weatherImpact: 'Variable weather conditions',
    typicalWeather: 'Partly cloudy, possible afternoon thunderstorms',
    description: 'Gray or white patches in waves at middle altitude'
  },
  'altostratus': {
    riskLevel: 'medium',
    weatherImpact: 'Overcast conditions',
    typicalWeather: 'Gray skies, light rain or snow possible',
    description: 'Gray or blue-gray sheet covering the sky'
  },
  'nimbostratus': {
    riskLevel: 'high',
    weatherImpact: 'Continuous precipitation',
    typicalWeather: 'Steady rain or snow, poor visibility',
    description: 'Dark, thick clouds producing continuous rain or snow'
  },
  'cumulus': {
    riskLevel: 'low',
    weatherImpact: 'Fair weather conditions',
    typicalWeather: 'Pleasant weather, good visibility',
    description: 'Puffy white clouds with flat bases'
  },
  'cumulonimbus': {
    riskLevel: 'high',
    weatherImpact: 'Severe weather conditions',
    typicalWeather: 'Thunderstorms, heavy rain, hail, strong winds',
    description: 'Towering clouds producing severe weather'
  },
  'stratus': {
    riskLevel: 'medium',
    weatherImpact: 'Overcast with possible drizzle',
    typicalWeather: 'Gray skies, light drizzle, reduced visibility',
    description: 'Low, gray cloud layer covering the sky'
  },
  'stratocumulus': {
    riskLevel: 'medium',
    weatherImpact: 'Generally stable weather',
    typicalWeather: 'Cloudy skies, occasional light precipitation',
    description: 'Low, lumpy gray or white patches'
  },
  'contrails': {
    riskLevel: 'low',
    weatherImpact: 'Minimal; may indicate upper-air conditions',
    typicalWeather: 'Clear or fair weather; visible aircraft trails',
    description: 'Line-shaped clouds formed by aircraft at high altitudes'
  }
};
