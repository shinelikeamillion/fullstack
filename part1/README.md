## part1

### a. Exercises 1.1.-1.2.

- npx create-react-app
- rm -rf .git 移除默认添加的 git 仓库
- 维护一个清晰的结构
  ```
  part0
  part1
      courseinfo
      unicafe
      anecdotes
  part2
      phonebook
      countries
  ```

### b. Exercises1.3-1.5

- Babel; chromeV8;
- let & const; 不可变数据结构 与 concat
- Boolean; Null; Undefined; Number; String; Symbol; Bigint; Object;
- 1.3 使用 console.log(props) 调试
- 1.4 定义变量来重构应用
- 1.5 将课程和章节合成一个对象

### c. Component, Event

- 解构语法
- 事件处理传函数，否则在第一次渲染的时候会调用方法，会触发更新进入循环
  ```
  !! Wrong
  <button onClick={setCounter(counter + 1)}>
  ```
- 传递状态给子组件（状态提升：反应相同变化数据的状态提升到最近公共祖先）
- 使用 hook 函数
- 条件渲染

### d. Exercises 1.6.-1.14.

- 复杂状态，多次使用 useState 创建单独片段
- 或者保存到一个对象；使用展开语法更新 {...state, left: left+1}

#### 1.6: unicafe

- 收集用户的反馈的 web 应用
- 三种选择 good, neutral or bad
- 刷新页面数据会丢失

  ```sample
  give feedback

  good neurural bad
  statistics
  good 6
  neutral 2
  bad 1
  ```

- 1.8 抽取组件重构应用
- 1.9 根据状态做不同响应（渲染不同的 view）
- 1.11\* 使用 [tables](https://developer.mozilla.org/en-us/docs/learn/HTML/tables/basics)
  - 解决 tbody 报错问题

### 1.12\* anecdotes

- 1.12 随机显示给定箴言
- 1.13 拓展应用显示投票（使用副本更新状态）
- 1.14 最终版本，显示得票最多的警局
