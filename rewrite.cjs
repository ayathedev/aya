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
  
  // Specific pattern replacements
  content = content.replace(/os-window/g, 'bg-white rounded-xl shadow-sm border border-gray-200');
  content = content.replace(/win95-inset/g, 'bg-gray-50/50 rounded-lg border border-gray-200/60');
  content = content.replace(/material-btn/g, 'px-4 py-2 bg-white border border-gray-200 rounded-md shadow-sm hover:bg-gray-50 transition-all font-medium text-sm');
  content = content.replace(/win95-btn/g, 'px-4 py-2 bg-white border border-gray-200 rounded-md shadow-sm hover:bg-gray-50 transition-all font-medium text-sm');
  
  // Title bars
  content = content.replace(/bg-\[#000080\] text-white/g, 'bg-transparent text-gray-800 border-b border-gray-100');
  
  // Colors and Borders
  content = content.replace(/bg-\[#c0c0c0\]/g, 'bg-white');
  content = content.replace(/bg-\[#dfdfdf\]/g, 'bg-gray-100');
  content = content.replace(/border-t-white border-l-white border-b-black border-r-black/g, 'border border-gray-200 rounded-md');
  content = content.replace(/border-t-\[#808080\] border-l-\[#808080\] border-b-white border-r-white/g, 'border border-gray-200 rounded-md');
  content = content.replace(/active:border-t-black active:border-l-black active:border-b-white active:border-r-white/g, 'active:scale-95 transition-transform');
  
  // Typography updates
  content = content.replace(/text-\[9px\]/g, 'text-xs');
  content = content.replace(/text-\[10px\]/g, 'text-xs');
  content = content.replace(/text-\[11px\]/g, 'text-sm');
  content = content.replace(/tracking-wide/g, 'tracking-normal');
  content = content.replace(/uppercase/g, ''); // maybe dangerous but usually cleans up the win95 look

  // Some cleanup for extra borders left behind
  content = content.replace(/border-2 border border-gray-200 rounded-md/g, 'border border-gray-200 rounded-md');
  content = content.replace(/border-2 border-t-white border-l-white border-b-black border-r-black/g, 'border border-gray-200 rounded-md');
  
  fs.writeFileSync(file, content);
});
console.log('Done');
