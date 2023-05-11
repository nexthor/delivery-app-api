const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const keys = require('../config/keys');

module.exports = {

    login(req, res) {
        const email = req.body.email;
        const password = req.body.password;

        User.findByEmail(email, async (err, response) => {
            if (err || !response.length > 0) {
                return res.status(501).json({
                    success: false,
                    message: 'No se encontró el usuario',
                    error: err
                });
            }

            const user = response[0];
            if (!user) {
                return res.status(401).json({
                    success: false,
                    message: "el email no fue encontrado",
                })
            }

            const isPsswordValid = await bcrypt.compareSync(password, user.password);

            if (isPsswordValid) {
                const token = jwt.sign({ id: user.id, email: user.email }, keys.secretOrKey, {});
                const data = {
                    id: user.id,
                    name: user.name,
                    last_name: user.last_name,
                    phone: user.phone,
                    image: user.image,
                    session_token: `JWT ${token}`
                }

                return res.status(201).json({
                    success: true,
                    message: 'el usuario fue autenticado',
                    data: data
                });
            }
            else{
                return res.status(401).json({
                    success: false,
                    message: "la contraseña es invalida",
                })
            }

        });
    },


    register(req, res){
        const user = req.body;
        User.create(user, (err, data) => {
            if (err) {
                return res.status(501).json({
                    success: false,
                    message: 'Hubo un error con el registro del usuario',
                    error: err
                });
            }

            return res.status(201).json({
                success: true,
                message: 'Usuario creado con éxito',
                data: data
            });
        });
    }
}