const fs = require('fs');

let file1 = 'components/ImageEditorModal.tsx';
if (fs.existsSync(file1)) {
  let c1 = fs.readFileSync(file1, 'utf8');
  c1 = c1.replace(/border-t border-l border-gray-600 border-b-white border-r-white/g, 'border border-gray-300 rounded');
  c1 = c1.replace(/border-t-2 border-t-white border-l-2 border-l-white border-b-2 border-b-black border-r-2 border-r-black/g, 'border border-gray-200 rounded-md shadow-sm hover:bg-gray-50');
  c1 = c1.replace(/border-t-2 border-l-2 border-gray-500 border-b-2 border-b-white border-r-2 border-r-white/g, 'border border-gray-300 rounded');
  fs.writeFileSync(file1, c1);
}

let file2 = 'components/Shelf.tsx';
if (fs.existsSync(file2)) {
  let c2 = fs.readFileSync(file2, 'utf8');
  c2 = c2.replace(/border-t-2 border-t-white shadow-\[0_-1px_0px_#808080\]/g, 'border-t border-gray-200');
  fs.writeFileSync(file2, c2);
}

let file3 = 'components/VideoPlayer.tsx';
if (fs.existsSync(file3)) {
  let c3 = fs.readFileSync(file3, 'utf8');
  c3 = c3.replace(/border-t-2 border-t-white/g, 'border-t border-gray-200');
  fs.writeFileSync(file3, c3);
}

console.log('Done 4');
