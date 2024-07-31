class CustomError extends Error {
    constructor(message, status) {
        super(message);
        this.status = status;
    }
}

const errorDictionary = {
    PRODUCT_CREATION_ERROR: {
        message: 'Error al crear el producto',
        status: 400,
    },
    ADD_TO_CART_ERROR: {
        message: 'Error al agregar el producto al carrito',
        status: 400,
    },
    // Agrega otros errores comunes aquí
};

function handleError(err, req, res, next) {
    const error = errorDictionary[err.message] || {
        message: 'Error interno del servidor',
        status: 500,
    };
    res.status(error.status).json({ error: error.message });
}

module.exports = {
    CustomError,
    handleError,
    errorDictionary,
};
