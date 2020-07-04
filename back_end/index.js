const express = require('express')
const { response } = require('express')
const app = express()

app.use(express.json())

let notes = [
    {
        id: 1,
        content: "HTML is easy",
        date: "2019-05-30T17:30:31.098Z",
        important: true
    },
    {
        id: 2,
        content: "Browser can execute only Javascript",
        date: "2019-05-30T18:39:34.091Z",
        important: false
    },
    {
        id: 3,
        content: "GET and POST are the most important methods of HTTP protocol",
        date: "2019-05-30T19:20:14.298Z",
        important: true
    }
]

// 路由，content-type 等参数由 express 自动补全
app.get('/', (_, res) => {
    res.send('<h1>Hello World!</h1>')
})

// 无须再使用 JSON.stringify() 方法进行转换
app.get('/api/notes', (_, res) => {
    res.json(notes)
})

app.get('/api/notes/:id', (req, res) => {
    const id = Number(req.params.id)
    const note = notes.find(note => note.id === id)
    note ? res.json(note) : res.status(404).end()
})

app.delete('/api/notes/:id', (req, res) => {
    const id = Number(req.params.id)
    const notes = notes.filter(note => note.id !== id)
    // 资源删除成功，或者没找到 都返回 204，表不存在
    res.status(204).end()
})

app.post('/api/notes', (req, res) => {
    const body = req.body
    if (!body.content) {
        return response.status(400).json({
            error: 'content missing'
        })
    }
    const note = {
        id: generateId(),
        data: new Date(),
        content: body.content,
        important: body.important || false
    }
    notes = notes.concat(note)

    res.json(note)
})

const generateId = () => {
    const maxId = notes.length > 0
        ? Math.max(...notes.map(n => n.id))
        : 0
    return maxId + 1
}

const PORT = 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})