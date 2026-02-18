# mermaid-mcp

MCP server that renders Mermaid diagrams as SVG or ASCII art. Zero browser dependencies — pure computation via [beautiful-mermaid](https://github.com/nicobailon/beautiful-mermaid).

## Tools

### `render_mermaid_svg`

Renders a Mermaid diagram to an SVG string. Supports built-in themes and custom colors.

| Parameter     | Type    | Description                          |
| ------------- | ------- | ------------------------------------ |
| `code`        | string  | Mermaid diagram source code          |
| `theme`       | string? | Built-in theme name                  |
| `bg`          | string? | Background hex color, overrides theme|
| `fg`          | string? | Foreground hex color, overrides theme|
| `transparent` | bool?   | Transparent background               |

Available themes: `zinc-dark`, `tokyo-night`, `tokyo-night-storm`, `tokyo-night-light`, `catppuccin-mocha`, `catppuccin-latte`, `nord`, `nord-light`, `dracula`, `github-light`, `github-dark`, `solarized-light`, `solarized-dark`, `one-dark`

### `render_mermaid_ascii`

Renders a Mermaid diagram as ASCII/Unicode text for terminals, code comments, or plain-text docs.

| Parameter  | Type   | Description                                              |
| ---------- | ------ | -------------------------------------------------------- |
| `code`     | string | Mermaid diagram source code                              |
| `useAscii` | bool?  | Use pure ASCII (`+`,`-`,`\|`,`>`) instead of Unicode box-drawing |

## Supported diagrams

Flowcharts, graphs, sequence diagrams, state diagrams, class diagrams, ER diagrams, and more.

## Setup

Requires [Bun](https://bun.sh).

```bash
bun install
```

### Claude Code

Add to `~/.claude/claude_desktop_config.json`:

```json
{
  "mcpServers": {
    "mermaid": {
      "command": "bun",
      "args": ["run", "/absolute/path/to/mermaid-mcp/src/index.ts"]
    }
  }
}
```

### Claude Desktop

Same config in Claude Desktop settings under MCP servers.

## License

MIT
