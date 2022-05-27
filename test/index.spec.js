import app from '../index.js';
import request from 'supertest'; 

describe('GET usuarios / Retorna mensaje Hola Mundo', () => {
    
    
    test("Retorna statuscode 200", async () => {
        const response = await request(app).get('/').send();
       // console.log(response);
        expect(response.statusCode).toBe(200);
       
       
    });


    test("Retorna Hello World", async () => {
        const response = await request(app).get('/').send();
       // console.log(response);
        expect(response.text).toBe('Hello World!');
       
    });

    test("Responde con un array ",async()=>{
        
        const response = await request(app).get('/users').send();
       // expect(response.body).toEqual([]);
        expect(response.body).toBeInstanceOf(Array);
    

    });  




});


describe('POST /user', () => {


    const User = {
        name: 'Juan',
        lastname: 'Perez'
    };

    //status code 200
    test("Retorna estado 200 cuando se guarda el usuario", async () => {
        
        const response = await request(app).post('/user').send();
        //console.log(response);
        expect(response.statusCode).toBe(200);
    });

    //CONTENT-TYPE: application/json
    test("Contiene Content-Type application/json", async () => {
        const response = await request(app).post('/user').send();
        //console.log(response);
        expect(response.headers['content-type']).toEqual(expect.stringMatching('application/json'));
    });

    //Retorne objeto con name, lastname y id
    test("Retorna un id nombre, apellidos y el id del usuario", async () => {
        const response = await request(app).post('/user').send(User);
        //console.log(response);
        expect(response.body.id).toBeDefined();
    });

    //Retorna objeto usuarios
    test("Retorna objeto usuario", async () => {
        const response = await request(app).post('/user').send(User);
        //console.log(response);
        //expect(response.body.id).toBeDefined();
        expect(response.body).toEqual({id:2, name: 'Juan', lastname: 'Perez'});
    });

}); 