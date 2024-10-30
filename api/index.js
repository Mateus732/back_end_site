const express = require('express');
const cors = require('cors');
const admin = require("firebase-admin");

// Configuração do Firebase com variáveis de ambiente
const serviceAccount = {
    type: "service_account",
    project_id: process.env.FIREBASE_PROJECT_ID,
    private_key_id: process.env.FIREBASE_PRIVATE_KEY_ID,
    private_key: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n'), // Para corrigir quebra de linha
    client_email: process.env.FIREBASE_CLIENT_EMAIL,
    client_id: process.env.FIREBASE_CLIENT_ID,
    auth_uri: "https://accounts.google.com/o/oauth2/auth",
    token_uri: "https://oauth2.googleapis.com/token",
    auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
    client_x509_cert_url: `https://www.googleapis.com/robot/v1/metadata/x509/${process.env.FIREBASE_CLIENT_EMAIL}`
};

const app = express();
const port = 3000;

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
        return res.status(400).json({ mensagem: 'Dados incompletos para cadastro do cartão' });
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
    const dadosAtualizados = { Nome, Valor, Imagem };
    try {
        const cartaoRef = db.collection('cartoes').doc(id);
        const doc = await cartaoRef.get();
        if (!doc.exists) {
            return res.status(404).json({ mensagem: `Cartão com ID ${id} não encontrado` });
        }
        await cartaoRef.update(dadosAtualizados);
        res.status(200).json({ mensagem: `Cartão com ID ${id} atualizado com sucesso` });
    } catch (e) {
        console.error('Erro ao atualizar cartão:', e);
        res.status(500).json({ mensagem: 'Erro ao atualizar cartão' });
    }
});

module.exports = app;
