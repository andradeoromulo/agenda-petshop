const executaQuery = require('../database/queries')

class Pet {
    lista() {
        const sql = `
      SELECT p.id, p.nome, p.tipo, p.observacoes, c.id AS donoId, c.nome AS donoNome, c.cpf AS donoCpf
        FROM Pets p JOIN Clientes c
          ON p.donoId = c.id     
    `;

        return executaQuery(sql).then((resultados) =>

            resultados.map(pet => ({
                id: pet.id,
                nome: pet.nome,
                tipo: pet.tipo,
                observacoes: pet.observacoes,
                dono: {
                    id: pet.donoId,
                    nome: pet.donoNome,
                    cpf: pet.donoCpf
                }
            }))

        );
    }

    buscaPorId(id) {
        const sql = `
      SELECT p.id, p.nome, p.tipo, p.observacoes, c.id AS donoId, c.nome AS donoNome, c.cpf AS donoCpf 
        FROM Pets p JOIN Clientes c
          ON p.donoId = c.id
        WHERE c.id = ${parseInt(id)}
    `;

        return executaQuery(sql).then((resultados) =>
            ({
                id: resultados[0].id,
                nome: resultados[0].nome,
                tipo: resultados[0].tipo,
                observacoes: resultados[0].observacoes,
                dono: {
                    id: resultados[0].donoId,
                    nome: resultados[0].donoNome,
                    cpf: resultados[0].donoCpf
                }
            })
        );
    }

    adiciona(item) {
        const { nome, donoId, tipo, observacoes } = item;

        const sql = `
            INSERT INTO Pets(nome, donoId, tipo, observacoes) 
                VALUES('${nome}', ${donoId}, '${tipo}', '${observacoes}');
            SELECT * FROM Clientes WHERE id=${donoId};
        `;

        return executaQuery(sql).then((resultados) => {
            const id = resultados[0].insertId;
            const dono = resultados[1][0];

            return ({
                id,
                ...item,
                dono
            });
        });
    }

    atualiza(item) {
        const { id, nome, donoId, tipo, observacoes } = item;

        const sql = `
      UPDATE Pets SET nome='${nome}', donoId=${donoId}, tipo='${tipo}', observacoes='${observacoes}' 
      WHERE id=${id};
      SELECT * FROM Clientes WHERE id=${donoId}
    `;

        return executaQuery(sql).then((resultados) => {
            const dono = resultados[1][0];

            return ({
                ...item,
                dono
            });
        });
    }

    deleta(id) {
        const sql = `DELETE FROM Pets WHERE id=${id}`;

        return executaQuery(sql).then(() => id);
    }
}

module.exports = new Pet
