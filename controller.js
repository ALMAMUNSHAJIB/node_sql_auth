const {create, getUsers, getUserById, updateUser, deleteUser, getUserByUserEmail} = require('./service');
const {genSaltSync, hashSync, compareSync} = require('bcrypt') ;
const {sign} = require("jsonwebtoken");


module.exports = {
    createUser: (req, res) => {
        const body = req.body;
        const salt = genSaltSync(10);
        body.password = hashSync(body.password, salt);
        create(body, (err, results) => {
          if (err) {
            console.log(err);
            return res.status(500).json({
              success: 0,
              message: "Database connection errror"
            });
          }
          console.log(results);
          return res.status(200).json({
            success: 1,
            data: results
          });
         
        });

    },
    getUserById: (req, res) => {
        const id = req.params.id;
        getUserById(id, (err, results) => {
            if(err){
                console.log(err);
                return;
            }

            if(!results){
                return res.status(404).json({
                    success: 0,
                    message: "Recored Not Found!!"
                });
            }
            return res.status(200).json({
                success:1,
                data: results
            });
        });

    },
    getUsers: (req, res) => {
        getUsers((err, results) => {
            if(err){
                console.log(err);
                return;
            }

            if(!results){
                return res.status(404).json({
                    success: 0,
                    message: "Recored Not Found!!"
                });
            }
            return res.status(200).json({
                success:1,
                data: results
            });
        });

    },
    update: (req, res) => {
        const body = req.body;
        const salt = genSaltSync(10);
        body.password = hashSync(body.password, salt);
        updateUser(body, (err, results) => {
          if (err) {
            console.log(err);
           return;
          }
          if(!results){
              return res.json({
                  success: 0,
                  message: 'Update unsuccessfull!!'
              })
          }
          return res.json({
            success: 1,
            message: "Update Successfully!!"
          });
         
        });

    },
    deleteUser: (req, res) => {
        const data = req.body;
        deleteUser(data, (err, results) => {
          if (err) {
            console.log(err);
            return;
          }
          console.log(results);
          return res.status(200).json({
            success: 1,
            message: "Deleted Successfully!!"
          });
         
        });




    },
    login: (req, res) => {
        const body = req.body;
        getUserByUserEmail(body.email, (err, results) => {
          if (err) {
            console.log(err);
          }
          if (!results) {
            return res.json({
              success: 0,
              data: "Invalid email or password"
            });
          }
          const result = compareSync(body.password, results.password);
          if (result) {
            results.password = undefined;
            const jsontoken = sign({ result: results }, "secret", {
              expiresIn: "1h"
            });
            return res.json({
              success: 1,
              message: "login successfully",
              token: jsontoken
            });
          } else {
            return res.json({
              success: 0,
              data: "Invalid email or password"
            });
          }
        });
      },
}