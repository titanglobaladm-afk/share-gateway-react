# SHARE Gateway Design Guidelines

## Design Approach

**Selected Approach:** Design System - Material Design 3  
**Justification:** As a utility-focused training portal with information-dense content (courses, lessons, quizzes, progress tracking), Material Design provides excellent patterns for educational platforms with clear hierarchy, robust data display components, and proven accessibility standards.

## Core Design Principles

1. **Clarity First**: Every element serves the learning journey - no decorative distractions
2. **Progressive Disclosure**: Information revealed as needed to prevent overwhelm
3. **Trust & Professionalism**: Medical/healthcare context requires credibility through clean, structured design
4. **Mobile-Equal Experience**: Not mobile-friendly, but mobile-first thinking

## Typography

**Font Family**: Inter (Google Fonts) for UI, Merriweather for lesson content  
**Scale**:
- Display (Landing hero): text-5xl md:text-6xl, font-bold
- Page titles: text-3xl md:text-4xl, font-bold
- Section headers: text-2xl, font-semibold
- Card titles/Course names: text-xl, font-semibold
- Body/Lesson content: text-base, font-normal
- Labels/Meta: text-sm, font-medium
- Captions: text-xs

## Layout System

**Spacing Primitives**: Tailwind units of 2, 4, 6, 8, 12, 16  
**Common patterns**:
- Section padding: py-12 md:py-16
- Card padding: p-6
- Element spacing: gap-4 or gap-6
- Form fields: space-y-4

**Containers**:
- Max-width: max-w-7xl for dashboard, max-w-4xl for lesson content
- Consistent horizontal padding: px-4 md:px-8

## Component Library

### Navigation
- Fixed top navigation bar with logo left, auth buttons right
- Mobile: Hamburger menu with slide-out drawer
- Dashboard sidebar (desktop): 240px fixed width with course navigation
- Breadcrumbs on course/lesson pages

### Cards
- Elevation through subtle shadow: shadow-md hover:shadow-lg transition
- Rounded corners: rounded-lg
- Course cards: Image thumbnail (if available), title, progress bar, metadata
- Lesson cards: Icon, title, completion checkbox/badge

### Progress Indicators
- Linear progress bars: Full-width bars showing percentage (0-100%)
- Circular progress: For dashboard course overview
- Checkmarks: Completed items get checkmark badge
- Visual states: Not started (muted), In progress (accent), Completed (success)

### Forms (Login/Register)
- Centered card layout: max-w-md mx-auto
- Input fields with labels above
- Clear error states below inputs
- Primary action button full-width
- Secondary link below for alternate action

### Quizzes
- Question cards with radio button choices
- Clear visual feedback: Selected state, correct/incorrect after submission
- Submit button at bottom, disabled until selection made
- Results summary card showing score

### Buttons
- Primary: Solid fill, medium size (px-6 py-3)
- Secondary: Outline variant
- Text links: Underline on hover
- Icon buttons: Square 40x40px touch target

### Landing Page
**Structure** (5 sections):
1. **Hero**: Full-width (h-[600px]) with background image of SHARE Mobile Clinic or Haiti healthcare context, centered content overlay with blurred background for text/buttons
2. **Mission Statement**: Two-column (text + supporting image), max-w-6xl
3. **Who It's For**: Three-column grid showing Staff/Investors/Partners with icons
4. **How It Works**: Timeline/step diagram (4 steps: Register → Get Assigned → Complete Courses → Certified)
5. **CTA Footer**: Centered call-to-action with dual buttons (Login/Register)

## Images

**Hero Image**: Large hero image (1920x600px suggested) showing SHARE Mobile Clinic vehicle, staff, or healthcare activities in Haiti - should communicate mission and authenticity. Use overlay with backdrop-blur-sm bg-black/40 for text readability.

**Mission Section Image**: Supporting image (600x400px) showing clinic in action or community impact

**Icons**: Use Heroicons (via CDN) for all interface icons - outline style for consistency

## Dashboard Layout

- Left sidebar (desktop): Course list with progress rings
- Main content area: "Continue Learning" section at top, then grid of course cards
- Top bar: Search, notifications, profile dropdown

## Lesson/Quiz Pages

- Maximum reading width: max-w-3xl for content
- Clear previous/next navigation
- Sticky footer with action button ("Mark Complete" or "Submit Quiz")
- Progress breadcrumb at top

## Accessibility

- All interactive elements minimum 44x44px touch target
- Form inputs with visible labels and error states
- Progress bars include text percentage for screen readers
- Focus states visible on all interactive elements
- Sufficient contrast ratios (WCAG AA minimum)

## Animation

**Minimal, purposeful only**:
- Page transitions: Simple fade
- Progress bar fills: Smooth width transition
- Card hover: Subtle lift (shadow change)
- No scroll animations, no complex hero animations

## Responsive Breakpoints

- Mobile: base (< 768px) - Single column, stacked navigation
- Tablet: md (768px+) - Two columns for cards
- Desktop: lg (1024px+) - Sidebar + multi-column grids