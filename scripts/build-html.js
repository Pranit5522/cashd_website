const fs = require('fs');
const path = require('path');
const Handlebars = require('handlebars');

// Ensure dist directory exists
if (!fs.existsSync('dist')) {
  fs.mkdirSync('dist', { recursive: true });
}

// Register partials
const partialsDir = path.join(__dirname, '../templates/partials');
if (fs.existsSync(partialsDir)) {
  const partialFiles = fs.readdirSync(partialsDir);
  partialFiles.forEach(file => {
    if (file.endsWith('.hbs')) {
      const partialName = path.basename(file, '.hbs');
      const partialContent = fs.readFileSync(path.join(partialsDir, file), 'utf8');
      Handlebars.registerPartial(partialName, partialContent);
    }
  });
}

// Load data
const dataPath = path.join(__dirname, '../data/site-data.json');
const siteData = fs.existsSync(dataPath) ? JSON.parse(fs.readFileSync(dataPath, 'utf8')) : {};

// Build index.html
const templatePath = path.join(__dirname, '../templates/index.hbs');
const template = Handlebars.compile(fs.readFileSync(templatePath, 'utf8'));
const html = template(siteData);

fs.writeFileSync(path.join(__dirname, '../dist/index.html'), html);
console.log('✓ Built index.html');
