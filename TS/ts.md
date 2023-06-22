- why typescript

  - 不需要运行就能看到错误提示
  - 类型检查和代码分析，减少单元测试数量，减少不必要的错误
  - 拼错变量名函数名
  - 类型注解可以作为代码级文档
  - 有类型，代码易懂，容易接手

  缺点：

  - 外部库不完整
  - 有时候类型推断需要帮助
  - 有时候类型系统给出的错误很难理解，往往从最后获取有效信息

- 类型注解
  const birthdayGreeter = (name: string, age: number): string => {return "\*\*"}
- 结构化类型
- 类型推断
- 类型擦出，编译期间所有类型

- npm install -g(or --save-dev) ts-node typescript
- scripts: "ts-node": "ts-node"
- npm run ts-node -- file.ts

- 定义一个联合类型

  - type Operation = 'nultiply' | 'add' | 'divide';

- switch...cast default 错误处理
- npm install --save-dev @types/node process 为 Node 全局变量

- npm install express
- npm install --save-dev @types/express

- npm install --save-dev ts-node-dev for auto reloading
- scripts "dev": "ts-node-dev index.ts"

- npm install --save-dev eslint @typescript-eslint/eslint-plugin @typescript-eslint/parser
- .eslintrc
- scripts "lint": "eslint --ext .ts ."

官方的 typescript 编译器

- npm install typescript --save-dev
- scripts "tsc": "tsc"
- npm run tsc -- --init
- npm install --save-dev ts-node-dev
- scripts "dev" and "lint"

- 类型断言 as
- ? 可选
- 使用工具类型 Pick，选择我们要使用的字段 Pick<Diary, 'id' | 'date'>[]
- Omit 排除字段
- 或者使用全新类型 type NonSensitiveDiaryEntry = Omit<DiaryEntry, 'comment'>
- | undefined
- 类型保护
- 枚举类型

- npx create-react-app my-app --template typescript
- .js .jsx -> .ts .tsx
- "lint": "eslint './src/\*_/_.{ts,tsx}'"

- extends
- never 穷举类型检查，永远不能被使用
- interface or type are same, but interface is better
- io-ts 验证工具？
- Formik 验证表单
