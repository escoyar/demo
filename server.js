const http = require('http');
const fs = require('fs');
const path = require('path');
const port = process.env.PORT || 5173;
const root = path.resolve(__dirname);
const mime = {
  '.html':'text/html', '.css':'text/css', '.js':'application/javascript', '.json':'application/json', '.png':'image/png', '.jpg':'image/jpeg', '.svg':'image/svg+xml', '.webp':'image/webp', '.ico':'image/x-icon'
};

http.createServer((req,res)=>{
  try{
    let url = decodeURIComponent(req.url.split('?')[0]);
    if(url === '/') url = '/index.html';
    const filePath = path.join(root, url);
    fs.stat(filePath, (err, stats)=>{
      if(err || !stats.isFile()){
        res.writeHead(404, {'Content-Type':'text/plain; charset=utf-8'});
        res.end('Not found');
        return;
      }
      const ext = path.extname(filePath).toLowerCase();
      const type = mime[ext] || 'application/octet-stream';
      res.writeHead(200, {'Content-Type': type});
      const stream = fs.createReadStream(filePath);
      stream.pipe(res);
    });
  }catch(e){
    res.writeHead(500, {'Content-Type':'text/plain; charset=utf-8'});
    res.end('Server error');
  }
}).listen(port, ()=> console.log('Static server running at http://localhost:'+port));
