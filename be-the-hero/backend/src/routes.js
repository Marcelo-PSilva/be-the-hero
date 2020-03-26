//import do modulo express e nomeie-o como contante express
//o express permite a construção de rotas URLs para funções definidas no código
const express = require('express');
//definindo a variavel routes como chamada pro submodulo "Router" do express
const routes = express.Router();
//importando as definiçoes de rotas para ONG's
const OngController = require('./controllers/OngController');
//importando as definicoes de rotas para incidentes registrados
const IncidentController = require('./controllers/IncidentController');
//importando as definicoes de rotas para listagem de incidentes por ongs
const ProfileController = require('./controllers/ProfileController');
//importando as definicoes de sessão (login)
const SessionController = require('./controllers/SessionController');
//defnir uma rota principal "/" pra aplicação (URL) e estabelece uma função como segundo parâmetro
//o primeiro parâmetro é a requisição e o segundo é a resposta
// routes.get('/users', (request, response)     => {
//    /**
//     * função para mostrar texto
//     * return response.send('Hello Word');
//     *  */ 
//    //definir uma variável "query" que captura os filtros "?name=Diego" na url
//    const query = request.query;
//    //imprimir na console as requisicoes de browser
//    console.log(query);
//    //função para mostrar um opjeto JSON
//    return response.json({
//        evento: 'Semana OmniwStack 11.0',
//        aluno: 'Marcelo Silva',
//    })
// }); 
//definir uma variável "route" que captura os recursos "/users/1" na url
// routes.get('/nomes/:id', (request, response)     => {
//     const route = request.params;
//     //definir uma variável "route" que captura os recursos "JSON" injetados na url
//     console.log(route);
//     //função para mostrar um opjeto JSON
//     return response.json({
//         evento: 'Semana OmniwStack 11.0',
//         aluno: 'Marcelo Silva',
//     })
// }); 
routes.get('/ongs', OngController.index);
routes.post('/ongs', OngController.create);
routes.get('/incidents', IncidentController.index);
routes.post('/incidents', IncidentController.create);
routes.delete('/incidents/:id', IncidentController.delete);
routes.get('/profile', ProfileController.index);
routes.post('/sessions', SessionController.create);


//Exportar as variaves e suas funcoes neste arquivo
module.exports = routes;

