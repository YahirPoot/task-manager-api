import Joi from "joi";
/* 
    * Usamos Joi para validar las variables de entorno.
    * En caso de que falte alguna o sea invalida, saltará un error al iniciar la aplicación.
*/

export const validationSchema = Joi.object({
    // DATABASE
    DATABASE_HOST: Joi.string().required(),
    DATABASE_PORT: Joi.number().required(),
    DATABASE_USER: Joi.string().required(),
    DATABSE_PASSWORD: Joi.string().required(),
    DATABASE_NAME: Joi.string().required(),
    DATABASE_URL: Joi.string().required(),
    // JWT
    JWT_SECRET: Joi.string().required(),
    JWT_EXPIRATION: Joi.number().default(7200),
    REFRESH_JWT_SECRET: Joi.string().required(),
    REFRESH_JWT_EXPIRATION: Joi.number().default(604800),

    // Environment
    NODE_ENV: Joi.string().valid('development', 'production', 'test').default('development'),

    // PORT
    PORT: Joi.number().port().required(),

    // App
    APP_NAME: Joi.string().required(),

});