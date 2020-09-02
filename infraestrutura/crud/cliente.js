const executaQuery = require('../database/queries')

class Cliente {
    lista() {
        const sql = 'SELECT * FROM Clientes';

        return executaQuery(sql);
    }

    buscaPorId(id) {
        const sql = `SELECT * FROM Clientes WHERE id=${id}`;

        return executaQuery(sql).then((resultados) => resultados[0]);
    }

    adiciona(item) {
        const { nome, cpf } = item;
        const sql = `INSERT INTO Clientes(nome, CPF) VALUES('${nome}', '${cpf}')`;

        return executaQuery(sql).then((resultados) => ({
            id: resultados.insertId,
            nome,
            cpf
        }));
    }

    atualiza(item) {
        const { id, nome, cpf } = item;
        const sql = `UPDATE Clientes SET nome='${nome}', CPF='${cpf}' WHERE id=${id}`;

        return executaQuery(sql).then(() => (item));
    }

    deleta(id) {
        const sql = `DELETE FROM Clientes WHERE id=${id}`;

        return executaQuery(sql).then(() => id);
    }
}

module.exports = new Cliente
