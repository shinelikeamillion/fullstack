/**
found there are some links typo issue in chinese resourse
this potato tool can find them all. ?
but it works
*/

const base_dir = "../fullstack-hy2020.github.io/src/content"
const path = require('path')
const fs = require('fs')

main = _ => {
  fs.readdir(base_dir, (err, files) => {
    if (!err) {
      files
        .filter(file => (parseInt(file)))
        .map(file => {
          getFiles(base_dir, file)
        })
    }
  })
}

function getFiles(base, file) {
  const curPath = path.join(base, file)
  fs.lstat(curPath, (err, stats) => {
    if (err) console.log(err)
    else {
      if (stats.isFile() && base.endsWith('zh')) getLinks(curPath)
      else if (stats.isDirectory()) {
        fs.readdir(curPath, (err, files) => {
          files.map((file) => {
            if (!err) getFiles(curPath, file)
          })
        })
      }
    }
  })
}

function getLinks(file) {
  fs.readFile(file, 'utf-8', (err, data) => {
    if (!err) {
      let links = data.match(relink) ?? []
      links = links.filter((item, index) => links[index + 1] !== item && links[index - 1] !== item)
      links = links.filter((item, index) => links.indexOf(item) === index).map(s => s.replace(qouter, ''))
      let conmmetnLins = getCommenedLinks(data).map(s => s.toLowerCase())
      const result = links.filter(link => conmmetnLins.indexOf(link.toLowerCase()) === -1)
      console.log(`geting links from ${file}`)
      console.log(result)
    }
  })
}
const reConments = /<!--(.*)-->/g
const relink = /\((http:|https:)\/\/[^\s|\(|\))]+\)/g
// const relink = /\([^\<)]+\)/g
const qouter = /\(|\)/g
function getCommenedLinks(data) {
  return data.match(reConments) ?? []
    .map(str => {
      const links = str.match(relink)
      return (links ?? []).map(s => s.replace(qouter, ''))
    })
    .flat()
}

// let data = "(ww )的课程，如[开始学习React](https://Egghead.io/courses/Start-learning-React ew)"
// console.log(data.match(/\(.*\)/g))
main()
