import { ConfigService } from "@nestjs/config";
import { config } from "dotenv";
/*  
    * Interfaz que define la estructura de la configuración global de la aplicación
    * Esta configuración se usa para centralizar las variables de entorno.
    * La configuración se obtiene del objeto global process.env y se almacena en el objeto IConfig.
    * En caso de que falte alguna variable, saltará un error al iniciar la aplicación.
    * Las variables de entorno se cargan desde el archivo .env.
    * 
*/

export interface AppConfig {
    nodeEnv: string;
    port: number;
    appName: string;
}

export interface DatabaseConfig {
    host: string;
    port: number;
    user: string;
    password: string;
    databaseName: string;
    databaseUrl: string;
}

export interface JWTConfig {
    secret: string;
    expiration: number;
}

export interface RefreshJWTConfig {
    secret: string;
    expiration: number;
}
export interface IConfig {
    app: AppConfig;
    database: DatabaseConfig;
    jwt: JWTConfig;
    refreshJwt: RefreshJWTConfig;
} 

export const getConfig = (configService: ConfigService): IConfig => ({
    app: {
        nodeEnv: configService.get<string>('NODE_ENV') || 'development',
        port: configService.get<number>('PORT') || 3000,
        appName: configService.get<string>('APP_NAME') || 'task_manager',
    },
    database: {
        host: configService.get<string>('DATABASE_HOST') || '',
        port: configService.get<number>('DATABASE_PORT') || 5432,
        user: configService.get<string>('DATABASE_USER') || '',
        password: configService.get<string>('DATABASE_PASSWORD') || '',
        databaseName: configService.get<string>('DATABASE_NAME') || '',
        databaseUrl: configService.get<string>('DATABASE_URL') || '',
    },
    jwt: {
        secret: configService.get<string>('JWT_SECRET') || '',
        expiration: configService.get<number>('JWT_EXPIRATION') || 0,
    },
    refreshJwt: {
        secret: configService.get<string>('REFRESH_JWT_SECRET') || '',
        expiration: configService.get<number>('REFRESH_JWT_EXPIRATION') || 0,
    }
})