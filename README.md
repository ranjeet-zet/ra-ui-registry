# ra-ui Registry

**20+ production-ready React Native components with zero dependencies.**

Copy-paste components directly into your project with a single CLI command. Inspired by [shadcn/ui](https://ui.shadcn.com).

## Quick Start

```bash
npx ra-ui add button
```

That's it. No init, no config, no setup.

## Available Components

| Component | Description |
|---|---|
| `button` | Pressable button — primary, outline, ghost, error, success, warning + loading + icons |
| `input` | TextInput with label, error, sizes, icons, required indicator |
| `textarea` | Multi-line input with char count, max length, label, error |
| `card` | Card container with Header, Body, Footer sub-components |
| `avatar` | Circular avatar with image, fallback initials, AvatarGroup |
| `badge` | Status badge — default, success, warning, error, info |
| `tag` | Compact label tag — primary, success, error, warning, neutral |
| `chip` | Selectable chip — solid/outlined, icon, sizes |
| `selectable-chip` | Toggle chip with active/inactive state |
| `switch` | Animated toggle — primary, success, warning, error intents |
| `checkbox` | Checkbox with label, checked state, disabled |
| `select` | Dropdown with modal picker, label, error |
| `alert` | Alert banner — info, success, warning, error, primary |
| `toast` | Toast notification with accent border, action button, close |
| `accordion` | Collapsible section with animated expand/collapse |
| `divider` | Horizontal/vertical divider with optional label |
| `tile` | Pressable tile container with subtitle |
| `stepper` | Step progress bar with intent colors |
| `fab` | Floating action button with shadow + absolute position |
| `icon-button` | Pressable icon wrapper — default, primary, ghost |

## Commands

```bash
npx ra-ui list                  # Show all components
npx ra-ui add <name>            # Add a component
npx ra-ui remove <name>         # Remove a component
npx ra-ui add <name> --force    # Overwrite existing
```

## How It Works

1. Components live in this repo as plain `.tsx` files
2. `registry.json` lists all components with metadata
3. The CLI fetches files via jsDelivr CDN and writes them into your project
4. You get the raw source code — edit it, style it, make it yours

## Zero Dependencies

Every component uses only React Native core:
- `Pressable`, `View`, `Text`, `TextInput`
- `StyleSheet`, `Animated`, `Modal`, `FlatList`
- No NativeWind, no Styled Components, no third-party packages

## Custom Output Path

Add to your `package.json`:

```json
{
  "ra-ui": {
    "path": "src/components"
  }
}
```

## Color Palette

All components use a consistent color system:

| Color | Hex | Usage |
|---|---|---|
| Primary | `#832dc2` | Buttons, accents, active states |
| Error | `#ff4961` | Error states, destructive actions |
| Success | `#41bc49` | Success states, confirmations |
| Warning | `#ffa32a` | Warning states, alerts |
| Gray 100 | `#22202F` | Primary text |
| Gray 50 | `#88878F` | Secondary text |
| Gray 20 | `#E2E2E4` | Borders |
| Gray 10 | `#F6F6F7` | Backgrounds |

## Contributing

1. Fork this repo
2. Add your `.tsx` component in `components/`
3. Add an entry in `registry.json`
4. Submit a pull request

## License

MIT
