# Four Agent Workflows

A 38.2-second Remotion explainer comparing four coding-agent workflows through one fictional settings-page task. Each product gets a distinct illustrative demo: Codex task workspaces and review, TRAE Work's IDE/SOLO modes, DeepSeek Harness's composable plugins and trajectory, and Claude Code's terminal workflow with subagents and hooks.

The interface scenes are explanatory illustrations, not captures of the products. Feature descriptions are based on official product documentation:

- [Codex Cloud](https://help.openai.com/en/articles/20001545-using-codex-cloud)
- [TRAE Work](https://www.trae.ai/blog/trae_work_0609)
- [DeepSeek Harness](https://deepseek.com/harness/en/)
- [Claude Code CLI](https://docs.anthropic.com/en/docs/claude-code/cli-usage) and [Claude Code autonomous workflows](https://www.anthropic.com/news/enabling-claude-code-to-work-more-autonomously)

The composition is built from React and CSS shapes, gradients, and perspective transforms. The private reference video and its signed URL are not included. The export is silent; the source recording's narration and music are not included.

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
