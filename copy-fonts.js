const path = require('path');
const fs = require('fs');
const copydir = require('copy-dir');

const SOURCE_DIRECTORY = path.resolve(__dirname, 'src', 'fonts');
const TARGET_DIRECTORY = path.resolve(__dirname, 'lib', 'fonts');

const SOURCE_CSS_FILE = path.resolve(__dirname, 'src', 'fonts.css');
const TARGET_CSS_FILE = path.resolve(__dirname, 'lib', 'fonts.css');

try {
  try {
    fs.lstatSync(TARGET_DIRECTORY);
  } catch (directoryExistsException) {
    fs.mkdirSync(TARGET_DIRECTORY);
  }

  const cssReadStream = fs.createReadStream(SOURCE_CSS_FILE);
  const cssWriteStream = fs.createWriteStream(TARGET_CSS_FILE);

  copydir.sync(SOURCE_DIRECTORY, TARGET_DIRECTORY);

  cssReadStream.pipe(cssWriteStream);

  console.log('Fonts successfully copied.');
} catch (exception) {
  throw exception;
}