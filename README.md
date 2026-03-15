# ra-ui

**37 React Native components. Zero dependencies. One command.**

Like [shadcn/ui](https://ui.shadcn.com) — but for React Native.

[![npm](https://img.shields.io/npm/v/ra-ui.svg)](https://www.npmjs.com/package/ra-ui)
[![components](https://img.shields.io/badge/components-37-8b5cf6)]()
[![dependencies](https://img.shields.io/badge/dependencies-0-22c55e)]()
[![license](https://img.shields.io/npm/l/ra-ui.svg)](https://opensource.org/licenses/MIT)

**Website:** [ra-ui-rho.vercel.app](https://ra-ui-rho.vercel.app)

---

## Quick Start

```bash
npx ra-ui add button
```

That's it. No install, no init, no config. The component is in your project.

## All Components

| # | Component | Description |
|---|---|---|
| 1 | `accordion` | Vertically stacked collapsible sections |
| 2 | `alert` | Callout for important messages |
| 3 | `alert-dialog` | Modal dialog expecting a response |
| 4 | `avatar` | Image with fallback initials |
| 5 | `badge` | Small status label |
| 6 | `breadcrumb` | Navigation path hierarchy |
| 7 | `button` | Button with 6 variants + loading state |
| 8 | `calendar` | Date calendar for selecting dates |
| 9 | `card` | Container with header, content, footer |
| 10 | `carousel` | Swipeable content carousel |
| 11 | `checkbox` | Toggle between checked and unchecked |
| 12 | `collapsible` | Expand and collapse content |
| 13 | `date-picker` | Date picker with calendar popup |
| 14 | `dialog` | Modal overlay with sections |
| 15 | `dropdown-menu` | Action menu triggered by a button |
| 16 | `input` | Text input with label and error |
| 17 | `input-otp` | One-time password input |
| 18 | `label` | Accessible form label |
| 19 | `pagination` | Page navigation controls |
| 20 | `popover` | Floating content panel |
| 21 | `progress` | Progress bar indicator |
| 22 | `radio-group` | Single selection from options |
| 23 | `scroll-area` | Scrollable container with constraints |
| 24 | `select` | Dropdown option picker |
| 25 | `separator` | Horizontal or vertical divider |
| 26 | `sheet` | Bottom or side sliding panel |
| 27 | `skeleton` | Loading placeholder with animation |
| 28 | `slider` | Range input with draggable thumb |
| 29 | `switch` | Animated toggle between two states |
| 30 | `table` | Responsive data table |
| 31 | `tabs` | Tabbed content sections |
| 32 | `textarea` | Multi-line text input |
| 33 | `toast` | Temporary notification message |
| 34 | `toggle` | Two-state on/off button |
| 35 | `toggle-group` | Group of toggle buttons |
| 36 | `tooltip` | Popup on hover or press |
| 37 | `scroll-area` | Scrollable area with constraints |

## Commands

```bash
npx ra-ui list                  # Show all components
npx ra-ui add <name>            # Add a component
npx ra-ui remove <name>         # Remove a component
npx ra-ui add <name> --force    # Overwrite existing file
```

## Usage

```tsx
import { Button } from "./components/ui/button";

<Button title="Default" onPress={() => {}} />
<Button title="Destructive" variant="destructive" onPress={() => {}} />
<Button title="Outline" variant="outline" onPress={() => {}} />
<Button loading onPress={() => {}} />
```

## How It Works

```
npx ra-ui add button
        |
        v
  Fetches from GitHub via jsDelivr CDN
        |
        v
  Writes button.tsx to your project
        |
        v
  You own the code. Edit anything.
```

1. Components live in this repo as plain `.tsx` files
2. `registry.json` lists all components with metadata
3. The CLI fetches files via jsDelivr CDN (200+ edge servers worldwide)
4. Files are written directly into your project — no runtime dependency
5. CDN cache auto-purges on every push via GitHub Actions

## Zero Dependencies

Every component uses **only** React Native core primitives:

```
Pressable · View · Text · TextInput · ScrollView
StyleSheet · Animated · Modal · FlatList · PanResponder
```

No NativeWind. No Styled Components. No third-party packages. Works in any React Native or Expo project out of the box.

## Custom Output Path

By default, components go to `src/components/ui/`. To change:

```json
// package.json
{
  "ra-ui": {
    "path": "src/components"
  }
}
```

## Architecture

```
Your Terminal              This Repo               jsDelivr CDN
┌──────────────┐     ┌──────────────────┐     ┌──────────────┐
│ npx ra-ui    │────>│ registry.json    │────>│ Cached copy  │
│   add button │     │ components/      │     │ 200+ servers │
│              │<────│   button.tsx     │<────│ worldwide    │
└──────┬───────┘     └──────────────────┘     └──────────────┘
       │
       v  writes file
┌──────────────┐
│ Your Project │
│ src/         │
│  components/ │
│   ui/        │
│    button.tsx│  <-- you own this
└──────────────┘
```

## Tech Stack

| Layer | Technology |
|---|---|
| CLI | Node.js + Commander |
| CDN | jsDelivr (free, unlimited) |
| Registry | This GitHub repo |
| Components | React Native + TypeScript |
| Website | Next.js + Tailwind CSS |
| CI/CD | GitHub Actions (auto CDN purge) |

## Contributing

1. Fork this repo
2. Add your `.tsx` file in `components/`
3. Add an entry in `registry.json`
4. Submit a pull request

Every component must:
- Use only React Native core imports
- Be fully typed with TypeScript
- Have zero external dependencies
- Export named functions (not default)

## Links

- **Website:** [ra-ui-rho.vercel.app](https://ra-ui-rho.vercel.app)
- **npm:** [npmjs.com/package/ra-ui](https://www.npmjs.com/package/ra-ui)
- **CLI repo:** [github.com/ranjeet-zet/ra-ui-registry](https://github.com/ranjeet-zet/ra-ui-registry)

## License

MIT
