import express from "express";
import {ProductManager} from "./ProductManager";

const app =express();
const port = 8080;

app.listen(port,()=>console.log(`Server listening on port ${port}`));

const manager = new ProductManager();

app.get("/products",async(req,res)=>{
    const products = await manager.getProducts();
    res.send(products);
});

// http:localhost:8080/products?limit=
app.get("/products",async(req,res)=>{
        try {
            console.log(req.query);
            const limit = req.query.limit;
            const product = await manager.filter(p => p.limit === limit);
            res.send(product);
        } catch(error){
            res.status(400).json({status:"error", message:error.message});
        }
    });

// http:localhost:8080/products/id=1
app.get("/products/:pid",async(req,res)=>{
    try {
        const id = req.params.pid;
        const product = await manager.find(p=>p.id === id);
        res.send(product);
    } catch(error){
        res.status(400).json({status:"error", message:error.message});
    }
});