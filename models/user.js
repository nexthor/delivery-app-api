const db = require('../config/config');
const bcrypt = require('bcrypt');
const User = { }

User.create = async (user, result) => {
    const hash = await bcrypt.hash(user.password, 10);
    const sql = `
        insert into users(
            email,
            name,
            last_name,
            phone,
            image,
            password,
            created_at,
            updated_at
        ) VALUES(?, ?, ?, ?, ?, ?, ?, ?)
    `;

    db.query(
        sql,
        [
            user.email,
            user.name,
            user.last_name,
            user.phone,
            user.image,
            hash,
            new Date(),
            new Date()
        ],
        (err, res) => {
            if (err) {
                console.log('Error: ',  err)
                result(err, null);
            }
            else{
                console.log('Id del nuevo usuario: ', res.insertId)
                result(null, res.insertId);
            }
        }
    )
}

User.findById = (id, result) => {
    const sql = `
        select 
            id,
            email,
            name,
            last_name,
            image,
            password 
        from 
            delivery.users 
        where 
            id=?`

    db.query(sql, [id], (err, user) => {
        if (err) {
            console.log('Error: ',  err)
            result(err, null);
        }
        else{
            console.log('Usuario obtenido: ', user)
            result(null, user);
        }
    });

}

User.findByEmail = (email, result) => {
    const sql = `
        select 
            id,
            email,
            name,
            last_name,
            image,
            password 
        from 
            delivery.users 
        where 
            email=?`

    db.query(sql, [email], (err, user) => {
        if (err) {
            console.log('Error: ',  err)
            result(err, null);
        }
        else{
            console.log('Usuario obtenido: ', user)
            result(null, user);
        }
    });
}

module.exports = User;