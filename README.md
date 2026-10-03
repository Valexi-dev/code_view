# Constraint Book

A 38.2-second Remotion recreation of the paper-theatre animation: a warm, dim tabletop; a folded book that opens into a moonlit seaside scene; paper storyboard cards for 1925–2035; and Chinese caption strips that build toward the idea that constraints make a work distinctive.

The composition is built from React and CSS shapes, gradients, and perspective transforms. It does not include the private reference video or its signed URL. The export is silent; the source recording's narration and music are not included.

## Requirements

- Node.js 20 or newer
- npm

## Run

```bash
npm install
npm run dev
```

## Render

```bash
npm run render
```

The MP4 is written to `out/constraint-book.mp4` at 1920×1080, 30 fps. To render a still for visual inspection:

```bash
npm run still
```

The composition is registered in `src/root.tsx`; the scene and animation timing are in `src/video/ConstraintBook.tsx`, with visual styles in `src/video/style.css`.
