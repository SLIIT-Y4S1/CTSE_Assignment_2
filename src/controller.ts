import { initLogger } from "./utils/logger";
import { service } from "./service";
import { Request, Response } from "express";
import { registry, requestCounter } from "./utils/metrics";

const logger = initLogger();

export const getProducts = async (req: Request, res: Response) => {
  try {
    const result = await service.getProducts();
    const response = {
      status: "Products found",
      data: result,
    };
    res.status(200).send(response);
    logger.info(response.status);
  } catch (error) {
    const response = {
      status: "Products not found",
      error: error,
    };
    res.status(400).send(response);
    logger.error(response.status);
  } finally {
    requestCounter
      .labels(req.method, req.path, res.statusCode.toString())
      .inc();
  }
};

export const createProduct = async (req: Request, res: Response) => {
  try {
    const result = await service.createProduct(req.body);
    const response = {
      status: "Product created",
      data: result,
    };
    res.status(201).send(response);
    logger.info(response.status);
  } catch (error) {
    const response = {
      status: "Product not created",
      error: error,
    };
    res.status(400).send(response);
    logger.error(response.status);
  } finally {
    requestCounter
      .labels(req.method, req.path, res.statusCode.toString())
      .inc();
  }
};

export const deleteProductById = async (req: Request, res: Response) => {
  try {
    await service.deleteProductById(req.params.id);
    res.status(204).send();
    logger.info("Product deleted");
  } catch (error) {
    const response = {
      status: "Product not deleted",
      error: error,
    };
    res.status(400).send(response);
    logger.error(response.status);
  } finally {
    requestCounter
      .labels(req.method, req.path, res.statusCode.toString())
      .inc();
  }
};

/**
 * Expose the metrics for Prometheus to scrape
 * @param req
 * @param res
 */
export const getMetrics = async (req: Request, res: Response) => {
  try {
    const result = await registry.metrics();
    res.status(200).send(result);
    logger.info("Metrics collected");
  } catch (error) {
    const response = {
      status: "Metrics not collected",
      error: error,
    };
    res.status(400).send(response);
    logger.error(response.status);
  }
};



export const getProductById = async (req: Request, res: Response) => {
  try {
    const result = await service.getProductById(req.params.id);
    const response = {
      status: "Product found",
      data: result,
    };
    res.status(200).send(response);
    logger.info(response.status);
  } catch (error) {
    const response = {
      status: "Product not found",
      error: error,
    };
    res.status(400).send(response);
    logger.error(response.status);
  } finally {
    requestCounter
      .labels(req.method, req.path, res.statusCode.toString())
      .inc();
  }
};


export const updateProductById = async (req: Request, res: Response) => {
  try {
    const result = await service.updateProductById(req.params.id, req.body);
    const response = {
      status: "Product updated",
      data: result,
    };
    res.status(200).send(response);
    logger.info(response.status);
  } catch (error) {
    const response = {
      status: "Product not updated",
      error: error,
    };
    res.status(400).send(response);
    logger.error(response.status);
  } finally {
    requestCounter
      .labels(req.method, req.path, res.statusCode.toString())
      .inc();
  }
};