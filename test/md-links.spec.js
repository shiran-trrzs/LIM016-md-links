const {fileExist, absoluteRoute, isDirectory, pathDirectory, getLinks, getStatusLinks} = require('../index');

const arrayDetailLinks = [
  {
    href: 'https://es.wikipedia.org/wiki/Markdown',
    text: 'Markdown',
    file: 'C:\\Users\\PC\\LIM016-md-links\\carpeta-completa\\file-con-links.md'
  },
  {
    href: 'https://laboratoria.la/lapizza',
    text: 'Laboratoria',
    file: 'C:\\Users\\PC\\LIM016-md-links\\carpeta-completa\\file-con-links.md'
  },
  {
    href: 'https://twitter.com/home',
    text: 'Twitter',
    file: 'C:\\Users\\PC\\LIM016-md-links\\carpeta-completa\\file-con-links.md'
  }
]

const arrayStatusLinks = [
  {
    status: 'fulfilled',
    value: {
      href: 'https://es.wikipedia.org/wiki/Markdown',
      text: 'Markdown',
      file: 'C:\\Users\\PC\\LIM016-md-links\\carpeta-completa\\file-con-links.md',
      status: 200,
      ok: 'ok'
    }
  },
  {
    status: 'fulfilled',
    value: {
      href: 'https://laboratoria.la/lapizza',
      text: 'Laboratoria',
      file: 'C:\\Users\\PC\\LIM016-md-links\\carpeta-completa\\file-con-links.md',
      status: 404,
      ok: 'fail'
    }
  },
  {
    status: 'fulfilled',
    value: {
      href: 'https://twitter.com/home',
      text: 'Twitter',
      file: 'C:\\Users\\PC\\LIM016-md-links\\carpeta-completa\\file-con-links.md',
      status: 200,
      ok: 'ok'
    }
  }
]

describe ('fileExist', () => {
  it('Comprobar que el archivo existe', () => {
    const file = './file-existente.md';
    expect(fileExist(file)).toBe(true);
  });

});

describe ('absoluteRoute', () => {
  it('Convertir una ruta relativa a absoluta', () => {
    const route = 'file-existente.md';
    expect(absoluteRoute(route)).toEqual(`C:\\Users\\PC\\LIM016-md-links\\file-existente.md`);
  })
})

describe ('isDirectory', () => {
  it('Comprobar que la ruta es un directorio', () => {
    const directory = 'carpeta-completa';
    expect(isDirectory(directory)).toBe(true)
  })
})

describe ('pathDirectory', () => {
  it('Comprobar que solo extrae archivos md', () => {
    const onlyMd = 'carpeta-completa';
    expect(pathDirectory(onlyMd)).toEqual([
      'carpeta-completa\\carpeta-no-links\\file-sin-links.md',
      'carpeta-completa\\file-con-links.md'
    ])
  })
})

describe ('getLinks', () => {
  it('Devuelve un array de objetos conteniendo href, text, file de los links', () => {
    const getLink = 'C:\\Users\\PC\\LIM016-md-links\\carpeta-completa\\file-con-links.md';
    expect(getLinks(getLink)).toEqual(arrayDetailLinks)
  })

  it('Devuelve un array vacío cuando no encuentra links', () => {
    const getLink = 'C:\\Users\\PC\\LIM016-md-links\\carpeta-completa\\carpeta-no-links\\file-sin-links.md';
    expect(getLinks(getLink)).toEqual([])
  })
})

describe('getStatusLinks', () => {
  it('Devuelve un array de objetos conteniendo href, text, file, status y ok/fail', () => {
    expect(getStatusLinks(arrayDetailLinks)).resolves.toStrictEqual(arrayStatusLinks)
  })
})