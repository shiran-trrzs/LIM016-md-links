const fs = require ('fs');
const path = require ('path');
const marked = require ('marked');
const axios = require ('axios');

const fileExist = (filePath) => fs.existsSync(filePath) //Devuelve booleano
// console.log(fileExist('ABC.md'))

const absoluteRoute = (filePath) => path.isAbsolute(filePath) ? (filePath) : path.resolve(filePath); //Devuelve ruta abs
// console.log(absoluteRoute( 'file-existente.md'))
// console.log(absoluteRoute('C:/Users/PC/LIM016-md-links/carpeta-con-links/carpeta-sin-links'))

const isDirectory = (filePath) => fs.statSync(filePath).isDirectory();
// console.log(isDirectory('./'))

const isFile = (filePath) => fs.statSync(filePath).isFile();
// console.log(isFile('README.md'))

const readExt = (filePath) => path.extname(filePath)
// //console.log (readExt)

const readDir = (filePath) => fs.readdirSync(filePath);
// console.log (readDir('./'))

const readFile = (filePath) => fs.readFileSync(filePath, 'utf-8');

// const readFile = (filePath) => {
//   return new Promise ((resolve, reject) => {
//     fs.readFile(filePath, 'utf-8', (err, content) => {
//       if(err) reject (err)
//       resolve(content)
//     })
//   })
//   };

//  readFile('ABC.md').then((response)=>{
//   console.log(response)
//   console.log( suma(response,3))
//  }).catch((response) => {
//    console.log(response)
//  })

// function suma(num1,num2){
//   return num1+num2
// }

const pathDirectory = (filePath) => {
    let allFile = [];
    if (isFile(filePath)){
      allFile.push(filePath);
    }
    else {
      readDir(filePath).forEach((file) => {
        const newPath = path.join(filePath, file);
        allFile = allFile.concat(pathDirectory(newPath))
      })
    }
    const onlyFileMd = allFile.filter((filePath) => readExt(filePath) === '.md')
    return onlyFileMd
  }

  // console.log(pathDirectory('carpeta-completa'))

  const getLinks = (filePath) => {
    const renderer = new marked.Renderer() ;
    let allLinks = [];
    pathDirectory(filePath).forEach((file) => {
      const md = readFile(file);
      renderer.link = (href, title, text) => {
         let linksResult =  {
          href: href,
          text: text,
          file: file,
        } 
      allLinks.push(linksResult)
      }     
      marked.use({renderer})
      marked.parse(md)
    })
    return allLinks
  }
  
  // console.log(getLinks('C:\\Users\\PC\\LIM016-md-links\\carpeta-completa\\carpeta-no-links\\file-sin-links.md'))
  // console.log(getLinks('C:\\Users\\PC\\LIM016-md-links\\carpeta-completa\\file-con-links.md'))


const getStatusLinks = (arrayLinks) => {
  const getStatus = arrayLinks.map ((link) => axios.get(link.href)
  .then((res) => {
    link.status = res.status,
    link.ok = (res.status >=200) && (res.status <= 399) ? 'ok' :'fail';
    return link
  })
  .catch((error) => {
    // console.log(error.response.status)
    return  {
      href: link.href,
      text: link.text,
      file: link.file,
      status: error.response ? error.response.status : 'fail',
      ok: 'fail'
    }
  }));
  
 return Promise.allSettled(getStatus).catch(error => console.log(error));
}

// getStatusLinks(getLinks('C:\\Users\\PC\\LIM016-md-links\\carpeta-completa\\file-con-links.md')).then((res) => console.log(res))



module.exports = {
  fileExist,
  absoluteRoute,
  isDirectory,
  pathDirectory,
  getLinks,
  getStatusLinks
};

