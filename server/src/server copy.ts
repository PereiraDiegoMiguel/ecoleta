import express, { response } from 'express';

const app = express();

//Por padrao o express nao entende a informacao no formato json
//use serve para adicioanar a funcionalidade json no express como um pug-in 
app.use(express.json());
// Rota: Endereco completo da requisicao
// Recurso: Qual entidade estamos acessando do sistemas
// GET: Busca informacoes do back-end
// POST: Cria uma nova inforacao no back-end
// PUT: Atualiza uma informacao existente no back-end
// DELETE: Remove uma informacao do back end

// Request Param: Parametros que vem na propria rota que identificam um recurso
// Query Param:  Parametros que vem na propria rota geralmente opcionais para filtros, paginacoes 
// Request Body: Parametros para criacao e atualizacao de informacoes 

const users = [
    'Diego',
    'cleiton',
    'Robson',
    'Daniel'
];

app.get('/users', (request, response) => {

    const search = String(request.query.search);

    //o filter() recebe uma funcao user para verificar se 
    //o usuario esta icluido na requisicao search
    const filteredUsers = search ? users.filter(user => user.includes(search)) : users;

    return response.json(filteredUsers);

});

app.get('/users/:id', (request, response) => {

    const id = Number(request.params.id);
    const user = users[id];

    return response.json(user);


});


app.post('/users', (request, response) => {

    const data = request.body;

    console.log(data);

    const user = {
        name: data.name,
        email: data.email
    }

    return response.json(user);

});



app.listen(3333);
