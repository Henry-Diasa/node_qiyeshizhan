const {createGzip,createDeflate}  = require('zlib')

module.exports = (rs,req,res) => {

    const acceptEncoding = req.headers['accept-encoding'];
    console.log('我是coding',acceptEncoding);
    if(!acceptEncoding || !acceptEncoding.match(/\b(gzip|deflate)\b/)){
        console.log('我是没压缩吗')
        return rs;
    }else if(acceptEncoding.match(/\bgzip\b/)){
        console.log('gzip 进啦了')
        res.setHeader('Content-Encoding','gzip')
        return rs.pipe(createGzip())
    }else if(acceptEncoding.match(/\bdeflate\b/)){
        console.log('deflate 进啦了')
        res.setHeader('Content-Encoding','deflate')
        return rs.pipe(createDeflate())
    }
}