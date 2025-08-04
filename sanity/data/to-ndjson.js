const fs = require('fs');
const path = require('path');

function convertAndSave(jsonPath, outputFilename) {
  const jsonFullPath = path.join(__dirname, jsonPath);
  const outputFullPath = path.join(__dirname, outputFilename);

  const data = JSON.parse(fs.readFileSync(jsonFullPath, 'utf8'));
  const ndjson = data.map((doc) => JSON.stringify(doc)).join('\n');

  fs.writeFileSync(outputFullPath, ndjson);
}

convertAndSave('items.json', 'items.ndjson');

convertAndSave('characters.json', 'characters.ndjson');