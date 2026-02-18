import { z } from "zod";
import { renderMermaid } from "beautiful-mermaid";
import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { resolveTheme, themeNames } from "../lib/themes.ts";

export function registerSvgTool(server: McpServer) {
  server.registerTool(
    "render_mermaid_svg",
    {
      description:
        "Render a Mermaid diagram as an SVG string. Use for saving diagram files for docs or READMEs.",
      inputSchema: {
        code: z.string().describe("Mermaid diagram source code"),
        theme: z
          .enum(themeNames as [string, ...string[]])
          .optional()
          .describe(
            "Built-in theme name (e.g. tokyo-night, github-dark, dracula, nord)",
          ),
        bg: z
          .string()
          .optional()
          .describe("Background hex color, overrides theme"),
        fg: z
          .string()
          .optional()
          .describe("Foreground hex color, overrides theme"),
        transparent: z
          .boolean()
          .optional()
          .describe("Transparent background"),
      },
      annotations: {
        readOnlyHint: true,
        openWorldHint: false,
      },
    },
    async ({ code, theme, bg, fg, transparent }) => {
      try {
        const options = resolveTheme(theme, bg, fg, transparent);
        const svg = await renderMermaid(code, options);
        return { content: [{ type: "text", text: svg }] };
      } catch (err) {
        return {
          content: [
            {
              type: "text",
              text: `Error rendering diagram: ${err instanceof Error ? err.message : String(err)}`,
            },
          ],
          isError: true,
        };
      }
    },
  );
}
