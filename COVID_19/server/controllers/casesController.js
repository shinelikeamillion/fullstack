const { ApplicationError } = require('@util/customErrors')
const { getLastCases } = require('@util/dataReader')

const getAll = async (req, res) => {
  const cases = await getLastCases()
  res.json(cases)
}

const getByProvince = async (req, res) => {
  const cases = await getLastCases()
  const { province } = req.params
  if (!province) throw ApplicationError('请填入参数', 400)
  const result = cases.find((item) => Object.keys(item).includes(province))
  res.json(result)
}

module.exports = { getAll, getByProvince }
