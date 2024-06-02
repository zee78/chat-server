
const
  multer = require('multer'),
  uniqid = require('uniqid');

const imageMimeTypes = [
  "bmp",
  "gif",
  "ico",
  "jpeg",
  "jpg",
  "png",
  "mp4",
  "doc",
  "docx",
  "pdf",
  "avi",
  "svg",
  "webp",
  "PNG"
];

function sanitizeName(name) {
  let regExp = /[^A-Za-z0-9-_()/]/g
  return name.replace(regExp, '');
}

function removeNonLastDot(name) {
  let dotsSplit = name.split('.')
  if (dotsSplit.length == 1) {
    return new Error('Invalid mimetype')
  }
  else if (dotsSplit.length == 2) {
    return name;
  }
  else {
    name = name.replace('.', '')
    return removeNonLastDot(name);
  }
}

/**
 * @param mimeType
 * @description return extension by supplied mimetype'
 * @returns {(string)}
 */
function getFileExtension(mimeType) {
  let extension = mimeType.split('/')[1]
  return '.' + extension;
}

function getStorage(imageDir, imageUrl) {
  console.log(imageDir);
  return multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, `./public/uploads/${imageDir}`)
    },
    filename: function (req, file, cb) {
      let mimeTypeOfSavedFile;
      if (imageMimeTypes.indexOf(removeNonLastDot(file.originalname).split('.')[1].toLowerCase()) != -1) {
        if (file.extensionName === '.svg+xml') {
          file.savedName = `${uniqid()}${'.svg'}`;
        } else {
          file.savedName = `${uniqid()}${file.extensionName}`;
        }
        mimeTypeOfSavedFile = file.mimetype.split('/')[0];
      }
      else {
        let extensionForOtherFileType = removeNonLastDot(file.originalname).split('.')[1];
        file.savedName = `${uniqid()}.${extensionForOtherFileType}`;
        mimeTypeOfSavedFile = extensionForOtherFileType;
      }
      req.savedPic.push({
        id: file.savedName,
        name: file.savedName,
        url: `uploads/${imageUrl}/${file.savedName}`,
        mime_type: mimeTypeOfSavedFile,
        original_name: file.originalname,
        field_name: file.fieldname
      });
      cb(null, file.savedName);
    },
  });
}


// let locationFeaturesIconSetting = multer({
//   storage: getStorage(config.imagesDir.LOCATIONFEATURE.dir, config.imagesDir.LOCATIONFEATURE.url),
//   fileFilter: function (req, file, callback) {
//     if (!file || file == undefined) {
//       return callback(null, false)
//     }
//     else {
//       let fileMimeType = file.mimetype;
//       if (!fileMimeType) {
//         return callback(new Error('No attachment found'), false)
//       }
//       file.extensionName = getFileExtension(fileMimeType);
//       callback(null, true)
//     }
//   }
// }).single('icon')

// ======== truck provider =======================
let multipleFileUploadSetting = multer({
  storage: getStorage('images', 'images'),
  fileFilter: function (req, file, callback) {
    if (!file || file == undefined) {
      return callback(null, false)
    }

    else {
      let fileMimeType = file.mimetype;
      if (!fileMimeType) {
        return callback(new Error('No attachment found'), false)
      }
      var originalname = file.originalname;
      var splt = originalname.split(',');
      var typ = splt[splt.length - 1];
      file.extensionName = '.' + typ
      callback(null, true)
    }
  }
})
  .fields([
    {
      name: 'content',
      maxCount: 10
    }
  ])
module.exports = {
  multipleFileUploadSetting
}
