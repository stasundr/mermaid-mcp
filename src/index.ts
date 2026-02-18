#!/usr/bin/env bun

import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { registerAsciiTool } from "./tools/render-ascii.ts";
import { registerSvgTool } from "./tools/render-svg.ts";

const server = new McpServer({
  name: "mermaid",
  version: "1.0.0",
});

registerAsciiTool(server);
registerSvgTool(server);

const transport = new StdioServerTransport();
await server.connect(transport);
console.error("Mermaid MCP server running on stdio");
