const express = require('express');
const cors = require('cors');
const admin = require("firebase-admin");

const serviceAccount = {
    // Suas credenciais aqui
};

const app = express();
const port = process.env.PORT || 3000; // Use a porta fornecida pelo Vercel

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();

app.use(express.json());
app.use(cors());

// Rota para buscar cartões
app.get('/cartoes', async (req, res) => {
    try {
        const snapshot = await db.collection('cartoes').get();
        const cartoes = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        res.status(200).json({ cartoes });
    } catch (e) {
        console.error('Erro ao buscar cartões:', e);
        res.status(500).json({ mensagem: 'Erro ao buscar cartões' });
    }
});

// Rota para criar um novo cartão
app.post('/cartoes', async (req, res) => {
    const { Nome, Valor, Imagem } = req.body;
    if (!Nome || !Valor || !Imagem) {
        return res.status(400).json({ mensagem: 'Dados inválidos para cadastro do cartão' });
    }
    try {
        await db.collection('cartoes').add({
            Nome,
            Valor,
            Imagem,
            criadoEm: admin.firestore.FieldValue.serverTimestamp()
        });
        res.status(201).json({ mensagem: 'Cartão cadastrado com sucesso!' });
    } catch (e) {
        console.error('Erro ao cadastrar cartão:', e);
        res.status(500).json({ mensagem: 'Erro ao cadastrar cartão' });
    }
});

// Rota para excluir um cartão
app.delete('/cartoes/:id', async (req, res) => {
    const id = req.params.id;
    try {
        await db.collection('cartoes').doc(id).delete();
        res.status(200).json({ mensagem: `Cartão com ID ${id} excluído com sucesso!` });
    } catch (e) {
        console.error('Erro ao excluir cartão:', e);
        res.status(500).json({ mensagem: 'Erro ao excluir cartão' });
    }
});

// Rota para atualizar um cartão
app.put('/cartoes/:id', async (req, res) => {
    const id = req.params.id;
    const { Nome, Valor, Imagem } = req.body;
    const dadosAtualizados = {};
    if (Nome) dadosAtualizados.Nome = Nome;
    if (Valor) dadosAtualizados.Valor = Valor;
    if (Imagem) dadosAtualizados.Imagem = Imagem;

    try {
        const cartaoRef = db.collection('cartoes').doc(id);
        await cartaoRef.update(dadosAtualizados);
        res.status(200).json({ mensagem: `Cartão com ID ${id} atualizado com sucesso` });
    } catch (e) {
        console.error('Erro ao atualizar cartão:', e);
        res.status(500).json({ mensagem: 'Erro ao atualizar cartão' });
    }
});

// Exportando o app para ser utilizado pelo Vercel
module.exports = app;
