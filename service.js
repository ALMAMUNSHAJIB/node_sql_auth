const { compareSync } = require('bcrypt');
const { sign } = require('jsonwebtoken');
const pool = require('./config/database');


module.exports = {
    create: (data, callBack) => {
        pool.query(
          `insert into registartion(firstName, lastName, gender, email, password, number) 
                    values(?,?,?,?,?,?)`,
          [
            data.first_name,
            data.last_name,
            data.gender,
            data.email,
            data.password,
            data.number
          ],
          (error, results, fields) => {
            if (error) {
              callBack(error);
            }
            return callBack(null, results);
          }
        );
      },
    getUsers: callBack => {
        pool.query(
            ` select id, firstName, lastName, email, password, gender, number from registartion`,
            [],
            (error, resluts, fields) => {
                if(error)
                  return callBack(error);
                return callBack(null, resluts);
            })
    },
    getUserById:(id, callBack)  => {
        pool.query(
            ` select id, firstName, lastName, email, password, gender, number from registartion where id = ?`,
            [id],
            (error, resluts, fields) => {
                if(error)
                  return callBack(error);
                return callBack(null, resluts[0]);
            })
    },
    updateUser: (data, callBack) => {
        pool.query(
          `update registartion set firstName=?, lastName=?, gender=?, email=?, password=?, number=? where id =?`,
          [
            data.first_name,
            data.last_name,
            data.gender,
            data.email,
            data.password,
            data.number,
            data.id
          ],
          (error, results, fields) => {
            if (error) {
              callBack(error);
            }
            return callBack(null, results[0]);
          }
        );
      },
      deleteUser: (data, callBack) => {
        pool.query(
          `delete from registartion  where id =?`,
          [
          data.id
          ],
          (error, results, fields) => {
            if (error) {
             return callBack(error);
            }
            return callBack(null, results[0]);
          }
        );
      },

      getUserByUserEmail: (email, callBack) => {
        pool.query(
          `select * from registartion where email = ?`,
          [email],
          (error, results, fields) => {
            if (error) {
              callBack(error);
            }
            return callBack(null, results[0]);
          }
        );
      },
     
}

