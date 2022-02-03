const axios = require('axios');
const url = "https://api.hatchways.io/assessment/blog/posts"



module.exports = class DataServices{
    static getPosts(tag,sortBy,direction){
        return new Promise((resolve, reject)=>{
            axios.get(url,
                {params:{tag:tag}}
                ).then(posts=>{
                    resolve(posts.data.posts)
                }).catch(err=>{
                    reject(err)
                })
        })
    }
    static sort(posts,sortBy,direction){
        return posts.sort((a,b)=>{
            if(direction === "asc"){
                if(sortBy === "id"){
                    return a.id - b.id;
                }else if(sortBy === "reads"){
                    return a.reads - b.reads;
                    
                }else if(sortBy === "likes"){
                    return a.likes - b.likes;
                    
                }else if(sortBy === "popularity"){
                    return a.popularity - b.popularity;
                }
            }else{
               
                if(sortBy === "id"){
                    return b.id - a.id;
                }else if(sortBy === "reads"){
                    return b.reads - a.reads;
                    
                }else if(sortBy === "likes"){
                    return b.likes - a.likes;
                    
                }else if(sortBy === "popularity"){
                    return b.popularity - a.popularity ;
                }
            }
        })
    }    
}
