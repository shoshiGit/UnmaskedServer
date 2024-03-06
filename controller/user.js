// const { userSchema } = require('../models/userModel');
const bcrypt = require('bcryptjs');

const fs = require('fs');

function get(req, res) {
    fs.readFile("users.json", "utf-8", (err, data) => {
        if (err) {
            res.status(500).send("error read file users ")
        } else {
            res.json((data));
        }

    })
}
//אפשרות ראשונה ליצא פונקציה מדף
exports.getById = (req, res) => {

    fs.readFile("users.json", "utf-8", (err, data) => {
        if (err) {
            res.status(500).send("error read file users ")
        } else {
            let id = req.params.id;

            data = JSON.parse(data);
            let user = data.find(st => st.id == id)

            if (user == undefined) {
                res.status(500).send("not found student by tz " + id);
            } else {
                res.json(user);
            }

        }


    })
}

exports.postSignup = (req, res, next) => {
    const { name,email,password } = req.body;
    console.log(name,email,password);
  
    // const errors = validationResult(req);
    // const errors = [];

    // if (!errors.isEmpty()) {
    //   return res.status(422).render('auth/signup', {
    //     path: '/signup',
    //     pageTitle: 'Sign Up',
    //     errorMessage: errors.array()[0].msg,
    //     oldInput: { email, password, confirmPassword },
    //     validationErrors: errors.array(),
    //   }
    //   );
    // }
  
    // Generates hashed password. Asynchronous task; returns a promise. Second arg is salt value (how many rounds of hashing will be applied)
    
    bcrypt
      .hash(password, 12)
      .then((hashedPassword) => {
        const user = new User({
            name,
          email,
          password: hashedPassword,
          cart: { items: [] },
        });
        return user.save();
      })
      .then((result) => {
        res.redirect('/login');
        // sendMail() provides a promise. Returning in order to chain .catch() and catch any errors
        return {
         
        };
      })
      .catch((err) => {
        const error = new Error(err);
        error.httpStatusCode = 500;
        return next(error.message);
      });
  };
exports.post = (req, res) => {
    let user = req.body;
    console.log(user)
    
    // const {error, value} = .validate(user, {abortEarly: false}); 
    // if (error) {
    //     res.status(401).send(error);
    // } else {
    //   res.status(200).send('sucess');  
    // }
    fs.readFile("users.json", "utf-8", (err, data) => {
        //המרה של טקסט למערך
        let users = JSON.parse(data);
        let newId = users[users.length-1].id<0?1:(users[users.length-1].id+1);
        user = {...user, "id":newId} ;
        console.log(user)
        //body =  לתוכן שנשלח בפונקציה פןסט 
        users.push(user);
        fs.writeFile("users.json", JSON.stringify(users), (err) => {
            if (err) {
                res.status(500).send("error  in add users ");
            } else {
                res.status(201).json(req.body);
            }
        })
    })
}

exports.login = (req, res) => {
    if (!req.body.name || !req.body.password)
        return res.status(404).send("missing body name/password ")

    fs.readFile("users.json", "utf-8", (err, data) => {
        //המרה של טקסט למערך
        let users = JSON.parse(data);
        let u = users.find(item => item.name == req.body.name && item.password == req.body.password)
        if (!u) {
            res.status(404).send("no user with such details ");
        } else {
            res.json(u);
        }
    })

}
//אפשרות שניה ליצא פונקציה מדף
exports.get = get;
