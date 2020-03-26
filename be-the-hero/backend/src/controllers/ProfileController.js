const connection = require('../database/connection');
module.exports = {
    async index(request, response) {
        //acessa os dados da ong logada
        const ong_id = request.headers.authorization;
        //busca todos os incidentes
        const incidents = await connection('incidents')
            .where('ong_id', ong_id)
            .select('*');
        return response.json(incidents);
    }
}