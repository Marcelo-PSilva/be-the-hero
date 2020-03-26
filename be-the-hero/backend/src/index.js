//import do modulo express e nomeie-o como contante express
//o express permite a construção de rotas URLs para funções definidas no código
const express = require('express');
//importa o CORS (modulo de segurança)
const cors = require('cors');
//importa o arquivo que tem as declaracoes de rotas e suas respectivas "requests/responses" para urls
const routes = require('./routes.js');
//definir uma variável que armazena a aplicação. Esse é o procedimento para literalmente criar a aplicação. Chama-se "instanciar".
const app = express();
//informa para a aplicacao usar o CORS como balizador de sua segurança
app.use(cors());
//informa que a aplicação vai tratar as requisições em formato json prioritariamente (transforma as dados JSON em objetos JavaScript)
app.use(express.json());
//informa pra aplicacao usar o "routes" importado
app.use(routes);
//escutar na porta 3333
app.listen(3333);


