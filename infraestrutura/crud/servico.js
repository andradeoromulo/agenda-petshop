const executaQuery = require('../database/queries')

class Servico {
  lista() {
    const sql = 'SELECT * FROM Servicos';

    return executaQuery(sql);
  }

  buscaPorId(id) {
    const sql = `SELECT * FROM Servicos WHERE id=${parseInt(id)}`;

    return executaQuery(sql).then(resultados => resultados[0]);
  }

  adiciona(item) {
    const { nome, preco, descricao } = item;
    const sql = `INSERT INTO Servicos(nome, Preco, Descricao) VALUES('${nome}', ${preco}, '${descricao}')`;

    return executaQuery(sql).then((resultados) => ({
      id: resultados.insertId,
      nome,
      preco,
      descricao
    }));
  }

  atualiza(item) {
    const { id, nome, preco, descricao } = item;
    const sql = `UPDATE Servicos SET nome='${nome}', Preco=${preco}, Descricao='${descricao}' WHERE id=${id}`;

    return executaQuery(sql).then(() => item);
  }

  deleta(id) {
    const sql = `DELETE FROM Servicos WHERE id=${id}`;

    return executaQuery(sql).then(() => id);
  }
}

module.exports = new Servico;
