const express = require('express')
const mongoose = require('mongoose')
const Laptop = require('./Laptop')
const bodyParser = require('body-parser');
const cors = require('cors');

mongoose
.connect('mongodb+srv://newClassA:newClassA@cluster0.26xlz28.mongodb.net/?retryWrites=true&w=majority')
.then(()=>{
    console.log("Connected to Atlas server");

    const app = express();

    app.use(bodyParser.urlencoded({ extended: false }))
    app.use(cors());

    app.get('/laptop',async (req,res)=>{
        const laptops = await Laptop.find()
        res.send(laptops);
    });

    app.get('/laptop/:id',async (req,res)=>{
        const laptops = await Laptop.findById(req.params.id)
        res.send(laptops);
    });

    app.delete('/laptop/:id',async (req,res)=>{
        const laptops = await Laptop.findById(req.params.id)
        await laptops.deleteOne();
        res.send(laptops);
    });

    app.post('/laptop',async (req,res)=>{
        const laptop = new Laptop({
            _id: new mongoose.Types.ObjectId(),
            LaptopName: req.body.LaptopName,
            LaptopPrice: req.body.LaptopPrice,
            LaptopImage: req.body.LaptopImage
        });
        await laptop.save();
        res.send(laptop);
    });

    app.patch('/laptop/:id',async (req,res)=>{
        const laptop = await Laptop.findById(req.params.id)
        if(req.body.LaptopName!==undefined){
            laptop.LaptopName = req.body.LaptopName;
        }
        
        laptop.LaptopPrice = req.body.LaptopPrice;
        laptop.LaptopImage = req.body.LaptopImage;
        await laptop.save();
        res.send(laptop);
    });

    app.listen(3030,()=>{
        console.log("server started")
    })
});