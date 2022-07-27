
const isUserAdmin = true;

const CheckAdminUser = (route, method) => {
    return (req, res , next) => {
        const error = {
            error: -1,
            descripcion: `ruta: ${route} y metodo: ${method} no autorizados`
        };

        if (!isUserAdmin) {
            return res.status(401).send(error)
        }
        
        next();
    };
};

module.exports = CheckAdminUser;