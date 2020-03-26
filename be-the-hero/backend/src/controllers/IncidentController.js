const connection = require('../database/connection')

module.exports = {
    async index(request, response) {
        //definir parametros de paginacao para que não mostre todos os incidentes na mesma páhina
        const { page = 1 } = request.query;
        //como a aplicacao mostra sempre a quantidade total de incidentes cadastrado, precisamos contar na tablea incidents quantos registros temos e retornar um array
        const [count] = await connection('incidents').count();
        //conectar a tabela incidents e mostrar todo o conteudo
        const incidents = await connection('incidents')
        //criar uma relacao com a tabela ongs onde os id's forem os mesmos e acrescentar dados (whatsapp, email, cidade, uf) ao resultado
        .join('ongs', 'ongs.id', '=', 'incidents.ong_id')
        //limita a 5 resultados por pagina (ex.: /incidents?page=2)
        .limit(5)
        //mostra 5 resultados já na pagina 0 
        .offset((page -1) *5 )
        .select(['incidents.*', 'ongs.name', 'ongs.email', 'ongs.whatsapp', 'ongs.city', 'ongs.uf']);

        //repassara a aplicação o resultado do array count pelo headers (um novo header definido X-Total-Count)
        response.header('X-Total-Count', count['count(*)']);
        //mostrar os incidentes
        return response.json(incidents);
      
        },   
        
    async create(request, response) {
        const { title, description, value } = request.body;
        //definir que quem vai inserir o ong_id é o header da sessao HTML informando o contexto do insert (quem está logado)
        const ong_id = request.headers.authorization;
        //fazer a conexão com o banco de dados e na tabela incidents inserir os dados
        const [id] = await connection('incidents').insert({
            title,
            description,
            value,
            ong_id,
        });
        //retornar com o id 
        return response.json({ id });

    },
    async delete(request, response) {
        // capturar o id
        const { id } = request.params;
        //capturar o id da ong logada para verificar se o incidente a ser deletado foi criado por quem solicita o delete
        const ong_id = request.headers.authorization;
        const incident = await connection('incidents')
            //se e somente se o id do logado for igual ao id do incidente a ser deletado
            .where('id', id)
            //seleciona a coluna ong_id
            .select('ong_id')
            //mostrar apenas o primeiro resultado
            .first();
        if (incident.ong_id != ong_id) {
        //se os ids forem diferentes retorno em json com o status http de não autorizado
        return response.status(401).json({ error: 'Operation not permited' });
        }
        //se os id's forem iguais deletar o incidente
        await connection('incidents').where('id', id).delete();
        //retornar o resultado
        return response.status(204).send();
    }
};