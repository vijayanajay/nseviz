# Indian Stock Market Heatmap: Frontend Design Specification

## Implementation Status


## 1. Global Design System

### Component Implementation Progress

| Component              | Status      | CSS File        | Notes                                    |
|------------------------|-------------|-----------------|------------------------------------------|
| Color Variables        | Pending | base.css        | All color variables implemented          |
| Typography System      | Pending | base.css        | Font families, sizes, weights defined    |
| Spacing System         | Pending| base.css        | 8px base unit with multipliers           |
| Heatmap Cell           | Pending| components.css  | All states and color variants            |
| Tooltip                | Pending| components.css  | Complete with advanced positioning       |
| Navbar                 | Pending| components.css  | Basic implementation                     |
| Card                   | Pending| components.css  | Basic implementation                     |
| Error Container        | Pending| components.css  | All variants implemented                 |
| Treemap                | Pending| components.css  | Complete implementation                  |
| Pill/Tag               | Pending| components.css  | Active, inactive, disabled states        |
| Tabs                   | Pending| components.css  | Horizontal and vertical variants         |
| Accordion              | Pending| components.css  | Expand/collapse with animation           |
| Index Selector         | Pending| components.css  | Segmented control with HTMX integration |
| Date Picker            | Pending| components.css  | Calendar overlay with focus states       |
| Ad Slot                | Pending| components.css  | Responsive sizes for all viewports       |
| Grid Layout            | Pending| layouts.css     | 12-column system with responsive design  |
| Snapshot Cards Layout  | Pending| layouts.css     | Desktop 3-up & mobile carousel          |
| Mobile Sheet Modal     | Pending| layouts.css     | Mobile-specific bottom sheet            |
| Mobile Navigation      | Pending| layouts.css     | Bottom fixed navigation for mobile      |
| Sector View            | Pending| components.css, layouts.css | Complete with tabs, cards, chart |
| Media Queries          | Pending| All files       | Consistent breakpoints                   |
| Dark Mode              | Pending| dark-mode.css   | Auto & manual modes                      |
| Header & Footer        | Pending| components.css  | Responsive implementation complete      |
| Performance Optimizations | Pending| All files    | Critical CSS, caching, service worker   |

### Color Palette (AA Contrast Compliant)

