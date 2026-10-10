import http from 'node:http';
import {readFile} from 'node:fs/promises';
import {fileURLToPath} from 'node:url';
import path from 'node:path';
const root=path.dirname(fileURLToPath(import.meta.url));
const files=new Set(['김준희_포트폴리오_토큰_스튜디오.html','김준희_포트폴리오_웹사이트.html','김준희_포트폴리오_웹사이트.js','portfolio-token-studio.js','portfolio-token-studio.css']);
const types={'.html':'text/html; charset=utf-8','.js':'text/javascript; charset=utf-8','.css':'text/css; charset=utf-8'};
http.createServer(async(req,res)=>{try{const requested=decodeURIComponent(new URL(req.url,'http://localhost').pathname).slice(1)||'김준희_포트폴리오_토큰_스튜디오.html';if(!files.has(requested)){res.writeHead(404);res.end('Not found');return;}const body=await readFile(path.join(root,requested));res.writeHead(200,{'Content-Type':types[path.extname(requested)],'Cache-Control':'no-store'});res.end(body);}catch{res.writeHead(404);res.end('Not found');}}).listen(4175,'127.0.0.1',()=>console.log('Portfolio Token Studio: http://127.0.0.1:4175/'));
