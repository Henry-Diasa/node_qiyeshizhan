const fs = require('fs')
const path = require('path')
const handlebars = require('handlebars')
const promisefy = require('util').promisify;
const stat = promisefy(fs.stat)
const readdir = promisefy(fs.readdir)
const config = require('./defaultConf')
const mime = require('./mime')
const compress = require('./compress')
const range = require('./range')
const isFresh = require('./cache')
//模板
const tplPath = path.join(__dirname,'./templates/dir.tpl')
const source = fs.readFileSync(tplPath)
const template = handlebars.compile(source.toString())
module.exports = async function(req,res,filePath){
    try{
        const stats = await stat(filePath);
        if(stats.isFile()){
            const contentType = mime(filePath)
            res.setHeader('Content-Type',contentType);
            // if(isFresh(stats,req,res)){
            //     res.statusCode = 304;
            //     res.end();
            //     return;
            // }
            let rs;
            // range
            const {code,start,end} = range(stats.size,req,res);
            if(code===200){
                res.statusCode = 200;
                rs = fs.createReadStream(filePath);
            }else{
                res.statusCode = 216;
                rs = fs.createReadStream(filePath,{start,end});
            }
            // compress
            if(filePath.match(config.compress)){
                rs = compress(rs,req,res);
            }
            rs.pipe(res)
        }else if(stats.isDirectory()){
            const files = await readdir(filePath)
            res.statusCode = 200;
            res.setHeader('Content-Type','text/html');
            const dir = path.relative(config.root,filePath)
            const data = {
                title:path.basename(filePath),
                dir:dir ? `/${dir}` : '',
                files,

            }
            console.log(data);
            res.end(template(data))
        }
    }catch(ex){
        res.statusCode = 404;
        res.setHeader('Content-Type','text/plain')
        res.end(`${filePath} is not a directory or file`)
    }
}