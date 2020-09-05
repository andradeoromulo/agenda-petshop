const executaQuery = require('../database/queries')

class Cliente {
    lista() {
        const sql = `
            SELECT * FROM clientes;
            SELECT * FROM pets;
        `;

        return executaQuery(sql).then((resultados) => {
            const clientes = resultados[0];
            const pets = resultados[1];

            return clientes.map(cliente => {
                const petsCliente = pets.filter(pet => pet.donoId === cliente.id);
                
                return ({ ...cliente, pets: petsCliente});
            });
        });
    }

    buscaPorId(id) {
        const sql = `
            SELECT * FROM Clientes WHERE id=${id};
            SELECT * FROM Pets WHERE donoId=${id};
        `;

        return executaQuery(sql).then((resultados) => {
            const cliente = resultados[0][0];
            const pets = resultados[1];

            return ({
                ...cliente,
                pets
            });
        });
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
        const sql = `
            UPDATE Clientes 
                SET nome='${nome}', CPF='${cpf}' 
                WHERE id=${id};
            SELECT * FROM Pets
                WHERE donoId=${id};
        `;

        return executaQuery(sql).then((resultados) => {
            const pets = resultados[1];
            
            return ({
                ...item,
                pets
            });
        });
    }

    deleta(id) {
        const sql = `DELETE FROM Clientes WHERE id=${id}`;

        return executaQuery(sql).then(() => id);
    }
}

module.exports = new Cliente
