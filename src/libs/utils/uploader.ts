import multer from "multer";
import path from "path";
import { v4 } from "uuid";

// multi image uploader

function getTargetImageStore(address: any) {
  return multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, `./uploads/${address}`);
    },
    filename: function (req, file, cb) {
      const extension = path.parse(file.originalname).ext;
      const random_name = v4() + extension;
      cb(null, random_name);
    },
  });
}

const makeUpLoader = (adress: string) => {
  const storage = getTargetImageStore(adress);
  return multer({ storage: storage });
};

export default makeUpLoader;
