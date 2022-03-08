const express = require('express');
const app = express()
const port = 3000
const methodOverride = require('method-override');
  


app.use(methodOverride('_method'));

app.use(express.urlencoded({extended:false}));
// app.use()

const scientistsArr = [
    {
        name:"Science Man",
        description: "very cool"
    }
    
]
app.use((req, res, next) => {
    //console.log(`request coming in at ${req.url}`)
    next()
})


app.get('/', (req, res) => {
    res.send("workin")
})
//index: gett
app.get('/scientist', (req, res) => {
    res.render("index.ejs", {
        scientistsArr: scientistsArr
    })
})

//new: get 
app.get('/scientist/new', (req, res) => {
    res.render('create.ejs',{
        scientistsArr: scientistsArr
    })
})


//create: post
app.post('/scientist', (req, res) => {
    scientistsArr.push(req.body)
    //[await] Cat.create(req.body)
    //redirect to another route this case to the index page
    res.redirect('/scientist')
})

//show
app.get('/scientist/:index', (req, res) => {
    res.render("show.ejs",{
        index: req.params.index,
        scientist: scientistsArr[req.params.index]
    })
})

app.put('/scientist/:index', (req, res) => {
    scientistsArr[req.params.index] = req.body
    res.redirect(`/scientist/${req.params.index}`)
})


app.get('/scientist/:index/edit', (req, res) => {
    res.render("edit.ejs", {
        index: [req.params.index],
        scientist: scientistsArr[req.params.index]
    })
    res.redirect(`/scientist`)
})


app.delete('/scientist/:index/delete', (req, res) => {
    scientistsArr.splice(`${req.params.index}`,1)
    res.redirect(`/scientist`)
})

//hungry for more
app.get('/delete', (req, res) => {
    res.send("deleting all")
    scientistsArr = []
    res.redirect(`/scientist`)
})




//always goes to the bottom (like return)
app.listen(port, () => {
    console.log(`Listening on port ${port}`)
})

console.log('')