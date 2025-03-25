import multer from "multer";
import { v2 as cloudinary } from 'cloudinary';
import { CloudinaryStorage } from "multer-storage-cloudinary";
import { multerSaveFilesOrg } from "multer-savefilesorg";


cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});


export const productPicturesUpload = multer({
  storage: new CloudinaryStorage({
    cloudinary,
    params: {
      folder: "/ecommerce-api/product-pictures",
      // format: async (req, file) => 'png', // supports promises as well
      // public_id: (req, file) => 'computed-filename-using-request',
    }
  })
})



//create a variable name which multer would use and tell multer the destination you want it to appear 
export const localUpload = multer({ dest: 'uploads' });
//we use the  localUploadds in the route by using import {}... and this creates an upload folder

export const remoteUpload = multer({
  storage: multerSaveFilesOrg({
    apiAccessToken: process.env.SAVEFILESORG_API_KEY,
    relativePath: '/ecommerce-api/*'
  })
})


export const productImageUpload = multer({
  storage: multerSaveFilesOrg({
    apiAccessToken: process.env.SAVEFILESORG_API_KEY,
    relativePath: '/ecommerce-api/product-images/*'
  })
})


// export const productPicturesUpload = multer({
//   storage: multerSaveFilesOrg({
//     apiAccessToken: process.env.SAVEFILESORG_API_KEY,
//     relativePath: '/ecommerce-api/product-pictures/*'
//   })
// })