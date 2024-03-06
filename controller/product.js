
const fs = require('fs');

function get(req, res) {
    fs.readFile("products.json", "utf-8", (err, data) => {
        if (err) {
            res.status(500).send("error read file student ")
        } else {
 //changed           
            try{
                const products = JSON.parse(data);
                res.json(products);
            }catch(parseError){
                res.status(500).send("error parsing json data")
            }
            
        }

    })
}
//אפשרות ראשונה ליצא פונקציה מדף
exports.getById = (req, res) => {

    fs.readFile("products.json", "utf-8", (err, data) => {
        if (err) {
            res.status(500).send("error read file student ")
        } else {
            let id = req.params.id;

            data = JSON.parse(data);
            let product = data.find(st => st.id == id)

            if (product == undefined) {
                res.status(500).send("not found student by tz " + id);
            } else {
                res.json(product);
            }

        }


    })
}


exports.post = (req, res) => {

    fs.readFile("products.json", "utf-8", (err, data) => {
        //המרה של טקסט למערך
        let products = JSON.parse(data);
        //body =  לתוכן שנשלח בפונקציה פןסט 
        req.body.id = products[products.length - 1].id + 1;
        products.push(req.body);
        fs.writeFile("products.json", JSON.stringify(products), (err) => {
            if (err) {
                res.status(500).send("error  in add products ");
            } else {
                res.json(req.body);
            }
        })
    })
}

exports.delete = (req, res) => {
    let id = req.params.id;
    fs.readFile("products.json", "utf-8", (err, data) => {
        //המרה של טקסט למערך
        let products = JSON.parse(data);
        //body =  לתוכן שנשלח בפונקציה פןסט 

        let index = data.findIndex(st => st.id == id)
        if (index == -1)

            return res.status(404).send("no product with such id to delete");
        let p = products[index];
        products.splice(index, 1);
        fs.writeFile("products.json", JSON.stringify(products), (err) => {
            if (err) {
                res.status(500).send("error deleteing product");
            } else {
                res.json(p);
            }
        })


    })
}

exports.update = (req, res) => {
    let id = req.params.id;
    fs.readFile("products.json", "utf-8", (err, data) => {
        //המרה של טקסט למערך
        let products = JSON.parse(data);
        //body =  לתוכן שנשלח בפונקציה פןסט 

        let index = data.findIndex(st => st.id == id)
        if (index == -1)

            return res.status(404).send("no product with such id to update");
        let p = products[index];
        p.name = req.body.name || p.name;
        p.prodDate = req.body.prodDate || p.prodDate;
        p.isCooling = req.body.isCooling || p.isCooling;
        p.company = req.body.company || p.company;
        p.price = req.body.price || p.price;
        p.content = req.body.content || p.content;
        p.imgUrl = req.body.imgUrl || p.imgUrl;
        p.description = req.body.description || p.description;
        fs.writeFile("products.json", JSON.stringify(products), (err) => {
            if (err) {
                res.status(500).send("error updating product");
            } else {
                res.json(p);
            }
        })


    })
}
//אפשרות שניה ליצא פונקציה מדף
exports.get = get;
