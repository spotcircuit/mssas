export const REDDIT_CONFIG = {
  // Primary subreddits for medical spa reviews
  ESTHETICS: {
    subreddit: 'Esthetics',
    searchParams: {
      q: 'medical spa OR medspa OR med spa OR facial OR treatment',
      restrict_sr: true,
      sort: 'new',
      limit: 100,
      t: 'year'
    }
  },
  
  PLASTIC_SURGERY: {
    subreddit: 'PlasticSurgery',
    searchParams: {
      q: 'medical spa OR medspa OR med spa OR botox OR filler',
      restrict_sr: true,
      sort: 'new',
      limit: 100,
      t: 'year'
    }
  },

  MEDSPA: {
    subreddit: 'MedSpa',
    searchParams: {
      q: 'review OR experience OR treatment OR results',
      restrict_sr: true,
      sort: 'new',
      limit: 100,
      t: 'year'
    }
  }
};