const fs = require('fs');
const path = require('path');

module.exports = function() {
  const localesDir = path.join(__dirname, '../assets/locales');
  const files = fs.readdirSync(localesDir);
  const locales = {};

  files.forEach(file => {
    if (file.endsWith('.json')) {
      const lang = file.split('.')[0];
      const content = fs.readFileSync(path.join(localesDir, file), 'utf-8');
      locales[lang] = JSON.parse(content);
    }
  });

  return locales;
};
