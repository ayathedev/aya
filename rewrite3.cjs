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
  
  // Clean up remaining ugly borders
  content = content.replace(/border-t-black border-l-black border-b-white border-r-white/g, 'border-gray-200');
  content = content.replace(/border-t-gray-600 border-l-gray-600 border-b-white border-r-white/g, 'border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:outline-none');
  
  // Some font cleanup
  content = content.replace(/font-mono/g, 'font-sans');
  content = content.replace(/bg-\[#000080\]/g, 'bg-blue-600');
  content = content.replace(/text-\[#000080\]/g, 'text-blue-600');
  content = content.replace(/cursor-crosshair/g, 'cursor-pointer');
  content = content.replace(/bg-black border border-gray-200 rounded-md p-\[1px\]/g, 'bg-gray-100 border border-gray-200 rounded-md p-1');
  
  fs.writeFileSync(file, content);
});
console.log('Done 3');
