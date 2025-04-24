# Indian Stock Market Heatmap PRD

## Executive Summary

The "Indian Stock Market Heatmap" is a web application that provides visual representations of stock performance metrics for companies listed on the Indian National Stock Exchange (NSE). The application focuses on the Nifty 50 and Nifty Next 50 indices, displaying key metrics through color-coded heatmaps. Built with Django and HTMX, this minimalist platform targets retail investors and financial enthusiasts who want a quick, visual overview of market performance without complex analysis tools.

**Business Objectives:**
- Deliver a simple, visually effective way to monitor Indian stock market performance
- Target retail investors and financial enthusiasts seeking passive information consumption
- Monetize through Google Ads integration
- Maintain low operational costs through efficient architecture and Heroku deployment

## Current State of Development

The application has completed several key development phases:

1. **Project Setup & Core Configuration**
   - Django project structure established
   - Development and production environments configured
   - Git repository initialized
   - Deployment setup with Heroku configuration (Procfile, runtime.txt)

2. **Data Modeling & Database Implementation**
   - Core models created: Index, Stock, DailyMetric
   - Database migrations established
   - Admin interfaces for data management configured

3. **Data Sourcing & Processing**
   - Management commands for seeding initial stock and index data
   - Data refresh functionality implemented using yfinance API
   - Error handling and logging mechanisms established

4. **Basic UI & Backend Framework**
   - URL routing configured
   - View functions for retrieving and displaying stock data
   - Template structure established

## Core Features

1. **Index-Based Heatmaps**
   - Visual grid displays of stocks grouped by index (Nifty 50, Nifty Next 50)
   - Color-coded cells representing performance metrics (price change %)
   - Simple, intuitive visual representation of market trends

2. **Interactive Stock Information**
   - HTMX-powered tooltips showing detailed metrics on hover
   - Real-time metric display without page refreshes
   - Metrics include: Price change (%), Volume change (%), P/E ratio, Market Cap

3. **Automated Data Updates**
   - Daily stock data fetched from Yahoo Finance via yfinance
   - Metrics calculated and stored in PostgreSQL database
   - Manual trigger for data refreshes (future: scheduled updates)

4. **Responsive Design**
   - Mobile-friendly interface using Vanilla CSS
   - Optimized layouts for various screen sizes
   - No reliance on heavy CSS frameworks

5. **Monetization**
   - Google Ads integration in strategic page locations
   - Non-intrusive ad placements preserving user experience

## Technology Stack

- **Frontend**: HTML5, Vanilla CSS3, HTMX for interactivity
- **Backend**: Python 3.11+, Django 4.2+ (LTS)
- **Data Processing**: yfinance, pandas
- **Database**: PostgreSQL (via Heroku Postgres)
- **Deployment**: Heroku (Free/Hobby tier initially)

## Target Users

1. **Retail Investors** seeking a quick overview of market performance
2. **Financial Enthusiasts** interested in daily market trends
3. **Passive Monitors** who want simple visual cues rather than complex analytics

## Current Limitations

- Manual data refresh process (not automated)
- Limited to Nifty 50 and Nifty Next 50 indices
- Basic visualization without advanced filtering or customization
- Free/Hobby tier Heroku constraints (dyno sleeping, performance limitations)

## 12-Month Roadmap

### Q1: Refinement & Stability (Months 1-3)

1. **Production Deployment & Optimization**
   - Complete styling and responsive design implementation
   - Fine-tune database queries for performance
   - Implement proper error handling and monitoring
   - Set up comprehensive logging system

2. **User Experience Improvements**
   - Enhance visual design and color schemes
   - Optimize tooltip behavior and positioning
   - Improve mobile responsiveness
   - Implement basic analytics to track user behavior

3. **Data Refresh Automation**
   - Implement scheduled data updates using Heroku Scheduler
   - Add validation checks for data quality
   - Enhance error recovery mechanisms

### Q2: Feature Expansion (Months 4-6)

1. **Sectoral Heatmaps**
   - Add industry/sector categorization
   - Create sector-based views and filtering
   - Implement sector performance aggregation

2. **Historical Data Views**
   - Store historical metrics (within database limits)
   - Add date selector for viewing past heatmaps
   - Implement basic trend indicators (day-to-day changes)

3. **Enhanced Metrics**
   - Add more performance indicators
   - Include trading volumes visualization
   - Display relative sector performance

### Q3: User Engagement (Months 7-9)

1. **User Accounts (Optional)**
   - Implement basic user registration/login
   - Allow creation of personalized watchlists
   - Store user preferences for views/metrics

2. **Email Alerts**
   - Create option for daily market summary emails
   - Implement significant change notifications
   - Develop weekly digest of market performance

3. **Social Sharing**
   - Add ability to share heatmap snapshots
   - Implement link generation for specific views
   - Create embeddable widgets for other sites

### Q4: Scaling & Monetization (Months 10-12)

1. **Infrastructure Scaling**
   - Evaluate and upgrade Heroku tier if needed
   - Implement caching for improved performance
   - Optimize database for larger datasets

2. **Advanced Monetization**
   - Refine ad placements based on user behavior
   - Explore premium features for subscription model
   - Investigate potential partnerships or API usage

3. **Index Expansion**
   - Add support for additional indices (Nifty Midcap, Smallcap)
   - Implement comparison views between indices
   - Add international market benchmarks for reference

## Success Metrics

1. **Traffic Targets**
   - 100 daily active users by end of Q1
   - 500 daily active users by end of Q2
   - 2,000 daily active users by end of year

2. **Performance Metrics**
   - Page load time under 2 seconds
   - Tooltip response time under 200ms
   - Data refresh completion under 3 minutes

3. **Business Metrics**
   - Break-even on hosting costs through ad revenue by Q3
   - Positive ROI on development costs by end of year
   - <5% bounce rate on primary heatmap pages

## Resource Requirements

1. **Development**
   - 1 Backend Developer (part-time)
   - 1 Frontend/UI Developer (part-time consultant)
   - QA testing resources (as needed)

2. **Infrastructure**
   - Heroku Hobby Dyno initially, Standard-1X by Q3
   - Heroku Postgres Hobby initially, Standard-0 by Q4
   - Additional add-ons for monitoring as needed

3. **Marketing/Outreach**
   - Social media presence in financial communities
   - Partnership with 1-2 financial blogs for exposure
   - Basic SEO optimization efforts

## Risks & Mitigation

1. **Data Source Reliability**
   - **Risk**: Yahoo Finance API changes or rate limiting
   - **Mitigation**: Implement redundant data sources, caching, and graceful fallbacks

2. **Scalability Constraints**
   - **Risk**: Heroku free/hobby tier limitations as user base grows
   - **Mitigation**: Proactive monitoring and planned tier upgrades

3. **Ad Revenue Uncertainty**
   - **Risk**: Lower than expected ad performance
   - **Mitigation**: A/B testing ad placements, exploring alternative monetization

4. **Regulatory Compliance**
   - **Risk**: Financial data display regulations
   - **Mitigation**: Clear disclaimers, data source attribution, no investment advice

## Conclusion

The Indian Stock Market Heatmap delivers a streamlined, visual approach to monitoring market performance for retail investors. With its minimalist design and focus on essential metrics, it offers a unique value proposition in the financial information space. The roadmap ensures steady development from the current MVP to a more feature-rich platform while maintaining the core principles of simplicity and visual clarity.

By focusing on user experience and gradually expanding features based on actual usage patterns, the application aims to build a loyal user base and establish itself as a useful tool in the Indian stock market information ecosystem. 