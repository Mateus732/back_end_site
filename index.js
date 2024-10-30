const express = require('express');
const cors = require('cors');
const admin = require("firebase-admin");
const serviceAccount = require("./ChaveFirebase.json");

const app = express();
const port = 3000;

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();

app.use(express.json());
app.use(cors());

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

app.post('/cartoes', async (req, res) => {
    const { nome, valor, imagem } = req.body;
    if (!nome || !valor || !imagem) {
        return res.status(400).json({ mensagem: 'Todos os campos são obrigatórios.' });
    }
    try {
        await db.collection('cartoes').add({ nome, valor, imagem });
        res.status(201).json({ mensagem: 'Cartão cadastrado com sucesso!' });
    } catch (e) {
        console.error('Erro ao cadastrar cartão:', e);
        res.status(500).json({ mensagem: 'Erro ao cadastrar cartão' });
    }
});

app.delete('/cartoes/:id', async (req, res) => {
    const id = req.params.id;
    try {
        await db.collection('cartoes').doc(id).delete();
        res.status(200).json({ mensagem: 'Cartão excluído com sucesso!' });
    } catch (e) {
        console.error('Erro ao excluir cartão:', e);
        res.status(500).json({ mensagem: 'Erro ao excluir cartão' });
    }
});

app.put('/cartoes/:id', async (req, res) => {
    const id = req.params.id;
    const { nome, valor, imagem } = req.body;
    if (!nome || !valor || !imagem) {
        return res.status(400).json({ mensagem: 'Todos os campos são obrigatórios.' });
    }
    try {
        await db.collection('cartoes').doc(id).update({ nome, valor, imagem });
        res.status(200).json({ mensagem: 'Cartão atualizado com sucesso!' });
    } catch (e) {
        console.error('Erro ao atualizar cartão:', e);
        res.status(500).json({ mensagem: 'Erro ao atualizar cartão' });
    }
});

app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
});
