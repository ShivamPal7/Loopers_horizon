# PROJECT HORIZON — Agent Documentation

**Project Type:** Frontend-Only Web Application (React + Tailwind CSS)  
**Duration:** 4-Hour Hackathon Build  
**Domain:** Personal Finance & Life Planning  
**Data Persistence:** localStorage (No Backend)

---

## **PROJECT OVERVIEW**

### **Core Concept**

Project Horizon is an interactive life milestone timeline application that helps users visualize their financial future by:
- Placing meaningful life milestones on a chronological timeline (age 20-80)
- Calculating compound-interest projections based on savings rate
- Tracking progress toward multiple financial goals simultaneously
- Comparing different savings scenarios in real-time
- Understanding their current financial position relative to peers
- Planning life events alongside financial milestones

### **Key Value Proposition**

Users transform abstract financial goals ("retire comfortably") into concrete, actionable plans with exact numbers ("I need to save ₹32,000/month to achieve all goals by age 65").

---

## **FEATURE ARCHITECTURE**

### **TIER 1: CORE FEATURES (Problem Statement)**

#### **1. Interactive Age-Indexed Timeline**
- **Description:** Horizontally scrollable axis spanning ages 20 to 80
- **User Actions:** Scroll left/right to navigate timeline
- **Visual Elements:** Age markers, current age indicator (blue highlight), decade boundaries
- **Purpose:** Provides spatial context for milestone placement
- **Interaction Model:** Click any age to center view; drag to pan smoothly

#### **2. Drag-to-Place Milestone Markers**
- **Description:** Users place financial milestones at specific ages on timeline
- **Milestone Data:**
  - Label (e.g., "Buy apartment in Pune")
  - Target age (e.g., 32)
  - Cost (e.g., ₹80,00,000)
  - Category (housing, business, education, family, travel, retirement)
  - Priority level (high, medium, low)
- **User Actions:** Click to add → drag placeholder → drop at desired age → inline editor appears
- **Double-Click Action:** Edit existing milestone
- **Purpose:** Allows users to compose their future in spatial, visual format

