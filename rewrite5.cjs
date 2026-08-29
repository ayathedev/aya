const fs = require('fs');
const path = require('path');

const walkSync = (dir, filelist = []) => {
  fs.readdirSync(dir).forEach(file => {
    const dirFile = path.join(dir, file);
    try { filelist = walkSync(dirFile, filelist); }
    catch (err) { if (file.endsWith('.tsx')) filelist.push(dirFile); }
  });
  return filelist;
};

let files = ['App.tsx'];
try { files = files.concat(walkSync('components')); } catch(e) {}

files.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  
  content = content.replace(/border border border/g, 'border');
  content = content.replace(/border border/g, 'border');
  content = content.replace(/border-2/g, 'border');
  
  fs.writeFileSync(file, content);
});
console.log('Done 5');
