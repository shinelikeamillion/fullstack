const inProduction = process.env.NODE_ENV === 'production'

const appKeyBaiDu = process.env.APP_KEY_BAIDU

module.exports = {
  inProduction,
  appKeyBaiDu,
}
