const app = require('../main');
const request = require('supertest');

const isSortedByIDdesc = function(list){
    for(let i = 0;list.length-1 > i; i++){
        if(list[i].id < list[i+1].id){
            return false
        }
    }
    return true;
}
const isSortedByIDdasc = function(list){
    for(let i = 0;list.length-1 > i; i++){
        if(list[i].id > list[i+1].id){
            return false
        }
    }
    return true;
}

/// base working address example : api/posts?tags=tech,science&sortBy=id&direction=desc
describe('error handling',()=>{

    it('ping should resolve with code:200',async ()=>{
        const response = await request(app).get("/api/ping");
        expect(response.statusCode).toBe(200)
    })

    it('the tag param is mandatory, without it code:400',async ()=>{
        const response = await request(app).get('/api/posts?sortBy=id&direction=desc');
        expect(response.body.error).toBe("Tags parameter is required");
        expect(response.statusCode).toBe(400);
    })
    it('sortBy param can only be one of “id”, “reads”, “likes”, “popularity”. code:400 ',async()=>{
        const response = await request(app).get('/api/posts?tags=tech,science&sortBy=wrongValue&direction=desc');
        expect(response.body.error).toBe("sortBy parameter is invalid");
        expect(response.statusCode).toBe(400);
    })
    
    it('dirction param can only be "asc" or "dec". code:400',async ()=>{
        const response = await request(app).get('/api/posts?tags=tech,science&sortBy=id&direction=wrongValue');
        expect(response.body.error).toBe("direction parameter is invalid");
        expect(response.statusCode).toBe(400);
    })
    
    
    
    
})
describe('data legitimacy/integrity',()=>{
    
    it('if sortBy is null, default of id should be used code:200',async ()=>{
        
        const response = await request(app).get('/api/posts?tags=tech,science&direction=desc');
        
        expect(isSortedByIDdesc(response.body)).toBe(true)
        expect(response.statusCode).toBe(200);
    })
    it('if direction is null, default of asc should be used code:200',async ()=>{
        
        const response = await request(app).get('/api/posts?tags=tech,science');
        
        expect(isSortedByIDdasc(response.body)).toBe(true)
        expect(response.statusCode).toBe(200);
    })

})