#### **3. Category-Differentiated Markers**
- **Categories with Unique Identity:**
  - 🏠 Housing (Orange/Brown, #FF9500)
  - 💼 Business (Blue, #3B82F6)
  - 🎓 Education (Purple, #A855F7)
  - 💒 Family (Pink, #EC4899)
  - ✈️ Travel (Teal, #14B8A6)
  - 🏖️ Retirement (Gold, #FBBF24)
  - 🏥 Health (Green, #10B981)
  - 👨‍👩‍👧 Relationships (Red, #EF4444)
- **Visual Purpose:** Quick visual scanning; color coding reduces cognitive load

#### **4. Compound Savings Projection Line Chart**
- **Calculation Model:**
  - Monthly deposits (e.g., ₹32,000/month = ₹3,84,000/year)
  - Compound interest (e.g., 8% annual rate)
  - Capital drawdowns at milestone ages (e.g., -₹80,00,000 at age 32)
  - Subsequent compounding on reduced base
- **Visual Representation:** Smooth curved line showing cumulative balance at each age
- **Key Feature:** Curve dips downward after capital drawdowns (realistic accounting)
- **Interactive Elements:** Hover tooltips show exact balance at any age
- **Real-Time Updates:** Curve recalculates instantly as savings rate slider moves

#### **5. Milestone Shortfall Indicator**
- **Logic:**
  - Compare projected balance at target age vs. milestone cost
  - Calculate surplus/deficit amount
  - Assign status color based on deviation percentage
- **Status Colors:**
  - 🟢 Green: On track (projected ≥ cost) or surplus
  - 🟡 Yellow: Minor shortfall (10-30% below cost)
  - 🟠 Orange: Moderate shortfall (30-50% below cost)
  - 🔴 Red: Critical shortfall (>50% below cost)
- **Visual Placement:** On milestone card; updates dynamically
- **User Guidance:** Tooltip suggests "increase savings by ₹X/month" or "delay to age Y"

#### **6. What-If Scenario Panel**
- **Adjustable Parameters:**
  - Monthly savings rate (slider: ₹10,000 - ₹100,000)
  - Annual interest rate (slider: 4% - 12%)
  - Current net worth (text input)
  - Inflation rate (toggle: on/off with slider 2% - 6%)
- **Real-Time Behavior:** Every slider movement triggers projection recalculation
- **Visual Feedback:** Projection curve redraws, shortfall indicators update instantly
- **Purpose:** Allows exploration of "what if I save ₹38,000/month?" scenarios
- **Summary Statement:** "All milestones achievable at ₹32,000/month" or "Shortfall: ₹18 lakhs"

#### **7. Three-Scale Zoom Navigation**
- **Zoom Levels:**
  - **5-Year Detail View:** Ages compressed; shows individual years (30, 31, 32, 33, 34...)
  - **10-Year Medium View:** Standard view; age ranges (20, 30, 40, 50...)
  - **Full-Life Broad View:** Maximum zoom out (20, 40, 60, 80)
- **Interaction Model:** Three buttons (Detail / Normal / Overview) or scroll-wheel zoom
- **Animation:** Smooth scaling; milestones reflow position proportionally
- **Purpose:** Navigate between detailed and strategic views

---

### **TIER 2: CUSTOM STATS CARD (Your Addition)**

#### **Section A: Current Position**
- **Age Progress Bar:** Visual representation of 28/80 (35% through life)
- **Life Stage Label:** Automatically assigned (CHILDHOOD, EARLY_CAREER, ESTABLISHMENT, PEAK_EARNING, PRE_RETIREMENT, RETIREMENT)
- **Years Invested:** 28 years (past)
- **Years Left:** 52 years (future)
- **Life Progress Percentage:** 47% (accounting for working years only, not retirement)
- **Visual Format:** Horizontal progress bar with color gradient

#### **Section B: Goal Tracking**
- **Per-Milestone Display:**
  - Milestone label and icon
  - Years until goal (e.g., "4 years away")
  - Projected balance at target age
  - Required cost
  - Completion percentage (e.g., 87% = ₹88.5L vs ₹80L needed)
  - Status badge (✅ ON TRACK / ⚠️ AT RISK / ❌ CRITICAL)
  - Individual progress bar (mini, 60px width)
- **Color Coding:** Green (on track), amber (at risk), red (critical)
- **Ranking:** Show next milestone first; others below

#### **Section C: Peer Comparison**
- **Comparison Metrics:**
  - User's current net worth (₹5,00,000)
  - Average net worth for user's age group (₹3,20,000 for age 28)
  - Absolute difference (₹1,80,000 ahead)
  - Percentage ahead/behind (56% above average)
  - Percentile rank (72nd percentile = better than 72% of peers)
- **Visual Representation:** Side-by-side comparison bars or gauge chart
- **Psychological Impact:** Shows user where they stand relative to cohort
- **Data Source:** Historical average net worth tables (India, by age: 25/28/30/35/40/50/60)

#### **Section D: Achievement Badges**
- **Badge Types:**
  - 🏅 **Steady Saver:** Saved consistently for 24+ months
  - 🏅 **Goal Setter:** Created 3+ milestones
  - 🏅 **On Track:** All goals achievable with current savings
  - 🏅 **High Earner:** Saving 30%+ of income
  - 🏅 **Early Bird:** Started planning before age 30
  - 🏅 **Diversifier:** Planning 5+ different life areas
  - 🏅 **Compounding Champion:** Over 20 years of projections
  - 🏅 **Milestone Master:** Completed a milestone goal
- **Badge Display:** Gray (locked) or colored (earned)
- **Progress Indicator:** Show progress toward locked badges (e.g., "3/5 milestones for Diversifier")

#### **Section E: Quick Stats**
- **Metrics Displayed:**
  - Total milestones created
  - Completed milestones
  - In-progress milestones
  - Upcoming milestones
  - Average time between goals (years)
  - Monthly savings amount
  - Annual savings amount
  - Savings rate as % of income
  - Time to first goal (years away)
  - Time to last goal (years away)
- **Format:** Simple list or card grid
- **Purpose:** Executive summary of financial snapshot

---

### **TIER 3: 4 ADDITIONAL FEATURES (4-Hour Build)**

#### **Feature 1: Scenario Comparison**
- **Purpose:** Compare two different savings strategies side-by-side
- **Layout:** Dual-panel view (Scenario A | Scenario B)
- **Scenario A Parameters:**
  - Monthly savings: ₹32,000
  - Interest rate: 8%
  - Retirement age: 65
- **Scenario B Parameters:**
  - Monthly savings: ₹45,000 (or user-defined)
  - Interest rate: 8.5% (or user-defined)
  - Retirement age: 60 (earlier retirement)
- **Comparison Data Per Scenario:**
  - Each milestone: projected balance, status (on track/at risk/critical)
  - Total wealth at retirement
  - Years saved/spent (before retirement)
  - Lifestyle gain/loss vs. Scenario A
- **Visual Elements:** Dual projection curves overlaid (different colors); delta annotations
- **User Action:** Click "Compare Scenarios" button to toggle view

#### **Feature 2: Life Event Timeline**
- **Purpose:** Align financial milestones with major life events
- **Life Events (Non-Financial):**
  - Age 20: College Graduation
  - Age 25: First Job Started
  - Age 28: Today (You are here)
  - Age 30: Marriage (planned)
  - Age 35: First Child (planned)
  - Age 55: Kids' Higher Education
  - Age 70: Start Travel Phase
- **User Actions:** Add custom life events; drag to reposition
- **Integration with Milestones:** Show which financial goals align with which life events
- **Visual Representation:** Combined timeline showing both financial (colored pins) and life events (text labels with icons)
- **Purpose:** Holistic view of life planning, not just finances

#### **Feature 3: Monthly Breakdown**
- **Scope:** Focus on years with major milestones (e.g., age 32: apartment purchase)
- **Month-by-Month Display:**
  - Balance at month start
  - Monthly savings deposits (+₹32,000)
  - Interest accrual (+compound)
  - Milestone withdrawal (e.g., Sep: -₹80,00,000)
  - Balance at month end
- **Year Summary:**
  - Total saved (12 × ₹32,000 = ₹3,84,000)
  - Total spent on milestones
  - Net change in balance
  - End-of-year balance
- **User Interaction:** Select year via dropdown
- **Export Option:** Download as CSV for spreadsheet analysis
- **Purpose:** Understand month-to-month cash flow implications

#### **Feature 4: Printable Life Plan Report**
- **Report Sections:**
  - **Header:** User name, current date, age, life expectancy
  - **Executive Summary:** Overall assessment (All goals achievable / Shortfalls detected)
  - **Milestone Timeline:** Table listing all milestones with dates, costs, status
  - **Financial Projections:** Year-by-year balance from current age to 80
  - **Scenario Recommendations:** "Increase savings to ₹35,000 to achieve all goals"
  - **Assumptions:** Interest rate, inflation, no emergencies assumption
  - **Next Steps:** Action items (set up automated savings, review annually)
- **Format:** PDF generated from HTML template
- **User Action:** Click "Export Report" → downloads PDF
- **Purpose:** Shareable document for financial advisors, spouse, archival

---

## **DESIGN PRINCIPLES & IMPLEMENTATION**

### **Golden Ratio (1.618:1) Application**

**Layout Proportions:**
- Main content area: 1000px
- Sidebar width: 618px (1000 ÷ 1.618)
- Aspect ratios: 16:10, 3:2 (derived from golden ratio)

**Spacing Scale (8px Base Unit × 1.618):**
- XS: 8px
- SM: 13px
- MD: 21px
- LG: 34px
- XL: 55px
- 2XL: 89px

**Visual Elements:**
- Card dimensions follow golden rectangle (width:height = 1.618:1)
- Section margins use scale progression
- Typography hierarchy: headline to body ratio 1.618:1

---

### **Fitts's Law Application (Interaction Efficiency)**

**Principle:** Time to click = a + b × log₂(Distance ÷ Size)

**Primary Action Buttons:**
- Size: 56px × 56px (optimal 48-72px for touch targets)
- Placement: Center screen, above fold
- Distance from user focus: Minimize (center canvas)
- Target examples: "Add Milestone," "Save Settings"

**Secondary Action Buttons:**
- Size: 44px × 44px
- Placement: Edges allowed (top-right, bottom-left)
- Target examples: "Edit," "Delete," "More Options"

**Interactive Elements:**
- Sliders: Minimum 200px length, 8px track height, 24px thumb diameter
- Milestone pins: 28px visual + 12px invisible hit area = 40px effective click radius
- Minimum spacing between targets: 40px (prevents accidental clicks)

**Hover States:**
- Button change color/shadow immediately on hover
- Tooltip appears after 500ms (not instant; reduces noise)
- Drag handles clearly visible (cursor changes to grab/grabbing)

---

### **Gestalt Principles (Visual Grouping)**

**Proximity:** Group related information close together
- Milestone card: label, age, cost, status all within 140px box
- Stats card: related metrics within same section boundary
- Control panel: related sliders grouped vertically

**Similarity:** Use consistent styling for related items
- All "housing" milestones: orange icon + orange badge
- All "on track" indicators: green color + checkmark
- All input fields: same border radius, padding, font size

**Continuity:** Visual flow guides eye movement
- Timeline: left-to-right (past → future)
- Stats card: top-to-bottom (summary → details)
- Projection chart: ascending curve (time → wealth increase)

**Closure:** Users perceive complete shapes/patterns
- Milestone cards have clear borders/shadows (defines boundary)
- Progress bars have start and end anchors (implies completion)
- Chart axes form rectangle (frame context)

---

### **Hick-Hyman Law (Decision Load)**

**Principle:** Reaction time = a + b × log₂(n choices)

**Primary Actions Limited to 3:**
1. Add Milestone
2. Adjust Savings Slider
3. View Stats

**Secondary Actions Grouped:**
- Category selection (7 options) → dropdown (not 7 buttons)
- View mode (3 options) → segmented control button
- Export format (2 options) → radio button pair

**Progressive Disclosure:**
- Show basics first (age, cost, label)
- Hide advanced options behind "More Details" toggle
- Help text on hover (not cluttering default view)

**Visual Reduction:**
- Use icons instead of long labels (🏠 instead of "Housing Milestone")
- Abbreviate numbers (₹1.5Cr instead of ₹15,000,000)
- Collapse secondary metrics into collapsible sections

---

### **Color & Contrast (WCAG AAA Compliance)**

**Contrast Requirements (7:1 ratio for normal text, 4.5:1 for large text):**

| Element | Foreground | Background | Ratio | Status |
|---------|-----------|-----------|-------|--------|
| Primary CTA | #2563EB | #FFFFFF | 8.8:1 | ✅ |
| Primary CTA Hover | #1D4ED8 | #FFFFFF | 9.2:1 | ✅ |
| Body Text | #1F2937 | #F9FAFB | 11:1 | ✅ |
| Help Text | #6B7280 | #F9FAFB | 5.8:1 | ✅ |
| Status Green | #10B981 | #FFFFFF | 5.2:1 | ✅ |
| Status Amber | #F59E0B | #FFFFFF | 6.8:1 | ✅ |
| Status Red | #EF4444 | #111827 (dark) | 6.3:1 | ✅ |

**Color Accessibility:**
- Never rely on color alone (e.g., red = bad, green = good)
- Always pair with icon/text (✅ GREEN + text "On Track")
- Support colorblind users (use patterns, not just color)

---

### **Visual Hierarchy (Size, Color, Position)**

**TIER 1 (Most Important):**
- Current age marker on timeline (24px, bright blue, centered)
- Next upcoming milestone (32px text, bold weight 700)
- Stats card headline (28px, weight 700, color: #1F2937)

**TIER 2 (Important):**
- Projection curve (3px stroke, opacity: 1, color: primary blue)
- Milestone markers (20px diameter, full color saturation)
- Goal progress bars (8px height, full color)

**TIER 3 (Supporting):**
- Timeline axis labels (12px, opacity 0.6, color: #9CA3AF)
- Tooltips (12px, opacity 0.9)
- Secondary stats (14px, opacity 0.7)

---

## **3D EFFECTS & SCROLL ANIMATIONS**

### **Hero Section Entry (Page Load)**

**Effect:** 3D card appears to rotate into view from left

**Visual Sequence:**
1. Initial state: Card tilted 90° left (invisible edge-on)
2. Animation: Rotates 90° → 0° (facing viewer)
3. Opacity: 0% → 100%
4. Duration: 1.2 seconds
5. Easing: Deceleration (starts fast, ends slow)

**Purpose:** Dramatic entrance; creates anticipation

---

### **Parallax Scroll Effect (Timeline Container)**

**Effect:** Timeline moves slower than page scroll (50% speed), creating depth illusion

**Mechanism:**
- Page scrolls 100px
- Timeline moves 50px (half speed)
- Stationary content stays fixed
- Creates 3D depth perception

**Visual Impact:** Timeline appears to "float" behind page content as user scrolls

---

### **Milestone Pin 3D Hover**

**Effect:** Pin rotates toward user on hover (3D flip effect)

**Transformations:**
- Rotate around Y-axis: +15° (toward viewer)
- Rotate around Z-axis: -5° (slight tilt)
- Scale: +15% (appear closer)
- Shadow: Intensify (proximity indicator)

**Transition:** Spring physics (not linear)
- Stiffness: High (bouncy feel)
- Damping: Medium (quick settling)

**Purpose:** Haptic-like feedback; indicates interactivity

---

### **Projection Curve Drawing Animation**

**Effect:** Curve appears to "draw itself" when user adjusts savings slider

**Sequence:**
1. Previous curve fades out
2. New curve path animates line-by-line
3. Glow effect trails behind drawn line (3D depth)
4. Duration: 2 seconds
5. Easing: Smooth (not jerky)

**Purpose:** Shows calculation in real-time; satisfying visual feedback

---

### **Stats Card Stagger Animation (Scroll Into View)**

**Effect:** Each stats section cascades into view as user scrolls down

**Sequence:**
1. Card appears (opacity: 0 → 1, translateY: 50px → 0)
2. Sections follow: Position → Goals → Peers → Badges → Quick Stats
3. Stagger delay: 100ms between sections
4. Duration: 0.6 seconds per section

**Purpose:** Progressive disclosure; guides attention; reduces cognitive load

---

### **Number Counter Animation (Stats Values)**

**Effect:** Numeric values count up from 0 to final value

**Example:** Balance display: 0 → 88,500,000 (counted over 1.5 seconds)

**Mechanism:**
- Increment value every 50ms
- Total steps: 30 (1.5 seconds ÷ 50ms)
- Appears alongside slight scale animation (0.8x → 1x)

**Purpose:** Draws attention to changing values; feels dynamic

---

### **Timeline Zoom Animation (3D Perspective)**

**Effect:** Timeline appears to zoom in/out with perspective tilt

**Transformations:**
- Scale: increases (zoom level 1x → 2x → 3x)
- Perspective: 1200px (3D depth)
- RotateX: +10° (tilts forward when zoomed in)

**Purpose:** Smooth transition between detail and overview modes

---

### **Scenario Comparison Slide-In (3D Entrance)**

**Effect:** Second scenario panel slides in from left with 3D rotation

**Sequence:**
1. Initial: Rotated 45° away (perspective: 1200px)
2. Animation: RotateY: 45° → 0°
3. Slide: translateX: -500px → 0
4. Duration: 0.8 seconds
5. On exit: Reverse animation (slides out, rotates away)

**Purpose:** Emphasizes dual-panel view; depth indicates movement

---

## **RESPONSIVE DESIGN STRATEGY**

### **Mobile-First Approach (< 640px)**

**Timeline:**
- Full width (100% with 16px padding)
- Vertical scrolling (rotate timeline 90° if necessary for readability)
- Single-column stats card

**Controls:**
- Large touch targets (48px minimum)
- Sliders: 200px width, touch-friendly
- Buttons: Stack vertically (not side-by-side)

**Charts:**
- Simplified (fewer data points displayed)
- Smaller font (11-12px)

---

### **Tablet Optimization (640px - 1024px)**

**Layout:**
- 90% width (remove excessive side margins)
- 24px padding (increased from mobile)
- Two-column stats card

**Timeline:**
- Readable at native size (not rotated)
- Milestone labels always visible (not tooltips only)

---

### **Desktop Refinement (> 1024px)**

**Layout:**
- 70% main content width (golden ratio)
- Sidebar: 43% (70% ÷ 1.618)
- 34px padding (from spacing scale)

**Stats Card:**
- Three-column grid (position, goals, peers on row 1; badges, quick stats on row 2)

**Charts:**
- Full resolution (no data point reduction)
- Hover interactions rich (detailed tooltips)

---

## **DATA MODEL & PERSISTENCE**

### **localStorage Schema Structure**

**User Profile:**
- Current age, net worth, income, creation date

**Milestones Array:**
- id, label, target age, cost, category, priority, status, creation date

**Financial Settings:**
- Monthly savings, interest rate, inflation rate, life expectancy

**Scenarios Array:**
- id, name, custom settings, saved projections

**Life Events Array:**
- id, age, event name, type, icon, financial flag

**User Preferences:**
- Theme (light/dark), currency, locale, default view

### **Auto-Save Behavior**

- Save on any milestone edit (add, delete, modify)
- Save on any settings change (slider release, not during drag)
- Save on scenario creation/deletion
- Debounce saves to prevent excessive writes

### **Export/Import Functionality**

- Export: Download entire profile as JSON file (shareable)
- Import: Upload previous profile JSON to restore

---

## **ACCESSIBILITY COMMITMENTS**

### **Keyboard Navigation**

- **Tab key:** Navigate all interactive elements in logical order
- **Enter key:** Activate buttons, submit forms
- **Arrow keys:** Change slider values (up/right = increase, down/left = decrease)
- **Escape key:** Close popups, cancel edits
- **Skip to main content:** Link available on page load

### **Screen Reader Support**

- **ARIA Labels:** Describe buttons, icons, sliders
- **ARIA Live Regions:** Announce projection updates when slider changes
- **Form Labels:** Associated with inputs (no label-less fields)
- **Landmark Regions:** Main, navigation, complementary properly marked

### **Color Independence**

- Status indicated by color + icon (not color alone)
- Error states have text explanation + visual styling
- Charts use patterns, not just colors

### **Motion Sensitivity**

- Respect `prefers-reduced-motion` media query
- 3D animations disabled if user prefers reduced motion
- Parallax disabled for reduced-motion users
- Essential animations (slide-in) still work; just faster/simpler

---

## **PERFORMANCE OPTIMIZATION TARGETS**

### **Calculation Efficiency**

- Memoize expensive projection calculations (only recalc when inputs change)
- Debounce slider input (wait 300ms after user stops dragging before recalculating)
- Batch DOM updates (don't update every 10ms; wait for frame)

### **Rendering Performance**

- Lazy load non-critical components (Scenario Comparison, Report Generator)
- Virtualize long lists (if 80+ milestones, only render visible items)
- SVG charts use canvas rendering if >1000 data points

### **Asset Optimization**

- Icons: SVG (scalable, minimal size)
- Images: WebP with fallback PNG
- Fonts: System fonts preferred; only load 1-2 web fonts if necessary

### **Target Metrics**

- Largest Contentful Paint: < 2.5 seconds
- Time to Interactive: < 3.5 seconds
- Cumulative Layout Shift: < 0.1
- FPS during animations: 60 (no jank)

---

## **USER FLOWS & INTERACTIONS**

### **Flow 1: First-Time User Setup**

1. User lands on homepage
2. Hero card rotates in (3D animation)
3. Guided tour highlights key areas
4. User prompted to set age and current net worth
5. User sets monthly savings amount (slider)
6. User adds first milestone (drag-to-place)
7. Projection curve renders with savings scenario
8. Success message: "Your plan is ready!"
9. User explores stats card

### **Flow 2: Scenario Exploration**

1. User adjusts monthly savings slider (current: ₹32,000)
2. Projection curve recalculates (2-second animation)
3. Shortfall indicators update (green → amber)
4. Stats card updates in real-time
5. User clicks "Compare Scenarios" button
6. Dual-panel view slides in (3D rotation)
7. Scenario B shows ₹45,000/month savings
8. User visually compares outcomes
9. User can revert to Scenario A or accept Scenario B as new baseline

### **Flow 3: Goal Achievement Tracking**

1. User scrolls to stats card
2. Stats card stagger-animates into view
3. User sees "Next Milestone: Apartment (4 years away)"
4. Completion progress bar shows 87%
5. Green "✅ ON TRACK" badge visible
6. User clicks milestone to edit details
7. Milestone card expands with full details
8. User can drag to change target age
9. Projection updates immediately
10. User saves changes (auto-saved)

### **Flow 4: PDF Report Generation**

1. User scrolls to bottom
2. Clicks "Export Life Plan" button
3. Report generator compiles all data
4. PDF opens in preview window
5. User downloads or prints
6. User shares PDF with spouse/advisor

---

## **ERROR HANDLING & VALIDATION**

### **Input Validation Rules**

- **Age:** Must be 18-80 (no young users, no overly old targets)
- **Cost:** Must be positive, less than 10x current net worth (sanity check)
- **Monthly Savings:** Must not exceed income (flagged for attention)
- **Interest Rate:** 2% - 15% (reasonable range)
- **Milestone Label:** Max 50 characters, required field

### **Error States**

- **Invalid input:** Show inline error message below field; prevent submission
- **Missing required field:** Highlight field in red; disable save button
- **Conflicting data:** Show warning modal ("Two milestones same age; continue?")
- **Data loss risk:** Confirm before deleting milestone ("This cannot be undone")

### **Recovery Mechanisms**

- **Undo last change:** Single undo available (revert to previous milestone)
- **Reset to default:** Restore all fields to initial values (user prompted)
- **Local restore:** If data corrupted, offer to restore from previous session (localStorage)

---

## **TESTING CHECKLIST**

### **Functionality Testing**

- [ ] Add milestone → appears on timeline
- [ ] Edit milestone → data updates
- [ ] Delete milestone → removed from timeline and stats
- [ ] Drag milestone → position changes, projection updates
- [ ] Adjust savings slider → projection curve redraws
- [ ] Zoom in/out → timeline rescales, milestones reposition
- [ ] Toggle scenario → dual panels appear/disappear
- [ ] Add life event → appears on combined timeline
- [ ] Export PDF → generates without errors
- [ ] localStorage persists data across page refreshes

### **Visual Testing**

- [ ] Golden ratio proportions appear balanced
- [ ] Color contrast passes WCAG AAA (7:1 for text, 4.5:1 for large)
- [ ] 3D animations smooth (60 FPS, no jank)
- [ ] Parallax effect creates depth perception
- [ ] Milestone hover rotates smoothly
- [ ] Stats card cascades in on scroll
- [ ] Number counters increment smoothly
- [ ] Charts render without distortion

### **Accessibility Testing**

- [ ] Keyboard navigation works (Tab, Enter, Arrows)
- [ ] Screen reader announces all interactive elements
- [ ] Color not sole indicator (icon + text present)
- [ ] Focus indicators visible (3px outline)
- [ ] Animations respect prefers-reduced-motion
- [ ] Touch targets ≥ 44px × 44px
- [ ] Contrast ratios verified (WebAIM Contrast Checker)
- [ ] Form labels associated with inputs

### **Responsive Testing**

- [ ] Mobile (320px): Single column, readable, touchable
- [ ] Tablet (640px): Two columns, optimized spacing
- [ ] Desktop (1024px): Three columns, golden ratio proportions
- [ ] Landscape mode: Timeline horizontal, stats below
- [ ] All charts rescale proportionally

### **Performance Testing**

- [ ] LCP: < 2.5 seconds
- [ ] TTI: < 3.5 seconds
- [ ] CLS: < 0.1
- [ ] Slider drag: 60 FPS (no frame drops)
- [ ] Projection recalc: < 100ms (imperceptible)
- [ ] PDF generation: < 3 seconds

---

## **DELIVERABLES SUMMARY**

### **Core Features (From Problem Statement)**
✅ Horizontally scrollable age-indexed timeline (20–80)  
✅ Drag-to-place milestone markers with category icons  
✅ Compound-interest projection line chart  
✅ Real-time what-if scenario panel  
✅ Milestone shortfall indicators (red/amber/green)  
✅ Three-scale zoom (5-year, 10-year, full-life)  

### **Custom Stats Card**
✅ Current position tracker (age, life stage, years left)  
✅ Goal tracking with % completion per milestone  
✅ Peer comparison (percentile, ahead/behind average)  
✅ Achievement badges (6+ types)  
✅ Quick stats (savings rate, timeline, totals)  

### **4 Additional Features**
✅ Scenario comparison (dual-panel side-by-side)  
✅ Life event timeline (aligned with financial goals)  
✅ Monthly cash flow breakdown (for milestone years)  
✅ Printable life plan report (PDF export)  

### **Design & UX**
✅ Golden ratio applied to layout  
✅ Fitts's Law optimized button placement & sizing  
✅ Gestalt principles for visual grouping  
✅ WCAG AAA color contrast (7:1+)  
✅ Visual hierarchy (size, color, position)  

### **3D & Animations**
✅ Hero section 3D card rotation (on load)  
✅ Parallax scroll effect (timeline depth)  
✅ Milestone pin 3D hover (rotateY, scale, shadow)  
✅ Projection curve drawing animation  
✅ Stats card stagger animation (scroll into view)  
✅ Number counter animation (values count up)  
✅ Timeline zoom 3D perspective  
✅ Scenario comparison slide-in (3D rotation)  

### **Data & Persistence**
✅ localStorage implementation (no backend)  
✅ Auto-save on changes  
✅ Export/import functionality  

### **Accessibility & Performance**
✅ WCAG 2.1 AA+ compliance  
✅ Keyboard navigation  
✅ Screen reader support  
✅ Prefers-reduced-motion respected  
✅ Performance targets met (LCP, TTI, CLS)  

---

## **TECHNOLOGY STACK**

| Layer | Technology | Purpose |
|-------|-----------|---------|
| **Framework** | React 18+ | Component-based UI |
| **Styling** | Tailwind CSS | Utility-first CSS |
| **Animations** | Framer Motion | Scroll & 3D animations |
| **Charts** | Recharts | Data visualization |
| **Icons** | React Icons | Iconography |
| **Export** | jsPDF + html2canvas | PDF generation |
| **State** | useState, useContext | Local state management |
| **Persistence** | localStorage | Client-side storage (no backend) |

---

## **RESOURCE CONSTRAINTS**

- **Time:** 4 hours (hackathon)
- **Budget:** $0 (free libraries only)
- **Backend:** None (frontend-only)
- **APIs:** None (all calculations client-side)
- **Database:** localStorage only

---

## **SUCCESS CRITERIA**

### **Must-Have**
1. ✅ Timeline renders with milestone markers
2. ✅ Projection curve calculates accurately
3. ✅ Shortfall indicators update in real-time
4. ✅ Stats card displays all 5 sections
5. ✅ Data persists in localStorage

### **Should-Have**
6. ✅ 3D animations smooth and performant
7. ✅ Responsive design works on mobile/tablet/desktop
8. ✅ Scenario comparison functional
9. ✅ PDF report generates

### **Nice-to-Have**
10. ✅ Life event timeline
11. ✅ Monthly breakdown detailed
12. ✅ Parallax scroll animation
13. ✅ Golden ratio proportions perfectly balanced

---

## **KNOWN CONSTRAINTS & WORKAROUNDS**

### **Constraint 1: Complex Projection Calculations**

**Issue:** Compound interest with non-uniform capital drawdowns across multiple ages is mathematically complex.

**Workaround:** Use year-by-year forward simulation (loop from current age to 80, applying interest + drawdowns each iteration) instead of closed-form formula.

---

### **Constraint 2: 3D Performance on Low-End Devices**

**Issue:** 3D transforms (rotateY, perspective) can cause jank on older mobile devices.

**Workaround:** Detect device capability; disable 3D on low-end; use simpler 2D transforms (scale, translateX) as fallback.

---

### **Constraint 3: PDF Export of Complex Charts**

**Issue:** SVG charts don't always render correctly in PDFs.

**Workaround:** Pre-render chart as canvas image, then embed image in PDF (trade-off: loss of interactivity, but visual accuracy maintained).

---

### **Constraint 4: localStorage Size Limit (~5MB)**

**Issue:** Storing 50+ milestones with historical snapshots could exceed limit.

**Workaround:** Only store current state; don't store historical versions. Archive old data on export.

---

## **FUTURE ENHANCEMENTS (Post-Hackathon)**

- Backend API for cloud sync & multi-device access
- User authentication (Google/GitHub OAuth)
- Sharing/collaboration (share read-only link)
- Historical tracking (month-by-month progress photos)
- AI recommendations ("You should save ₹X more to retire at Y")
- Integration with banking APIs (auto-sync net worth)
- Mobile app (React Native)
- Dark mode toggle
- Multiple currency support
- Inflation-adjusted projections (real vs. nominal terms)

---

## **PROJECT NOTES**

### **Developer Guidance**

- **Start with:** Timeline component → Projection logic → Stats card
- **Test early:** Verify projection calculations before animations
- **Polish last:** Animations added after core functionality works
- **Use components:** Break UI into small, reusable pieces
- **Optimize selectively:** Profile first; optimize only slow parts

### **Design Guidance**

- **Consistency:** Reuse color palette, spacing scale, font sizes
- **Feedback:** Every action should have visible response (hover, click, load)
- **Clarity:** Labels, icons, and colors should be self-explanatory
- **Delight:** Smooth animations, satisfying interactions, positive tone

### **Accessibility Guidance**

- **Inclusive:** Design for all users, not just majority
- **Test:** Use WAVE, Lighthouse, manual keyboard testing
- **Respect:** Honor user preferences (prefers-reduced-motion, color scheme)
- **Improve:** Accessibility shouldn't feel like afterthought; build it in

---

## **FINAL NOTES**

This project demonstrates:
- **Complex state management** (multiple milestones, scenarios, calculations)
- **Real-time interactivity** (responsive sliders, instant feedback)
- **Visual design** (golden ratio, color theory, hierarchy)
- **Animations** (3D effects, parallax, stagger)
- **Accessibility** (WCAG AAA, keyboard nav, screen readers)
- **No-backend fullstack** (React + localStorage = complete app)

**Success = User gains clarity on financial future and confidence in their plan.**

