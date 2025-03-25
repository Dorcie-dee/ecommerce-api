import { Router } from "express";
import { addProduct, countProducts, deleteProducts, getProducts, replaceProducts, updateProducts } from "../controllers/products.js";
import { localUpload, productImageUpload, productPicturesUpload, remoteUpload } from "../middlewares/upload.js";
import { isAuthenticated, isAuthorized } from "../middlewares/auth.js";

//create products router
const productsRouter = Router();

//define routes
productsRouter.post(
  '/products',
  isAuthenticated,
  isAuthorized(['superadmin', 'admin']),
  // productImageUpload.single('image'), 
  productPicturesUpload.array('pictures', 3),
  addProduct
);

productsRouter.get('/products', getProducts);

productsRouter.get('/products/count', countProducts);

productsRouter.patch('/products/:id', isAuthenticated, updateProducts);

productsRouter.put(
  '/products/:id',
  isAuthenticated,
  productPicturesUpload.array('pictures', 3),
  replaceProducts
);

productsRouter.delete('/products/:id', isAuthenticated, deleteProducts);

//export the router
export default productsRouter;
