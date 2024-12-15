import { logger } from './utils/logger.js';
import redditScraper from './services/dataCollection/reddit/redditScraper.js';
import reviewAnalyzer from './services/analysis/analyzer.js';
import insightGenerator from './services/reporting/insightGenerator.js';

async function main() {
  try {
    logger.info('Starting Medical Spa Analysis System...');

    // Get reviews from Reddit
    const reviews = await redditScraper.collectReviews();
    logger.info(`Processing ${reviews.length} reviews...`);
    
    // Analyze reviews
    const analyzedReviews = reviewAnalyzer.analyzeReviews(reviews);
    
    // Generate report
    const report = insightGenerator.generateSummaryReport(analyzedReviews);
    
    logger.info('Analysis Results:', {
      totalReviews: report.totalReviews,
      sentimentDistribution: report.sentimentDistribution,
      categoryBreakdown: report.categoryBreakdown,
      sentimentPercentages: report.sentimentPercentages,
      categoryPercentages: report.categoryPercentages
    });
  } catch (error) {
    logger.error('Error running analysis:', error);
  }
}

main();