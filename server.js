const express = require('express')
const nunjucks = require('nunjucks')


const server = express()
const videos = require("./data")    

server.use(express.static('public'))

server.set("view engine", "njk")
nunjucks.configure("views", {
    express:server,
    autoescape:false,
    noCache:true
})

server.get ("/", function(req, res){
    const about={
        avatar_url:"https://avatars2.githubusercontent.com/u/65407620?s=460&u=5a0305e5473c02c541fccc2981bece23c3c8a183&v=4",
        name:"Wolf Sellmer",
        role:"Executivo Comercial",
        description: 'Estudante de HTML, CSS e JavaScrip. Executivo Comercial para venda de Serviços. Estudante da <a href="https://Rocketseat.com.br" target="_blank">Rocketseat</a>',
        links:[
            { name: "GitHub", url: "https://github.com/wolfsellmer"},
            { name: "LinkedIn", url: "https://www.linkedin.com/in/wolfsellmer/"},
            { name: "Twitter", url: "https://twitter.com"},
        ]
    }


    return res.render("about", {about})
})
server.get ("/portfolio", function(req, res){


    return res.render("portfolio", {items: videos})
})
server.get("/video", function(req, res){
    const id= req.query.id
    const video = videos.find(function(video){
       return video.id ==id
    })
    if (!video){
        return res.send("Video not found!")
    }
    return res.render("video", {item: video})

     
})
server.listen(5000, function(){
    console.log("server is running")
})
server.use(function(req, res) {
    res.status(404).render("not-found");
  });
