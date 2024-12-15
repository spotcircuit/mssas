import axios from 'axios';
import { nanoid } from 'nanoid';
import { logger } from '../../utils/logger.js';
import { REDDIT_CONFIG } from './config.js';

class RedditScraper {
  constructor() {
    this.client = axios.create({
      baseURL: 'https://www.reddit.com',
      headers: {
        'User-Agent': 'Mozilla/5.0 (compatible; MedicalSpaAnalysis/1.0)',
        'Accept': 'application/json'
      }
    });
    this.processedUrls = new Set();
  }

  async scrapeReviews(subredditType) {
    const config = REDDIT_CONFIG[subredditType];
    if (!config) {
      logger.error(`Invalid subreddit type: ${subredditType}`);
      return [];
    }

    logger.info(`Collecting reviews from r/${config.subreddit}...`);
    let allReviews = [];
    let after = null;
    let timeRange = 'month';

    while (allReviews.length < 100) {
      try {
        const response = await this.client.get(`/r/${config.subreddit}/search.json`, {
          params: {
            ...config.searchParams,
            after,
            t: timeRange
          }
        });

        const posts = response.data?.data?.children || [];
        if (posts.length === 0) {
          if (timeRange === 'month') {
            timeRange = 'year';
            logger.info('Expanded time range to: year');
            after = null;
            continue;
          }
          if (timeRange === 'year') {
            timeRange = 'all';
            logger.info('Expanded time range to: all');
            after = null;
            continue;
          }
          break;
        }

        after = response.data?.data?.after;
        const validReviews = this.processReviews(posts);
        allReviews = [...allReviews, ...validReviews];
        
        logger.info(`Found ${validReviews.length} valid reviews from current batch. Total: ${allReviews.length}`);

        if (!after) break;

        // Add a small delay between requests
        await new Promise(resolve => setTimeout(resolve, 1000));
      } catch (error) {
        logger.error('Error fetching Reddit posts:', error);
        break;
      }
    }

    return allReviews;
  }

  processReviews(posts) {
    return posts
      .map(post => this.processPost(post))
      .filter(Boolean)
      .filter(review => !this.processedUrls.has(review.url));
  }

  processPost(post) {
    try {
      const data = post.data;
      const fullText = `${data.title} ${data.selftext}`;
      
      const locationInfo = this.extractLocation(fullText);
      const spaInfo = this.extractSpaName(fullText);

      if (!locationInfo || !spaInfo) return null;

      const review = {
        id: nanoid(),
        platform: 'reddit',
        title: data.title,
        text: data.selftext,
        date: new Date(data.created_utc * 1000).toISOString(),
        userId: data.author,
        url: `https://reddit.com${data.permalink}`,
        subreddit: data.subreddit,
        upvotes: data.ups,
        commentCount: data.num_comments,
        ...locationInfo,
        ...spaInfo
      };

      this.processedUrls.add(review.url);
      return review;
    } catch (error) {
      logger.error('Error processing post:', error);
      return null;
    }
  }

  extractLocation(text) {
    const match = text.match(/(?:in|at|near)\s+([A-Z][a-zA-Z\s]+),\s*([A-Z]{2})/i);
    return match ? {
      city: match[1].trim(),
      state: match[2].toUpperCase()
    } : null;
  }

  extractSpaName(text) {
    const match = text.match(/(?:at|visited)\s+([A-Z][a-zA-Z\s]*(?:Med[ical]?\s*Spa|Spa|Clinic|Center))/i);
    return match ? {
      spaName: match[1].trim()
    } : null;
  }
}

export default new RedditScraper();