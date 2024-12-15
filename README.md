# Medical Spa Analysis System

A comprehensive system for analyzing medical spa customer reviews, providing sentiment analysis, category classification, and actionable insights.

## Project Overview

This application analyzes customer feedback from medical spas to help business owners understand customer sentiment, identify areas for improvement, and track performance metrics over time.

## Current Implementation Status

### Data Collection
- Currently using Reddit as initial data source
- Sample data structure implemented with 6 reviews
- Location and spa name extraction working
- Basic sentiment analysis implemented
- Category classification operational

### Analysis Categories
| Category | Description | Source |
|----------|-------------|---------|
| Booking & Scheduling | Appointment processes, availability, scheduling systems | BINDY BLOG |
| Pricing Transparency | Pricing clarity, hidden fees, cost structures | DJ HOLT LAW |
| Treatment Outcomes | Results, expectations, satisfaction levels | DJ HOLT LAW |
| Aftercare Support | Post-treatment care, follow-up communication | ELEVATED PRACTICE |
| Staff Professionalism | Staff behavior, expertise, customer service | ELEVATED PRACTICE |
| Facility Environment | Cleanliness, ambiance, overall experience | ELEVATED PRACTICE |

### Data Sources Strategy

| Source Type | Specific Sources | Access Method |
|-------------|-----------------|----------------|
| Review Platforms | - Yelp<br>- Google Reviews<br>- RealSelf | - Yelp API<br>- Google Places API<br>- Web Scraping |
| Social Media | - Instagram<br>- Reddit<br>- Twitter | - Platform APIs |
| Industry Reports | - AmSpa<br>- ISPA | - Manual Collection |

## Project Structure

\`\`\`
src/
├── components/           # React UI components
│   ├── common/          # Shared components
│   ├── layout/          # Layout components
│   ├── metrics/         # Analytics display components
│   └── reviews/         # Review display components
├── services/            # Core business logic
│   ├── analysis/        # Analysis services
│   │   ├── sentiment/   # Sentiment analysis
│   │   └── category/    # Category classification
│   ├── dataCollection/  # Data collection services
│   │   └── reddit/      # Reddit integration
│   ├── database/        # Database services
│   └── reporting/       # Report generation
├── utils/               # Utility functions
├── config/             # Configuration files
└── scripts/            # Utility scripts
\`\`\`

## Current Features

### 1. Data Collection
- Reddit data scraping with location extraction
- Spa name identification
- Automated category classification
- Sentiment analysis

### 2. Analysis
- Sentiment classification (positive/negative/neutral)
- Category classification
- Location-based grouping
- Spa-specific analysis

### 3. Visualization
- Overview metrics
- Sentiment distribution pie chart
- Category distribution pie chart
- Detailed review listing

## Development Guidelines

### Code Organization
- Small, focused files
- Clear separation of concerns
- Modular architecture
- Comprehensive error handling

### Data Processing Pipeline
1. Data Collection (Reddit)
2. Text Processing
3. Location/Spa Extraction
4. Sentiment Analysis
5. Category Classification
6. Report Generation

## Next Steps

### 1. Data Collection Enhancement
- Implement rate limiting for Reddit API
- Add error recovery mechanisms
- Expand to additional subreddits
- Validate and clean data

### 2. Analysis Improvements
- Enhance sentiment analysis accuracy
- Refine category classification
- Add trend analysis
- Implement competitor tracking

### 3. Feature Additions
- Location-based insights
- Competitor analysis
- Custom report generation
- Historical trend analysis

## Getting Started

1. Install dependencies:
\`\`\`bash
npm install
\`\`\`

2. Start development server:
\`\`\`bash
npm run dev
\`\`\`

3. Run tests:
\`\`\`bash
npm test
\`\`\`

## Contributing

1. Follow code organization guidelines
2. Write tests for new features
3. Update documentation
4. Submit pull requests

## License

MIT License - See LICENSE file for details