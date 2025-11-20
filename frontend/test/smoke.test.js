const fs = require('fs')
const path = require('path')
const p = path.join(__dirname, '..', 'dist', 'index.html')
if(!fs.existsSync(p)){
  console.error('SMOKE TEST FAIL: dist/index.html not found. Run `npm run build` first.')
  process.exit(2)
}
console.log('SMOKE TEST OK: dist/index.html exists')