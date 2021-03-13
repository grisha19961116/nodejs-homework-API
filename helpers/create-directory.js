const fs = require("fs/promises");

const isAccessible = (pathFolder) => {
  return fs
    .access(pathFolder)
    .then(() => true)
    .catch(() => false);
};

const createFolderIsExist = async (folder) => {
  if (!(await isAccessible(folder))) {
    await fs.mkdir(folder);
  }
};
module.exports = createFolderIsExist;
