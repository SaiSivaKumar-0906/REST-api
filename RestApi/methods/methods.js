const fs = require("node:fs");
const url = require("node:url");
const crypto = require('node:crypto');

function writeFile(res, createFile, url){
    return fs.readFile("send.json", (err, datas)=>{
        let readFile = JSON.parse(datas);
        readFile.Collection.UsersData.push(createFile);
        fs.writeFile("send.json", JSON.stringify(readFile), (err)=>{
            if(err){
                throw err;
            }
            if(!err){
                res.writeHead(201, {
                    "Locaiton": `http://localhost:${url}`,
                    "Content-Type": "text/html"
                })
                res.write(`http://localhost:${url}`);
                res.end();
            }
        })
    })
}

async function creatingcollection(res, name, data, url, db){
   try{
    const creating = await db.create({
        name,
        data,
        url
    })
    if(creating){
        const createFile = {
            name: name, 
            data: data,
            url: `http://localhost:${url}`
        }
        writeFile(res, createFile,url);
    }
    if(!creating){
        res.writeHead(500, {
            "Content-Type": "application/json"
        })
        res.end(JSON.stringify("it is not you, server issue!!!"))
    }
   }catch(err){
     throw err;
   }
}


async function post(req, res, db){
    const postData = [];
    for await(const same of req){
        postData.push(same);
    }
    const {name, data} = JSON.parse(Buffer.concat(postData).toString());
    if(!(name && data)){
        res.writeHead(404, {
            "Content-Type": "application/json"
        })
        res.write(JSON.stringify("write data"));
        res.end();
    }
    if(name && data){
      const urlParse = url.parse(crypto.randomUUID());
      const urlPathName = `/${urlParse.pathname}`
      creatingcollection(res, name, data, urlPathName, db);
    }
}

async function get(req, res, db){
   const uri = await db.findOne({url: req.url})
   if(uri.url === req.url){
    return fs.readFile("send.json", (err, data)=>{
        if(err){
            throw err;
        }
        if(!err){
            res.writeHead(200, {
                "Content-Type": "application/json"
            })
            res.write(data);
            res.end();
        }
       })
   }
}

module.exports.Get = get
module.exports.Post = post
