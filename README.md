# Order Tracking Screen

A mobile-first order tracking UI built with **Next.js 16** and **React 19**, showcasing real-time delivery status, progress timelines, ETA banners, and contextual bottom sheets across six distinct order states.

---

## Table of Contents

- [Tech Stack](#tech-stack)
- [Features](#features)
- [Project Structure](#project-structure)
- [Order Scenarios](#order-scenarios)
- [Getting Started](#getting-started)
- [Scripts](#scripts)
- [Architecture](#architecture)
- [Component Reference](#component-reference)
- [Accessibility](#accessibility)
- [License](#license)

---

## Tech Stack

| Layer         | Technology                        |
|---------------|-----------------------------------|
| Framework     | Next.js 16.3.6 (App Router)      |
| UI Library    | React 19.2.8                      |
| Styling       | Tailwind CSS v4                   |
| Icons         | Lucide React 1.47.0               |
| Package Mgr.  | pnpm 11.20.0                      |
| Linting       | ESLint 9 (Next.js config)         |

---

## Features

- **Real-time order status** — Order Confirmed → Processing → Shipped → Out for Delivery → Delivered
- **6 order states** — Normal in-transit, Delayed, Delivered / Not Received, Tracking Unavailable, Loading skeleton, Error state
- **Progress timeline** — Visual stepper showing completed steps with timestamps and courier notes
- **ETA banner** — Estimated delivery time with variant-aware styling
- **Delay notice** — Original vs. revised ETA, delay reason, and notification signup
- **Delivered-not-received** — Dedicated card prompting the user to report the issue
- **Bottom sheets** — Order details, contact support (call / chat / email), and report-issue flows
- **Toast notifications** — In-app feedback for user actions via a shared context provider
- **Dev scenario switcher** — Toggle between all six states without modifying code
- **Mobile-first layout** — Centered max-width container with touch-optimized targets (≥ 44 px)
- **Accessible** — Semantic HTML, `aria-live` regions, keyboard focus indicators, screen-reader labels

---

## Project Structure

```
src/
├── app/
│   ├── layout.js          # Root layout — Geist fonts + ToastProvider
│   ├── page.js            # Home page — scenario state + OrderTrackingScreen
│   └── globals.css        # Tailwind v4 entry + custom animations / tokens
│
├── components/
│   ├── tracking/          # Core tracking UI
│   │   ├── OrderTrackingScreen.jsx   # Main screen, orchestrates all states
│   │   ├── StatusCard.jsx            # Top status headline + icon
│   │   ├── ProgressTimeline.jsx      # Stepper with dots, labels, timestamps
│   │   ├── EtaBanner.jsx             # ETA pill / banner
│   │   ├── OrderSummaryCard.jsx      # Product image, price, address summary
│   │   ├── DelayNotice.jsx           # Delay explanation + notify CTA
│   │   ├── DeliveredNotReceived.jsx  # Not-received warning + report CTA
│   │   ├── TrackingUnavailable.jsx   # Dispatch-window placeholder
│   │   └── ActionBar.jsx             # Sticky bottom bar (support / chat)
│   │
│   ├── sheets/            # Bottom-sheet overlays
│   │   ├── OrderDetailsSheet.jsx     # Full order breakdown
│   │   ├── ContactSupportSheet.jsx   # Call, live-chat, email options
│   │   └── ReportIssueSheet.jsx      # Issue type + description form
│   │
│   ├── states/            # Loading / error / empty screens
│   │   ├── TrackingSkeleton.jsx      # Shimmer skeleton
│   │   ├── ErrorState.jsx            # Error message + retry CTA
│   │   └── EmptyState.jsx            # No-data placeholder
│   │
│   ├── ui/                # Shared primitives
│   │   ├── Badge.jsx                 # Status badge (pill)
│   │   ├── Button.jsx                # Accessible button component
│   │   ├── BottomSheet.jsx           # Reusable modal sheet
│   │   └── Toast.jsx                 # Toast context + toast component
│   │
│   └── dev/               # Dev-only helpers
│       └── ScenarioSwitcher.jsx      # Toggle between mock scenarios
│
├── hooks/
│   └── useOrder.js        # Fetch + cache order data by scenario
│
├── lib/
│   ├── constants.js       # STATUS_STEPS, STATUS_INDEX, SCENARIOS
│   ├── format.js          # Date / time / delay formatters
│   ├── get-order.js       # Async order fetcher (simulated API)
│   ├── mock-data.js       # 6 mock order objects
│   └── utils.js           # clsx / cn helpers
```

---

## Order Scenarios

| ID                        | Description                                    |
|---------------------------|------------------------------------------------|
| `normal`                  | In-transit, out for delivery                   |
| `delayed`                 | ETA missed; revised ETA + delay reason         |
| `delivered_not_received`  | Marked delivered; customer has not received it |
| `tracking_unavailable`    | Order confirmed; tracking not yet active       |
| `loading`                 | Skeleton screen while fetching                 |
| `error`                   | Fetch failed; retry available                  |

The scenario is driven by `scenario` state in [`page.js`](src/app/page.js) and consumed by the [`useOrder`](src/hooks/useOrder.js) hook.

---

## Getting Started

### Prerequisites

- **Node.js** 18.17+ (Next.js 16 requirement)
- **pnpm** 11.20.0 (matches `packageManager` field in `package.json`)

### Install

```bash
pnpm install
```

### Development

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser. The dev **Scenario Switcher** (bottom-right corner) lets you preview every order state without touching code.

### Build

```bash
pnpm build
pnpm start
```

---

## Scripts

| Script       | Description                          |
|--------------|--------------------------------------|
| `pnpm dev`   | Start the Next.js dev server         |
| `pnpm build` | Production build                     |
| `pnpm start` | Start the production server          |
| `pnpm lint`  | Run ESLint (project config)          |

---

## Architecture

### Data flow

```
page.js (scenario state)
    │
    ▼
useOrder hook
    │
    ▼
get-order.js  ──►  mock-data.js
  (simulated API)
    │
    ▼
{ data, loading, error }
    │
    ▼
OrderTrackingScreen  (status-gated render)
```

### Status lifecycle

```
order_confirmed → processing → shipped → out_for_delivery → delivered
tracking_unavailable ≡ order_confirmed  (no tracking yet)
delivered_not_received  ≡ delivered  (step complete, customer unhappy)
```

### Key design decisions

- **Scenario as the single source of truth** — the `scenario` prop flows from `page.js` through `useOrder` to every child component; switching scenarios remounts the screen via React `key`.
- **Status-gated rendering** — `OrderTrackingScreen` uses early-return `if` blocks instead of ternary trees; each branch is a self-contained subtree.
- **Shared fragment** — bottom-sheet elements are defined once (`sheetsFragment`) and rendered in every branch so sheet state is always in sync.
- **No real backend** — `get-order.js` wraps `mock-data.js` in a 1 200 ms delay to simulate network latency; swap it for a real `fetch` call to go to production.

---

## Component Reference

| Component                    | Purpose                                                       |
|------------------------------|---------------------------------------------------------------|
| `OrderTrackingScreen`        | Top-level screen; handles loading / error / state branches    |
| `StatusCard`                 | Headline card with status icon and text                       |
| `ProgressTimeline`           | 5-step stepper; highlights completed steps                    |
| `EtaBanner`                  | Pill/banner showing delivery estimate                         |
| `OrderSummaryCard`           | Product image, quantity, total, address; opens details sheet  |
| `DelayNotice`                | Explains the delay; offers notification signup                |
| `DeliveredNotReceived`       | Warning card with report-issue CTA                            |
| `TrackingUnavailable`        | Placeholder when tracking has not started yet                 |
| `ActionBar`                  | Fixed bottom bar — contact support, live chat                 |
| `OrderDetailsSheet`          | Full order breakdown in a bottom sheet                        |
| `ContactSupportSheet`        | Call / chat / email support options                           |
| `ReportIssueSheet`           | Form to report delivery or product problems                   |
| `TrackingSkeleton`           | Shimmer skeleton matching the loaded layout                   |
| `ErrorState`                 | Generic error screen with retry                               |
| `EmptyState`                 | No-data placeholder                                           |
| `ScenarioSwitcher`           | Dev-only UI to switch mock scenarios                          |

---

## Accessibility

- Semantic HTML elements (`header`, `main`, `button`, `section`)
- `aria-live` regions for dynamic status updates
- Keyboard focus indicators (2 px blue outline via `:focus-visible`)
- Touch targets ≥ 44 px
- Screen-reader labels on icon-only buttons
- Color contrast meets WCAG AA on text and interactive elements

---

## License

Private / assessment project.
