import { createServer } from "@modelcontextprotocol/sdk/server/index.js";

const server = createServer({
  tools: [
    {
      name: "testTool",
      description: "Angular 16 MCP test",
      inputSchema: { type: "object", properties: {} },
      handler: async () => {
        return { content: "MCP server working with Angular 16 🚀" };
      }
    }
  ]
});

server.listen();