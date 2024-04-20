import { Registry, collectDefaultMetrics, Counter } from "prom-client";

// Create a registry to hold metrics
export const registry = new Registry();

// Enable default metrics like CPU usage, memory usage, etc.
collectDefaultMetrics({ register: registry });

// Create a counter to track the number of requests
export const requestCounter: Counter = new Counter({
  name: "total_http_requests_product_service",
  help: "Total number of HTTP requests for the product service",
  registers: [registry],
  labelNames: ["method", "path", "status"],
});