| Purpose    | Color Code | Usage                                       |
|------------|------------|---------------------------------------------|
| Neutral    | #FFFFFF   | Background                                  |
|            | #F5F7FA   | Cards, Secondary Surfaces                   |
|            | #0F1419   | Primary Text                                |
|            | #64748B   | Secondary Text                              |
| Positive   | #0E9F6E   | Positive Price Change (≥ 0%)                |
| Negative   | #E02424   | Negative Price Change (< 0%)                |
| Accent     | #2563EB   | Links, CTAs, Active States                  |
| Warning    | #F59E0B   | Data Fetch Errors, Stale Data Indicators    |
| Grid Cell  | Dynamic   | Interpolated HSL values based on % change:  |
|            |           | - Deep Red (#E02424): < -3%                 |
|            |           | - Mid Red (#EF4444): -1% to -3%             |
|            |           | - Light Red (#F87171): 0% to -1%            |
|            |           | - Light Green (#34D399): 0% to +1%          |
|            |           | - Mid Green (#10B981): +1% to +3%           |
|            |           | - Deep Green (#059669): > +3%               |

### Typography

| Element    | Font                   | Weight | Size  | Line Height |
|------------|------------------------|--------|-------|-------------|
| Headlines  | Inter (woff2)          | 700    | 32px  | 1.2         |
| Subheadings| Inter                  | 600    | 24px  | 1.3         |
| Section Titles | Inter              | 600    | 20px  | 1.4         |
| Body       | Inter                  | 400    | 16px  | 1.5         |
| Small Text | Inter                  | 400    | 14px  | 1.5         |
| Data Tables| JetBrains Mono         | 400    | 14px  | 1.4         |
| Tooltips   | Inter                  | 400    | 14px  | 1.4         |
| Ticker Symbols | JetBrains Mono     | 700    | 16px  | 1.2         |
| Percentage Changes | JetBrains Mono | 700    | 16px  | 1.2         |

### Spacing & Grid System

- **Base Unit**: 8px
- **Page Padding**: 
  - Desktop: 32px
  - Tablet: 24px
  - Mobile: 16px

- **Grid System**:
  - **Desktop (≥1024px)**: 12-column fluid grid with 24px gutters
  - **Tablet (640-1023px)**: 8-column grid or 2-column stack with 16px gutters
  - **Mobile (<640px)**: Single column with 16px padding

- **Responsive Breakpoints**:
  - Small: 640px
  - Medium: 768px
  - Large: 1024px
  - XL: 1280px
  - 2XL: 1536px

### Component Library

#### 1. Navbar
- Height: 64px
- Background: #FFFFFF
- Box Shadow: 0 1px 3px rgba(0,0,0,0.1)
- Contains: Logo, Navigation Links, Date Display

#### 2. Heatmap Cell
- Dimensions: Responsive (min 80px × 80px on desktop, 60px × 60px on mobile)
- Border Radius: 4px
- Padding: 12px
- Content: Ticker Symbol (top), Company Name (small, bottom)
- Background: Dynamic color based on price change %
- Hover State: Slightly elevated shadow, increased brightness
- Accessibility: Color and text contrast must maintain AA compliance

#### 3. Tooltip
- Width: Max 280px on desktop, adaptive on mobile
- Background: #FFFFFF
- Border Radius: 8px
- Border: 1px solid rgba(0,0,0,0.1)
- Box Shadow: 0 4px 6px -1px rgba(0,0,0,0.1)
- Padding: 16px
- Content Structure:
  ```
  Company Name (Bold)                Price Change (±X.XX%)
  Current Price: ₹XXXX.XX
  Volume: X.XX M (±XX% vs prev day)
  P/E Ratio: XX.X
  Market Cap: ₹X.XX T
  ```
- Position: Above cell on hover (desktop), modal sheet on tap (mobile)

#### 4. Card
- Background: #FFFFFF
- Border Radius: 8px
- Box Shadow: 0 1px 3px rgba(0,0,0,0.08)
- Padding: 16px
- Header: 16px bottom padding, border-bottom 1px solid #F5F7FA
- Hover State: Box shadow increased to 0 4px 6px rgba(0,0,0,0.08)

#### 5. Pill/Tag
- Height: 32px
- Padding: 4px 12px
- Border Radius: 16px
- Font: Inter 14px
- Background (Default): #F5F7FA
- Background (Active): #2563EB
- Text Color (Default): #0F1419
- Text Color (Active): #FFFFFF

#### 6. Tabs
- Height: 48px
- Border Bottom: 1px solid #F5F7FA
- Active Tab: Border bottom 3px solid #2563EB
- Font: Inter 16px
- Padding: 0 16px

#### 7. Accordion
- Header Height: 56px
- Padding: 16px
- Border: 1px solid #F5F7FA
- Border Radius: 8px
- Icon: Chevron rotating 180° when expanded
- Content Padding: 16px

#### 8. Ad Slot Placeholder
- Background: #F5F7FA
- Border: 1px dashed #64748B
- Border Radius: 8px
- Label: "Advertisement" in #64748B, 12px
- Sizes:
  - Desktop: 728×90, 300×250
  - Tablet: 468×60
  - Mobile: 320×50

#### 9. Index Selector
- Type: Segmented Control
- Height: 40px
- Options: "Nifty 50" | "Nifty Next 50"
- Active State: Background #2563EB, Text #FFFFFF
- Inactive State: Background #F5F7FA, Text #0F1419
- Implementation Details:
  - HTMX integration for filtering heatmap content via AJAX
  - Animated transition for active indicator
  - Full keyboard navigation support (Arrow keys, Space, Enter)
  - ARIA roles and attributes for accessibility
  - Loading indicator for AJAX requests
  - Mobile-optimized touch targets
  - Integration with sticky bottom bar on mobile devices

#### 10. Date Picker
- Height: 40px
- Border: 1px solid #F5F7FA
- Border Radius: 8px
- Icon: Calendar
- Format: DD MMM YYYY
- Dropdown Calendar: 7×7 grid, current day highlighted

## 2. Site Map & Page-by-Page Layout

### 2.1 Home Page ("/")

```
┌─────────────────────────────────────────────────────────┐
│ [Logo] Indian Stock Market Heatmap         [Date] [Ad ] │
├─────────────────────────────────────────────────────────┤
│ ┌───────────────────────────────────────────────────┐   │
│ │  Nifty 50  │  Nifty Next 50                       │   │
│ └───────────────────────────────────────────────────┘   │
│                                                         │
│ Today's Pulse of the Indian Markets                     │
│ A zero-clutter heatmap of NSE stocks, updated daily.    │
│                                                         │
│ [Last Updated: HH:MM IST]           [Refresh]           │
│                                                         │
│ ┌─────────────────────────────────────────────────────┐ │
│ │                  HEATMAP GRID                       │ │
│ │  ┌────┐ ┌────┐ ┌────┐ ┌────┐ ┌────┐ ┌────┐         │ │
│ │  │RELI│ │TCS │ │HDFC│ │INFY│ │ITC │ │SBIN│   ...   │ │
│ │  └────┘ └────┘ └────┘ └────┘ └────┘ └────┘         │ │
│ │  ┌────┐ ┌────┐ ┌────┐ ┌────┐ ┌────┐ ┌────┐         │ │
│ │  │ICBK│ │HUL │ │AXIS│ │LT  │ │BAJF│ │M&M │   ...   │ │
│ │  └────┘ └────┘ └────┘ └────┘ └────┘ └────┘         │ │
│ │                                                     │ │
│ │                   ...                               │ │
│ └─────────────────────────────────────────────────────┘ │
│                                                         │
│ ┌────────────┐  ┌────────────┐  ┌────────────┐         │
│ │ TOP GAINERS│  │ TOP LOSERS │  │MOST ACTIVE │         │
│ │ 1. XXX +x% │  │ 1. XXX -x% │  │ 1. XXX vol │         │
│ │ 2. XXX +x% │  │ 2. XXX -x% │  │ 2. XXX vol │         │
│ │ 3. XXX +x% │  │ 3. XXX -x% │  │ 3. XXX vol │         │
│ └────────────┘  └────────────┘  └────────────┘         │
│                                                         │
│ ┌─────────────────────────────────────────────────────┐ │
│ │                   ADVERTISEMENT                      │ │
│ └─────────────────────────────────────────────────────┘ │
│                                                         │
│ Data sourced from Yahoo Finance | Updated daily         │
│ Disclaimer | Methodology | Feedback                     │
└─────────────────────────────────────────────────────────┘
```

**Key Copy:**
- H1: "Today's Pulse of the Indian Markets"
- Subheading: "A zero-clutter heatmap of NSE stocks, updated daily."
- CTA: "Switch to Nifty Next 50"
- Footer: "Data refreshed daily at market close. Not financial advice."

### 2.2 Index-Specific View ("/index/{index-name}")

Similar layout to home page with:
- Breadcrumb navigation
- Index metrics bar showing:
  - Index current value
  - Day change (absolute and %)
  - Advance/Decline count
  - Average P/E for index
  - Market cap distribution visualization

### 2.3 Sector View ("/sectors")

```
┌─────────────────────────────────────────────────────────┐
│ [Logo] Indian Stock Market Heatmap         [Date] [Ad ] │
├─────────────────────────────────────────────────────────┤
│ Home > Sectors                                          │
│                                                         │
│ Sector Performance View                                 │
│                                                         │
│ ┌─────────────────────────────────────────────────────┐ │
│ │ IT │ Financial │ Energy │ FMCG │ Auto │ Pharma │ .. │ │
│ └─────────────────────────────────────────────────────┘ │
│                                                         │
│ ┌─────────────────────────────────────────────────────┐ │
│ │ SECTOR OVERVIEW                                     │ │
│ │ ┌────────────┐ ┌────────────┐ ┌────────────┐       │ │
│ │ │            │ │            │ │            │       │ │
│ │ │   +1.5%    │ │   -0.8%    │ │   +0.3%    │       │ │
│ │ │  FINANCIAL │ │   ENERGY   │ │   FMCG     │       │ │
│ │ └────────────┘ └────────────┘ └────────────┘       │ │
│ └─────────────────────────────────────────────────────┘ │
│                                                         │
│ Currently Viewing: Financial Sector                     │
│                                                         │
│ ┌─────────────────────────────────────────────────────┐ │
│ │                 SECTOR HEATMAP                      │ │
│ │  ┌────┐ ┌────┐ ┌────┐ ┌────┐ ┌────┐ ┌────┐         │ │
│ │  │HDFC│ │ICBK│ │AXIS│ │SBIN│ │KOTK│ │INBK│         │ │
│ │  └────┘ └────┘ └────┘ └────┘ └────┘ └────┘         │ │
│ │  ┌────┐ ┌────┐ ┌────┐ ┌────┐ ┌────┐                │ │
│ │  │HDBK│ │BAJF│ │LTFH│ │PFC │ │RECL│                │ │
│ │  └────┘ └────┘ └────┘ └────┘ └────┘                │ │
│ └─────────────────────────────────────────────────────┘ │
│                                                         │
│ ┌─────────────────────────────────────────────────────┐ │
│ │           FINANCIAL vs NIFTY 50 BENCHMARK           │ │
│ │           [Comparative performance chart]            │ │
│ └─────────────────────────────────────────────────────┘ │
│                                                         │
│ ┌─────────────────────────────────────────────────────┐ │
│ │                   ADVERTISEMENT                      │ │
│ └─────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────┘
```

### 2.4 Stock Detail Modal (HTMX-powered, no separate page)

```
┌─────────────────────────────────────────────────┐
│ RELIANCE INDUSTRIES LTD (RELI.NS)         [×]   │
│ ₹2,482.45  (+1.5%)                              │
├─────────────────────────────────────────────────┤
│ ┌─────────────────────────────────────────────┐ │
│ │            [Simple Price Chart - 5 Days]    │ │
│ └─────────────────────────────────────────────┘ │
│                                                 │
│ Key Metrics                                     │
│ ┌────────────────┬───────────────────────────┐ │
│ │ Market Cap     │ ₹16.8 Trillion            │ │
│ │ P/E Ratio      │ 22.4                      │ │
│ │ 52-Week Range  │ ₹2,180.05 - ₹2,924.65     │ │
│ │ Volume (Today) │ 8.4M (+12% vs avg)        │ │
│ │ Sector         │ Energy                    │ │
│ └────────────────┴───────────────────────────┘ │
│                                                 │
│ Note: We do not provide investment advice or    │
│ recommendations. Data is for informational      │
│ purposes only.                                  │
└─────────────────────────────────────────────────┘
```

### 2.5 About & Methodology ("/about")

Simple page with sections:
- About the Indian Stock Market Heatmap
- Data Sources & Refresh Cycle
- How the Heatmap Colors Are Calculated
- Limitations & Disclaimers
- FAQ
- Contact/Feedback Form

## 3. Visual Enhancements

### Color-blindness Accessibility

- **Toggle Switch**: Implement a color-blind friendly mode toggle in site settings
- **Alternative Palette**:
  - Use Blue-Yellow diverging scale instead of Green-Red
  - Positive changes: Blue spectrum (#0284C7 to #7DD3FC)
  - Negative changes: Yellow/Brown spectrum (#B45309 to #FCD34D)
  - Add texture patterns for extreme values

### Shadows & Elevation

- **Default Cards**: 0 1px 3px rgba(0,0,0,0.08)
- **Hover State**: 0 4px 6px rgba(0,0,0,0.1)
- **Modal/Tooltip**: 0 10px 15px -3px rgba(0,0,0,0.1)
- **Apply sparingly** to maintain clean, minimalist design

### Dark Mode

- Implemented via CSS variables and prefers-color-scheme
- **Dark Mode Palette**:
  - Background: #121826
  - Card Background: #1F2937
  - Text: #F9FAFB (primary), #D1D5DB (secondary)
  - Accents retain same hues but adjusted for dark mode contrast
  - Positive/Negative colors slightly desaturated for reduced eye strain

### Animation & Transitions

- Subtle animation for tooltip appearance: fade in + slight scale (150ms)
- Tab transitions: 100ms ease-in-out for color and border changes
- Grid cell hover: 100ms brightness increase
- No animations for initial page load to prioritize performance

## 4. Tooltip Behavior & Positioning

### Implementation

- **Primary Technology**: HTMX + JavaScript for positioning
- **Trigger on Desktop**: 
  - `hx-get="/stock/{ticker}/tooltip/"`
  - `hx-trigger="mouseenter delay:150ms"`
  - `hx-target="#tooltip-container"`
  - Enhanced with JavaScript for positioning logic
  - ESC key dismissal and click-outside handling

### Positioning Logic

```css
.tooltip {
  position: absolute;
  max-width: 280px;
  z-index: 100;
  transform: translateY(-100%);
  margin-top: -8px;
}

/* Fallback positioning */
.tooltip.bottom {
  transform: translateY(0);
  margin-top: 8px;
}

/* Arrow styling */
.tooltip::after {
  content: '';
  position: absolute;
  bottom: -6px;
  left: 20px;
  width: 12px;
  height: 12px;
  background: white;
  transform: rotate(45deg);
  box-shadow: 1px 1px 0 0 rgba(0,0,0,0.1);
}

.tooltip.bottom::after {
  bottom: auto;
  top: -6px;
  box-shadow: -1px -1px 0 0 rgba(0,0,0,0.1);
}
```

### Mobile Behavior

- **Trigger**: Tap on cell
- **Display**: Bottom sheet modal that slides up
- **Dismissal**: Tap X button, tap outside, swipe down, or ESC key
- **Implementation**:
  ```html
  <div 
    class="stock-cell" 
    hx-get="/stock/{ticker}/tooltip/" 
    hx-trigger="click" 
    hx-target="#mobile-sheet"
    hx-swap="innerHTML">
  </div>
  
  <div id="mobile-sheet" class="mobile-sheet">
    <!-- Content loaded here -->
  </div>
  ```

### Tooltip Content

```html
<div class="tooltip">
  <div class="tooltip-header">
    <h4>Reliance Industries Ltd</h4>
    <span class="price-change positive">+1.52%</span>
  </div>
  <div class="tooltip-body">
    <div class="metric">
      <span class="label">Price</span>
      <span class="value">₹2,482.45</span>
    </div>
    <div class="metric">
      <span class="label">Volume</span>
      <span class="value">8.4M <span class="change positive">(+12%)</span></span>
    </div>
    <div class="metric">
      <span class="label">P/E Ratio</span>
      <span class="value">22.4</span>
    </div>
    <div class="metric">
      <span class="label">Market Cap</span>
      <span class="value">₹16.8T</span>
    </div>
  </div>
</div>
```

## 5. Mobile Responsiveness

### Navbar Transformation

- **Desktop**: Full horizontal navbar with logo, date, and navigation links
- **Mobile**: 
  - Compact navbar with logo and hamburger menu
  - Date moves below navbar
  - Main navigation in slide-out drawer from left edge

### Heatmap Grid Adaptation

- **Desktop**: 10-12 columns depending on viewport width
- **Tablet Landscape**: 6-8 columns
- **Tablet Portrait**: 4-5 columns
- **Mobile**: 2-3 columns with larger touch targets

```css
.heatmap-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
  gap: 16px;
  padding: 16px;
}

@media (max-width: 1024px) {
  .heatmap-grid {
    grid-template-columns: repeat(auto-fill, minmax(90px, 1fr));
    gap: 12px;
  }
}

@media (max-width: 768px) {
  .heatmap-grid {
    grid-template-columns: repeat(auto-fill, minmax(80px, 1fr));
    gap: 10px;
  }
}

@media (max-width: 640px) {
  .heatmap-grid {
    grid-template-columns: repeat(auto-fill, minmax(75px, 1fr));
    gap: 8px;
    padding: 8px;
  }
}
```

### Interface Adaptations for Mobile

- **Index Selector**: Full-width segmented control
- **Snapshot Cards**: Convert from 3-up layout to swipeable carousel
- **Footer**: Stack items vertically
- **Ads**: Replace with mobile-optimized 320×50 or 300×250 units
- **Sticky Elements**:
  - Implement sticky bottom bar with index selector and refresh button
  - Keep within thumb reach (bottom 20% of screen)

## 6. Accessibility & Performance

### Accessibility Features

- **Semantic HTML**: Proper use of headings, buttons, ARIA roles
- **Keyboard Navigation**: 
  - Tab order matches visual flow
  - Focus styles visible and enhanced
  - Keyboard shortcuts for main actions (refresh: Alt+R)
- **Screen Reader Support**:
  - Alternative text for visual elements
  - ARIA labels for interactive components
  - Proper heading structure

### Performance Optimizations

- **Image Optimization**:
  - Use SVG for icons
  - WebP format with JPEG fallback for any photos
  - Lazy loading via `loading="lazy"`
  
- **CSS/JS Optimizations**:
  - Critical CSS inlined in `<head>`
  - Deferred loading for non-critical styles
  - Minimal JS footprint (mostly just HTMX)
  
- **Caching Strategy**:
  - Cache static assets with appropriate headers
  - Use localStorage to cache latest heatmap data
  - Implement service worker for offline access to last viewed data

- **Rendering Optimizations**:
  - Use CSS containment where appropriate
  - Employ will-change for tooltip animations
  - Limit DOM size with pagination for large datasets

- **Performance Targets**:
  - First Contentful Paint < 1.5s
  - Time to Interactive < 3s
  - Lighthouse Performance Score > 90
  - Total page weight < 500KB

## 7. Implementation Timeline

### Phase 1: Foundation (Week 1-2) ✅

- ✅ Establish CSS variables for design system
- ✅ Implement base typography and grid system
- ✅ Create basic layout templates
- ✅ Build core heatmap component

### Phase 2: Core Functionality (Week 3-4) ✅

- ✅ Implement HTMX tooltip functionality
- ✅ Build responsive grid system
- ✅ Create index selector component with HTMX filtering
- ✅ Implement color calculation for heatmap cells
- Pendingfull component library implementation

### Phase 3: Refinement (Week 5-6) ✅

- ✅ Add dark mode support
- ✅ Build comprehensive grid layout system
- ✅ Implement snapshot cards layouts with mobile optimization
- ✅ Create mobile-specific sheet modals and navigation
- ✅ Add advanced tooltip positioning with JavaScript
- 🚧 Implement color-blind friendly toggle
- ✅ Optimize for mobile devices
- ✅ Add animations and transitions

### Phase 4: Final Touches (Week 7-8) 🚧

- ✅ Implement ad placements
- ✅ Implement performance optimizations
- ✅ Implement treemap visualization
- Pendingheader and footer components
- 🚧 Complete design system documentation
- 📝 Conduct accessibility testing
- 📝 Finalize stock detail modal
- 📝 Final UI review and browser testing

## 8. Design Deliverables

1. **Design System Documentation**:
   - ✅ Color palette (with CSS variables)
   - ✅ Typography styles
   - ✅ Component specifications

2. **Responsive Templates**:
   - ✅ `base.html` - Main template with common elements
   - ✅ `index.html` - Homepage template
   - ✅ `partials/_tooltip.html` - Tooltip HTML structure
   - ✅ `partials/_heatmap_cell.html` - Cell template
   - ✅ `partials/_index_selector.html` - Index selector component
   - ✅ `partials/_heatmap_content.html` - AJAX-loaded heatmap content
   - ✅ `partials/_header.html` - Header component
   - ✅ `partials/_footer.html` - Footer component
   - ✅ `sectors.html` - Sector view template
   - ✅ `treemap.html` - Treemap visualization template
   - 🚧 `partials/_stock_detail.html` - Stock detail modal

3. **CSS Files**:
   - ✅ `base.css` - Reset, variables, typography, grid
   - ✅ `components.css` - UI components (cells, tooltips, cards, pills, tabs, accordions, etc.)
   - ✅ `layouts.css` - Page-specific layouts, grid system, and responsive adaptations
   - ✅ `utilities.css` - Helper classes
   - ✅ `dark-mode.css` - Dark mode overrides
   - ✅ `responsive.css` - Mobile responsiveness optimizations

4. **JavaScript Utilities**:
   - ✅ `tooltip-position.js` - Helper for tooltip positioning
   - ✅ `mobile-navigation.js` - Mobile drawer and responsive functionality
   - ✅ `theme-toggle.js` - Dark mode toggle functionality
   - ✅ `responsive-helper.js` - Responsive behavior enhancements
   - 🚧 `accessibility.js` - Color-blindness mode toggle

5. **Documentation**:
   - 🚧 Implementation guidelines
   - 🚧 Responsive breakpoint checklist
   - 🚧 Accessibility compliance notes
   - 📝 Frontend testing plan
   - 📝 Browser compatibility matrix




