const jwt = require('jsonwebtoken');


// =====================
// Verificar Token
// =====================
let verificaToken = (req, res, next) => {

    let token = req.get('token'); //leo el token del header

    jwt.verify(token, process.env.SEED, (err, decoded) => {
        //si caduco el token o no es válido
        if (err) {
            return res.status(401).json({
                ok: false,
                err: {
                    message: 'Token no válido'
                }
            });
        }

        req.usuario = decoded.usuario; //información decodificada, el paylod del usuario
        next(); //continua con la ejecución del programa

    });



};

// =====================
// Verifica AdminRole
// =====================
let verificaAdmin_Role = (req, res, next) => {

    let usuario = req.usuario;

    if (usuario.role === 'ADMIN_ROLE') {
        next();
    } else {

        return res.json({
            ok: false,
            err: {
                message: 'El usuario no es administrador'
            }
        });
    }
};



module.exports = {
    verificaToken,
    verificaAdmin_Role
}