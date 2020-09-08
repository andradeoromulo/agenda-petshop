const executaQuery = require('../database/queries');
const { atendimento } = require('.');

class Atendimento {
    lista() {
        const sql = `
            SELECT a.id, a.data, a.status, a.observacoes,
                p.id AS petId, p.nome AS petNome, p.tipo AS petTipo, p.observacoes AS petObservacoes,
                c.id AS clienteId, c.nome AS clienteNome, c.cpf AS clienteCpf,
                s.id AS servicoId, s.nome AS servicoNome, s.preco AS servicoPreco, s.descricao AS servicoDescricao
                FROM Atendimentos a JOIN Pets p JOIN Clientes c JOIN Servicos s
                WHERE a.petId = p.id 
                    AND a.clienteId = c.id
                    AND a.servicoId = s.id
        `;

        return executaQuery(sql).then((resultados) => {
            return resultados.map(atendimento => ({
                id: atendimento.id,
                data: atendimento.data, 
                status: atendimento.status,
                observacoes: atendimento.observacoes,
                cliente: {
                    id: atendimento.clienteId,
                    nome: atendimento.clienteNome,
                    cpf: atendimento.clienteCpf
                },
                pet: {
                    id: atendimento.petId,
                    nome: atendimento.petNome,
                    tipo: atendimento.petTipo,
                    observacoes: atendimento.petObservacoes
                },
                servico: {
                    id: atendimento.servicoId,
                    nome: atendimento.servicoNome,
                    preco: atendimento.servicoPreco,
                    descricao: atendimento.servicoDescricao
                }
            }));
        });
    }

    buscaPorId(id) {
        const sql = `
            SELECT a.id, a.data, a.status, a.observacoes,
                p.id AS petId, p.nome AS petNome, p.tipo AS petTipo, p.observacoes AS petObservacoes,
                c.id AS clienteId, c.nome AS clienteNome, c.cpf AS clienteCpf,
                s.id AS servicoId, s.nome AS servicoNome, s.preco AS servicoPreco, s.descricao AS servicoDescricao
                FROM Atendimentos a JOIN Pets p JOIN Clientes c JOIN Servicos s
                WHERE a.id = ${parseInt(id)}
                    AND a.petId = p.id 
                    AND a.clienteId = c.id
                    AND a.servicoId = s.id
        `;

        return executaQuery(sql).then((resultados) => ({
            id: resultados[0].id,
            data: resultados[0].data, 
            status: resultados[0].status,
            observacoes: resultados[0].observacoes,
            cliente: {
                id: resultados[0].clienteId,
                nome: resultados[0].clienteNome,
                cpf: resultados[0].clienteCpf
            },
            pet: {
                id: resultados[0].petId,
                nome: resultados[0].petNome,
                tipo: resultados[0].petTipo,
                observacoes: resultados[0].petObservacoes
            },
            servico: {
                id: resultados[0].servicoId,
                nome: resultados[0].servicoNome,
                preco: resultados[0].servicoPreco,
                descricao: resultados[0].servicoDescricao
            }
        }));
    }

    adiciona(item) {
        const { clienteId, petId, servicoId, status, observacoes } = item;
        const data = new Date().toLocaleDateString();

        const sql = `
            INSERT INTO Atendimentos(clienteId, petId, servicoId, data, status, observacoes) 
                VALUES(${clienteId}, ${petId}, ${servicoId}, '${data}', '${status}', '${observacoes}');
            SELECT * FROM Clientes WHERE id=${clienteId};
            SELECT * FROM Pets WHERE id=${petId};
            SELECT * FROM Servicos WHERE id=${servicoId}
        `;

        return executaQuery(sql).then((resultados) => {
            const atendimento = resultados[0];
            const cliente = resultados[1][0];
            const pet = resultados[2][0];
            const servico = resultados[3][0];

            return ({
                id: atendimento.insertId,
                cliente,
                pet,
                servico,
                data,
                status,
                observacoes
            });
        });
    }

    atualiza(item) {
        const { id, clienteId, petId, servicoId, status, observacoes } = item;
        const data = new Date().toLocaleDateString();

        const sql = `
            UPDATE Atendimentos a
                SET a.clienteId=${parseInt(clienteId)}, a.petId=${parseInt(petId)}, a.servicoId=${parseInt(servicoId)}, a.data='${data}', a.status='${status}', a.observacoes='${observacoes}' 
                WHERE a.id=${parseInt(id)};
            SELECT * FROM Clientes c
                WHERE c.id=${parseInt(clienteId)};
            SELECT * FROM Pets p
                WHERE p.id=${parseInt(petId)};
            SELECT * FROM Servicos s
                WHERE s.id=${parseInt(servicoId)}
        `;

        return executaQuery(sql).then((resultados) => {
            
            const cliente = resultados[1][0];
            const pet = resultados[2][0];
            const servico = resultados[3][0];

            return ({
                id,
                data,
                status,
                observacoes,
                cliente,
                pet,
                servico
            });

        });
    }   

    deleta(id) {
        const sql = `DELETE FROM Atendimentos WHERE id=${id}`;

        return executaQuery(sql).then(() => id);
    }
}

module.exports = new Atendimento;
