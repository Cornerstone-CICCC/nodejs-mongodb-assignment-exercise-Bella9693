import { Request, Response } from "express";
import { IProduct } from "../models/product.model";
import productService from "../services/product.service";

// Get all products
const getAllProducts = async (req: Request, res: Response) => {
  try {
    const products = await productService.getAll();
    if (!products) {
      res.status(500).json({ message: "Unable to fetch products!" });
      return;
    }
    res.status(200).json(products);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

// Get product by id
const getProductById = async (req: Request<{ id: string }>, res: Response) => {
  try {
    const product = await productService.getById(req.params.id);
    if (!product) {
      res.status(404).json({ message: "Product not found!" });
      return;
    }
    res.status(200).json(product);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

// Add product
const addProduct = async (req: Request<{}, IProduct>, res: Response) => {
  const { productName, productPrice } = req.body;
  try {
    const newProduct = await productService.add({ productName, productPrice });
    if (!newProduct) {
      res.status(500).json({ message: "Unable to create product!" });
      return;
    }
    res.status(201).json(newProduct);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

// Update product by id
const updateProductById = async (
  req: Request<{ id: string }, Partial<IProduct>>,
  res: Response
) => {
  const { productName, productPrice } = req.body;
  try {
    const updatedProduct = await productService.update(req.params.id, {
      productName,
      productPrice,
    });
    if (!updatedProduct) {
      res.status(404).json({ message: "Product not found!" });
      return;
    }
    res.status(200).json(updatedProduct);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

// Delete product by id
const deleteProductById = async (
  req: Request<{ id: string }>,
  res: Response
) => {
  try {
    const deletedProduct = await productService.remove(req.params.id);
    if (!deletedProduct) {
      res.status(404).json({ message: "Product not found!" });
      return;
    }
    res.status(200).json(deletedProduct);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

export default {
  getAllProducts,
  getProductById,
  addProduct,
  updateProductById,
  deleteProductById,
};
