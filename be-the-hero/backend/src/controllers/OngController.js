//defindo variavel crypto e importando o modulo crypto para geracaso de id's de ongs
const crypto = require('crypto');
//definindo os parametros de conexão com o banco de dados
const connection = require('../database/connection');

module.exports = {
    //Definir uma rota de consulta para /ongs (ongs cadastradas)
    async index(request, response) {
    const ongs = await connection('ongs').select('*');
    return response.json(ongs);
    },

    async create(request, response) {
        //definir uma variável "route" que captura os recursos "/users/1" na url
        //const body = request.body;
        //definir uma variável "route" que captura os recursos "JSON" injetados na url
        //console.log(body);
        
        //define a variaveis (array) data para requests de url do tipo body (injecao de JSON)
        const { name, email, whatsapp, city, uf } = request.body;
        //define a variavel id das ONGs sejam geradas randomicamentes com 4 caracteres e convertidas pra hexadecimal
        const id = crypto.randomBytes(4).toString('HEX');
        //abere uma conexao com o DB, seleciona a tabela, define o tipo de operacao como insert e define as tabelas de uso
        await connection('ongs').insert({
            id,
            name,
            email,
            whatsapp,
            city,
            uf,
        })
        //imprime o conteudo de data
        //console.log(data);
        //função para mostrar um opjeto JSON com o ID do cadastro da ONG
        return response.json({ id });
    }
};
