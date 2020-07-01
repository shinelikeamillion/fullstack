## part1

### a. Exercises 1.1.-1.2.
* 维护一个清晰的结构
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
* npx create-react-app
* rm -rf .git 移除默认添加的 git 仓库

### b. Exercises1.3-1.5
* 1.3 使用 console.log(props) 调试
* 1.4 定义变量来重构应用
* 1.5 将课程和章节合成一个对象

### d. Exercises 1.6.-1.14.
#### 1.6: unicafe
* 收集用户的反馈的 web 应用
* 三种选择 good, neutral or bad
* 刷新页面数据会丢失
    ``` sample
    give feedback

    good neurural bad
    statistics
    good 6
    neutral 2
    bad 1
    ```
* 1.8 抽取组件重构应用
* 1.9 根据状态做不同响应（渲染不同的 view）
* 1.11* 使用 [tables](https://developer.mozilla.org/en-us/docs/learn/HTML/tables/basics)
    * 解决 tbody 报错问题

### 1.12* anecdotes
* 1.12 随机显示给定箴言
* 1.13 拓展应用显示投票（使用副本更新状态）
* 1.14 最终版本，显示得票最多的警局