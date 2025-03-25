import { ProductModel } from "../models/product.js";
import { addProductValidator } from "../validators/products.js";

export const addProduct = async (req, res, next) => {
  try {
    console.log(req.auth); //req.file, req.files 
    //validate the product info
    const { error, value } = addProductValidator.validate({
      ...req.body,

      // image: req.file?.filename,
      pictures: req.files?.map((file) => {
        return file.filename;
      })
    }, { abortEarly: false });
    if (error) {
      return res.status(422).json(error);

    }

    //save product in database
    const result = await ProductModel.create({
      ...value,
      userId: req.auth.id
    })
    //return response
    res.status(201).json(result);
  } catch (error) {
    if (error.name === 'MongooseError') {
      return res.status(409).json(error.message);
    }
    next(error);
  }
}

export const getProducts = async (req, res) => {
  //fetch products from database
  try {
    //search query and sort
    const { filter = "{}", sort = "{}" } = req.query;
    //
    const result = await ProductModel
      .find(JSON.parse(filter))
      .sort(JSON.parse(sort));
    //return response
    res.json(result);
  } catch (error) {
    next(error);

  }
}

export const countProducts = (req, res) => {
  res.send('All products count!');
}

export const updateProducts = (req, res) => {
  res.send(`Product with id ${req.params.id} updated!`);
}

export const replaceProducts = async (req, res, next) => {
  //validate incoming request body
  //perform the model replace operation
  const result = await ProductModel.findOneAndReplace(
    { _id: req.params.id },
    req.body,
    { new: true }
  );
  //return a response
  res.status(200).json(result)
}

export const deleteProducts = (req, res) => {
  res.send(`Products with id ${req.params.id} deleted`);
} 