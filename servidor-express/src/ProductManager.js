import fs from "fs";

class ProductManager{
    constructor(pathName){
        this.path=pathName;
    }
    
    fileExists(){
        return fs.existsSync(this.path);
    };

    generateId(products){
        let newId;
        if(!products.length){
            newId=1;
        } else{
            newId=products[products.length-1].id+1;
        }
        return newId;
    }

    async addProduct(product){
        try {
            if(this.fileExists()){
                const content = await fs.promises.readFile(this.path,"utf-8");
                const products = JSON.parse(content);
                const productId = this.generateId(products);
                product.id = productId;
                products.push(product);
                await fs.promises.writeFile(this.path,JSON.stringify([products],null,2));
                return product;
            } else {
                const productId = this.generateId([]);
                product.id = productId;
                await fs.promises.writeFile(this.path,JSON.stringify([product],null,2));
                return product;
            }
        } catch (error) {
            throw new Error(error.message);
        }
    };

    async getProducts(){
        try {
            if(this.fileExists()){
                const content = await fs.promises.readFile(this.path,"utf-8");
                const products = JSON.parce(content);
                return products;
            } else {
                throw new Error("El archivo no existe");
            }
        } catch (error) {
            throw new Error(error.message);
        }
    };

    async getProductById(id){
        try {
            if(this.fileExists()){
                const content = await fs.promises.readFile(this.path,"utf-8");
                const products = JSON.parse(content);
                const product = products.find(item=>item.id === id);
                if(product){
                    return product;
                } else {
                    throw new Error(`El producto con el id ${id} no existe`);
                }
            } else {
                throw new Error("El archivo no existe");
            }
        } catch (error) {
            throw new Error(error.message);
        }
    };

    async updateProduct(id,product){
        try {
            if(this.fileExists()){
                const content = await fs.promises.readFile(this.path,"utf-8");
                const products = JSON.parse(content);
                const productIndex = products.findIndex(item=>item.id === id);
                if(productIndex>=0){
                    products[productIndex]={
                        ...products[productIndex],
                        ...product
                    }
                    await fs.promises.writeFile(this.path,JSON.stringify(products,null,2));
                    return `El producto con el id ${id} fue modificado`;
                } else {
                    throw new Error(`El producto con el id ${id} no existe`);
                }
            } else {
                throw new Error("El archivo no existe");
            }
        } catch (error) {
            throw new Error(error.message);
        }
    };
    
    async deleteProduct(id){
        try {
            if(this.fileExists()){
                const content = await fs.promises.readFile(this.path,"utf-8");
                const products = JSON.parse(content);
                const productFil = products.filter(item=>item.id === id);
                return productFil;
            } else {
                throw new Error("El archivo no existe");
            }
        } catch (error) {
            throw new Error(error.message);
        }
    };
    };


//se utiliza la clase
const manager = new ProductManager("./src/products.json");

const funcionPrincipal=async()=>{
    try{
        const productAdded = await manager.addProduct({title:"Armado de mueble ", description:"Servicios de armado Sodimac",price:"32.990", thumbnail:"https://sodimac.scene7.com/is/image/SodimacCL/6441009_01?wid=1500&hei=1500&qlt=70",code:"6441009",stock:1000});
        console.log("productAdded: ", productAdded);
        // const productAdded = await manager.addProduct({title:"Instalación de Calefont", description:"Servicios de instalación Sodimac",price:"74.990", thumbnail:"https://sodimac.falabella.com/sodimac-cl/product/110685359/Instalacion-Calefon-Tiro-Natural/110685363?sid=SO_HO_BPD_106641",code:"3686213",stock:1500});
        // const productAdded = await manager.addProduct({title:"Instalación de Grifería", description:"Servicios de instalación Sodimac",price:"24.990", thumbnail:"https://sodimac.falabella.com/sodimac-cl/page/instalacion-de-griferia?sid=SO_HO__149883",code:"149883",stock:1200});
        // const product1 = await manager.getProductById(5);
        // console.log("product1: ", product1);
        // const resultado = await manager.updateProduct(1,{price:"34.990"});
        // console.log("resultado: ", resultado);
        // console.log(productFil);
    } catch (error) {
        console.log(error.message);
    }
}
funcionPrincipal();

export {ProductManager}
