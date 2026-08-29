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
  
  // Clean up double borders
  content = content.replace(/border border border-gray-200 rounded-md/g, 'border border-gray-200 rounded-md');
  content = content.replace(/border border border-gray-200/g, 'border border-gray-200');
  
  // Clean up remaining thick borders inside inputs/selects
  content = content.replace(/border-t-2 border-l-2 border-\[#808080\] border-b-white border-r-white/g, 'border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:outline-none');
  
  // Fix text-white on transparent headers
  content = content.replace(/<([A-Za-z]+) className="([^"]*)text-white([^"]*)" \/>/g, (match, tag, before, after) => {
     if(content.includes('bg-transparent text-gray-800')) {
       return `<${tag} className="${before}text-gray-800${after}" />`;
     }
     return match;
  });

  fs.writeFileSync(file, content);
});
console.log('Done 2');
