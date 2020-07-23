const fs = require('fs').promises
const path = require('path')

const dataDir = 'server/data'
const _ = require('lodash')

/*
 懒得用库了，自己解析一下
 目标：省,省确诊,省治愈,省死亡,市,新增确诊,新增治愈,新增死亡,确诊,治愈,死亡,日期
 to: [
   省: {
     确诊
     治愈
     死亡
     市: [
       市: {
         确诊
         治愈
         死亡
         新增确诊
         新增治愈
         新增死亡
       },
     ]
   }
  ]
 */

let lastCases
const getLastCases = async () => {
  if (lastCases) return lastCases

  const lastFile = await fs.readdir(dataDir)
    .then((files) => files.filter((file) => file.startsWith('nCov_china'))
      .sort()
      .pop())

  const content = await fs.readFile(path.join(dataDir, lastFile), 'utf-8').then((data) => {
    const rows = data.split('\r\n')
    const headers = rows[0].split(',')
    const rowData = rows.slice(4, 10)
    const mapedData = rowData.map((row) => {
      const values = row.split(',')
      const result = {}
      values.forEach((value, index) => {
        result[headers[index]] = value
      })
      return result
    })

    const groupByProvince = _(mapedData).groupBy(headers[0])
    const result = {}
    _(groupByProvince).forEach((list, key) => {
      const saved = _(list[0]).pick([headers[1], headers[2], headers[3], headers[11]]).value()

      const grouped = _(list)
        .map((item) => _(item)
          .pick([headers[4], headers[5], headers[6], headers[7], headers[8], headers[9], headers[10], headers[11]]).value())
        .groupBy(headers[4]).value()

      result[key] = { ...saved, 市: { ...grouped } }
    })
    return result
  })
  lastCases = content
  return content
}

module.exports = { getLastCases }
