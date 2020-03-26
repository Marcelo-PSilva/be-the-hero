const connection = require('../database/connection')
module.exports = {
    async create(request, response) {
        //lê o id
        const { id } = request.body;
        const ong = await connection('ongs')
            .where('id', id)
            .select('name')
            .first();
        //se o resultado for diferente da ong, mostrar na tela    
        if (!ong){
            return response.status(400).json({ error: 'No ONG found with this ID'});
        }
        return response.json(ong);
       }
}