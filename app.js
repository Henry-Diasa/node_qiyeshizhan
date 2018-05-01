const http = require('http');
const chalk = require('chalk')
const conf = require('./defaultConf')
const path = require('path')
const route = require('./route')
const server = http.createServer((req,res)=>{
    // 访问路径
    const filePath = path.join(conf.root,req.url)
    // 判断文件类型
    route(req,res,filePath)
})


server.listen(conf.port,conf.hostname,()=>{
    const addr = `http://${conf.hostname}:${conf.port}`;
    console.log(`Server started at ${chalk.green(addr)}`)
})