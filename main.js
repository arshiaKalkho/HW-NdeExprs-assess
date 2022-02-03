const express = require("express");
const bodyParser = require("body-parser");
const DataServices = require("./dataServices");
const { response } = require("express");
app = express();
app.use(bodyParser.json())
app.set('query parser', 'simple');

app.get('/api/ping',(req,res)=>{  
    res.status(200).json({"success":true})
})
app.get('/api/posts',async (req,res)=>{  
    
    if(!req.query.tags)
        return res.status(400).json({"error":"Tags parameter is required"})
        
    if(["id","reads","likes","popularity"].indexOf(req.query.sortBy) === -1 && req.query.sortBy)
        return res.status(400).json({"error":"sortBy parameter is invalid"})
        
    if(["desc","asc"].indexOf(req.query.direction) === -1 && req.query.direction)
        return res.status(400).json({"error":"direction parameter is invalid"})
        
    
    let unsortedPosts = []
    const tags = req.query.tags
    let tagsArray = req.query.tags.split(',')
    const sortBy = req.query.sortBy||"id";
    const direction = req.query.direction||"asc";
    for await (const tag of tagsArray) {
        let temp = await DataServices.getPosts(tag,sortBy,direction)
        unsortedPosts = unsortedPosts.concat(temp)
        
    }
    let sortedPosts = DataServices.sort(unsortedPosts,sortBy,direction)
    res.status(200).json(sortedPosts)
    
})



app.get('*',async (req,res)=>{  
    res.sendStatus(404)
})
if (process.env.NODE_ENV !== 'test') {
    app.listen(8080,()=>{
        console.log("listening on port 8080")
    })
}
module.exports = app;