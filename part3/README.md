[phonebook_backend](../../tree/phonebook_backend)

### a

- npm init 创建新模版
- http server
- express
- nodemon

```
"scripts": {
    "start": "node index.js",
    "dev": "nodemon index.js",
    "test": "echo \"Error: no test specified\" && exit 1"
  },
```

- Visual Studio Code REST client
- postman
- middleware

### b

- cors solve Cors-origin
- heroku
- 从后端提供静态文件：cp -r build ../../../osa3/notes-backend
- app.use(express.static('build'))
- 流程化部署

```
"scripts": {
     //...
    "build:ui": "rm -rf build && cd ../../osa2/materiaali/notes-new && npm run build --prod && cp -r build ../../../osa3/notes-backend/",
    "deploy": "git push heroku master",
    "deploy:full": "npm run build:ui && git add . && git commit -m uibuild && npm run deploy",
    "logs:prod": "heroku logs --tail"
  }
```

- proxy

### c

- MongoDB Atlas
- chrome dev tools (node --inspect index.js)
- mongose

### d

- ESLint
- Promise chaining
- 部署生产数据库到后端
