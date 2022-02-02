const functions = require('./index');
const messages = require('./stats');

const mdLinks = (path, options) => new Promise ((res, rej) => {
    const validPath = functions.absoluteRoute(path);
    if (functions.fileExist(validPath)) {
        const getLinks = functions.getLinks(validPath);
        if (getLinks.length === 0) {
            rej (messages.noLinks) //'error'
        } else {
            if (options.validate === true) {
                const validLinks = functions.getStatusLinks(getLinks);
                res (validLinks)
            } else {
                res (getLinks)
            }
        }
    } else {
        rej (messages.errorPath) // 'noExist'
    }
})
.then((res)=> res.map((prom)=> prom.value ? prom.value : prom))

mdLinks('carpeta-completa', {validate:true})
.then((res)=> console.log(res))

module.exports = {
    mdLinks
}