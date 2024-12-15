// Enhanced sentiment word lists with weights and contextual indicators
export const SENTIMENT_WORDS = {
  positive: {
    // Strong positive indicators (weight: 3)
    strong: {
      'love': 3,
      'amazing': 3,
      'excellent': 3,
      'fantastic': 3,
      'outstanding': 3,
      'perfect': 3,
      'exceptional': 3,
      'wonderful': 3,
      'brilliant': 3,
      'superb': 3,
      'thrilled': 3,
      'impressed': 3,
      'delighted': 3,
      'incredible': 3,
      'phenomenal': 3
    },
    // Moderate positive indicators (weight: 2)
    moderate: {
      'good': 2,
      'great': 2,
      'nice': 2,
      'helpful': 2,
      'professional': 2,
      'clean': 2,
      'friendly': 2,
      'satisfied': 2,
      'recommend': 2,
      'skilled': 2,
      'knowledgeable': 2,
      'comfortable': 2,
      'pleased': 2,
      'happy': 2,
      'gentle': 2,
      'thorough': 2,
      'caring': 2,
      'attentive': 2,
      'experienced': 2,
      'relaxing': 2
    },
    // Context-dependent positive phrases (weight: 4)
    phrases: [
      'highly recommend',
      'very professional',
      'great experience',
      'best decision',
      'exceeded expectations',
      'worth every penny',
      'definitely going back',
      'very happy with',
      'really pleased',
      'exactly what I wanted',
      'amazing results',
      'very knowledgeable',
      'extremely professional',
      'absolutely love',
      'highly skilled',
      'very thorough',
      'fantastic experience',
      'excellent service',
      'very satisfied',
      'would recommend'
    ]
  },
  negative: {
    // Strong negative indicators (weight: -3)
    strong: {
      'terrible': -3,
      'horrible': -3,
      'awful': -3,
      'worst': -3,
      'disappointed': -3,
      'unprofessional': -3,
      'rude': -3,
      'avoid': -3,
      'waste': -3,
      'regret': -3,
      'incompetent': -3,
      'painful': -3,
      'disaster': -3,
      'horrific': -3,
      'inexperienced': -3
    },
    // Moderate negative indicators (weight: -2)
    moderate: {
      'bad': -2,
      'poor': -2,
      'mediocre': -2,
      'overpriced': -2,
      'expensive': -2,
      'dirty': -2,
      'slow': -2,
      'unclear': -2,
      'unhappy': -2,
      'uncomfortable': -2,
      'rushed': -2,
      'pushy': -2,
      'unfriendly': -2,
      'unclean': -2,
      'disorganized': -2,
      'careless': -2,
      'unhelpful': -2,
      'frustrating': -2,
      'dissatisfied': -2,
      'unprepared': -2
    },
    // Context-dependent negative phrases (weight: -4)
    phrases: [
      'would not recommend',
      'not worth',
      'very disappointed',
      'waste of money',
      'never going back',
      'stay away',
      'not happy with',
      'left feeling',
      'could have been better',
      'not what I expected',
      'extremely unprofessional',
      'complete waste',
      'very rude',
      'totally incompetent',
      'absolutely terrible',
      'highly disappointed',
      'worst experience',
      'extremely painful',
      'very uncomfortable',
      'would never return'
    ]
  },
  // Modifiers that can affect sentiment
  modifiers: {
    intensifiers: {
      'very': 1.5,
      'really': 1.5,
      'extremely': 2,
      'highly': 1.5,
      'absolutely': 2,
      'completely': 1.5,
      'totally': 1.5,
      'definitely': 1.5,
      'always': 1.5,
      'super': 1.5
    },
    diminishers: {
      'somewhat': 0.5,
      'kind of': 0.5,
      'sort of': 0.5,
      'a bit': 0.5,
      'slightly': 0.5,
      'maybe': 0.5,
      'occasionally': 0.5,
      'sometimes': 0.5
    },
    negators: [
      'not',
      'never',
      'no',
      'nothing',
      'neither',
      'nor',
      'none',
      "don't",
      "doesn't",
      "didn't",
      "wasn't",
      "weren't",
      "isn't",
      "aren't"
    ]
  },
  // Words that typically indicate neutral sentiment
  neutral: [
    'okay',
    'average',
    'decent',
    'fine',
    'standard',
    'typical',
    'expected',
    'normal',
    'basic',
    'regular',
    'moderate',
    'fair',
    'ordinary',
    'routine',
    'usual'
  ]
};