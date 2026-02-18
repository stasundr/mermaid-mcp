import { z } from "zod";
import { renderMermaidAscii } from "beautiful-mermaid";
import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";

export function registerAsciiTool(server: McpServer) {
  server.registerTool(
    "render_mermaid_ascii",
    {
      description:
        "Render a Mermaid diagram as ASCII/Unicode text. Ideal for embedding diagrams in code comments, terminal output, or plain-text docs.",
      inputSchema: {
        code: z.string().describe("Mermaid diagram source code"),
        useAscii: z
          .boolean()
          .optional()
          .describe(
            "Use pure ASCII characters (+,-,|,>) instead of Unicode box-drawing (default: false)",
          ),
      },
      annotations: {
        readOnlyHint: true,
        openWorldHint: false,
      },
    },
    async ({ code, useAscii }) => {
      try {
        const result = renderMermaidAscii(code, { useAscii });
        return { content: [{ type: "text", text: result }] };
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
