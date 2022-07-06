const express = require("express");
const app = express();
const fs = require("fs");

class Contenedor {

    constructor(archivo) {
        this.archivo = archivo
        this.id = 1
        this.productos = []
        this.random = {}
    }


    async getById(id) {
        return new Promise ((resolve, reject) => {
            fs.readFile(this.archivo, "utf-8", (err, data) => {
                if (err) {
                    reject("Error de aplicación")
                }
    
                let product = JSON.parse(data)
                this.random = product.find(product => product.id === id)
                resolve("ok")
            })
        }) 
    }

    getAll() {
        return new Promise((resolve, reject) => {
            fs.readFile(this.archivo, "utf-8", (err, data) => {
                if (err) {
                    reject("Error de aplicación")
                }
                this.productos = JSON.parse(data)
                resolve("ok")
            })
        }) 
    }

}



let contenido = new Contenedor("productos.txt");


app.listen(4000, () => {
    console.log("Aplicación corriendo en el puerto 4000");
});

app.get("/productos",(req, res) => {
    contenido.getAll()
    .then((resp) => {
        res.send(contenido.productos)
    })
});

app.get("/productoRandom", (req, res) => {
    num = Math.floor(Math.random() * 3 + 1)
    contenido.getById(num)
    .then((resp) => {
        res.send(contenido.random)
    })
});