const app = require("../app");
const db = require("../model/db");
const createFolderIsExist = require("../helpers/create-directory");
const PORT = process.env.PORT || 3000;

db.then(() => {
  app.listen(PORT, async () => {
    const DIR_UPLOAD = process.env.DIR_UPLOAD;
    const DIR_IMAGES = process.env.DIR_IMAGES;
    await createFolderIsExist(DIR_UPLOAD);
    await createFolderIsExist(DIR_IMAGES);
    console.log(`Server running. Use our API on port: ${PORT}`);
  });
}).catch((err) => {
  console.log(`Server not running. Error message: ${err.message}`);
  process.exit(1);
});
