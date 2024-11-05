import dotenv from 'dotenv';
dotenv.config ();
export const DB_CONFIG = {
    // port : 8080,
    // baseUrl: 'http://localhost:3000',
    resources : {
        users : {
            contextPath : '/users',
        },
        post : {
            contextPath : '/post',
        },
        comments : {
            contextPath : '/comments',
        },
        movie : {
            contextPath : '/movies',
        },
        admin : {
            contextPath : '/admin',
        },
        manager :  {
            contextPath : '/manager',
        }
    },
    url_mongodb : `mongodb+srv://${process.env.USERNAME_MONGO_DB}:${process.env.PASSWORD_MONGO_DB}@web.2rxwo.mongodb.net/${process.env.URL_KEY}?retryWrites=true&w=majority&appName=web`

}