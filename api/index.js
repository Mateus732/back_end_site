const express = require('express');
const cors = require('cors');
const admin = require("firebase-admin");

const serviceAccount = {
    type: "service_account",
    project_id: "bdportifolio",
    private_key_id: "2990736d527c9334ad80a5c3e51d584eeb8e2520",
    private_key: "-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQCPFk8quVnomXKk\nK5VooVd0ApBD75x2sRqYHYgdaSjgb7TaZakkHNsFb/S+wRkpeq3MoQf0hmcV0vq0\naNm1XODLLQFMBwWT5wRRYin4dVnfE9y2E2Qg6cS1KYYqr8FzSrO48sVOosKrBpLS\n+8J+9wqiqUbB/MgXsJlhe2XyieekhQFQU64N+JQAlO/z+y2xBMQy40kH+bQ+qe/5\nlOoK6VaITTYoRlvZH7DXCrAvCgbAI/WUNkJVbK3RhcE8gTbZcZebhod7OLHD1FMa\nwKIdoURSDxoiIedvgb3bMIETNbDFL/d8yDpD9p1T+s5VlZHaM9Q1CxeG5xVcASN/\n4kBHnTbVAgMBAAECggEAHkEIUi9IrF6tl7rDZ5EdraDRIhwqyAngZqNv4VAX3YSh\nB8CRB9q2EKtAY4juqg+PagHubaxxZXLroXO9/JP7z9nfOVUOv9wL1K1d1HPzobBQ\nbYsiE7d56RgzjxkEXT1BTOy//UV6xbCpIMUsta3EaOpD1MZ/BEtJ0wvFXYf9G5LW\nywYSl5kVVWw7brNomQUh65TFx/Hp9Ajme/Sxu1vdv08JtaKLDTjXZJ4ht0OtYvTp\nUvvS4H1vT+0R6Wgy1J+Tr+4gezH1WiqS1TBmwTIMb+xKedzzriliKAHZK7Uty2gX\nTBc0/2xOMNWSzR4GPEitrGCUtp9QJev62mhDPPKsrQKBgQDKGnds4vPIwV9Ubz1D\nCXRfLRe93e2m/60i+STOr3HagAEc0LtPIvLn9NcqdBeMVP8w4L2ciGT8XpGo8BNI\nn9BbKSNCGDhqaetlOJJf98Ny+GLPDm+tuZBXnahKHdJDyuroERLLtmg6fUAfn6XF\nOweoPHCr+tUKX9Wnzx0HhtEpywKBgQC1PtKsZk8i4VSXfgngvo0bdnnqvNT7PAQN\nOLBwyDI0Fv0HNMUHNei2rYVgWWUeT9U7FknH1+yYR7waGajgx26S0ubNIXuRHgRm\nlM41/8tZovdPfU541fCBuRt9TIHcvK2cyJt0husUUecL2I+dbrKAApyUdtfHYf+c\nTyZBgY+N3wKBgQCWAwEkJG05VTcyUANT7/+d6bWWq9ULwPm9XNrSQ22p9ptczR5L\nRjCwtY7EJzmXYzusBxUWzDLRFEzf7ZsSq/UWxTkzhRDTA93C2zPi4eAERZPqBtgk\nRfl63z4cDXiV81dbe9jMto804uUm0/RSqlcrq/kh3mQleC75iQUOIia88wKBgDCI\nUweBGd3AMtOiF2kL/WMGNZ1K1Uk1B+y2amC46uCR601brwrAP8Fy840aQv576CA7\nVqRhyGP6iX7/sf4GyTAds1nohlsUi58gZ5uEFGK7RbgOWM34k79Y3uiNbRS7nU2n\nViE844P8bn74jXRdqQSoLl9+90bXkge8FgVieRtHAoGBAKktVCIeG8AS/EY7Kmu9\nrQP0sOtJFa861+dFsNB/PJj4sagPFlIv4zxn7W9IWTO3L9DZGktB9NE+rkU8slUU\nerRwGhew9o/zOCS20ssX7zOo5RIFhLbW/aiL2mKWvRxC3vxj4ua4uaXZMi6lXYA1\nMLx9eTLP0H1tWf0/6/B4gV4b\n-----END PRIVATE KEY-----\n",
    client_email: "firebase-adminsdk-16lao@bdportifolio.iam.gserviceaccount.com",
    client_id: "106693850002351700401",
    auth_uri: "https://accounts.google.com/o/oauth2/auth",
    token_uri: "https://oauth2.googleapis.com/token",
    auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
    client_x509_cert_url: "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-16lao%40bdportifolio.iam.gserviceaccount.com",
    universe_domain: "googleapis.com"
};

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
    const { Nome, Valor, Imagem } = req.body;
    if (!Nome) {
        res.status(400).json({ mensagem: 'Novo cartão não cadastrado, nome inválido' });
        console.log('Novo cartão não cadastrado, nome inválido');
    } else if (!Valor) {
        res.status(400).json({ mensagem: 'Valor do cartão inválido.' });
        console.log('Valor do cartão inválido');
    } else if (!Imagem) {
        res.status(400).json({ mensagem: 'Link da imagem inválido.' });
        console.log('Link da imagem inválido');
    } else {
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
    }
});

app.delete('/cartoes/:id', async (req, res) => {
    const id = req.params.id;
    try {
        const cartaoRef = db.collection('cartoes').doc(id);
        await cartaoRef.delete();
        res.status(200).json({ mensagem: 'Cartão com ID ' + id + ' excluído com sucesso!' });
        console.log('Cartão com ID ' + id + ' deletado');
    } catch (e) {
        console.error('Erro ao excluir cartão:', e);
        res.status(500).json({ mensagem: 'Erro ao excluir cartão' });
    }
});

app.put('/cartoes/:id', async (req, res) => {
    const id = req.params.id;
    const { Nome, Valor, Imagem } = req.body;

    if (!id) {
        return res.status(400).json({ mensagem: 'ID do cartão não fornecido' });
    }

    try {
        const cartaoRef = db.collection('cartoes').doc(id);
        const doc = await cartaoRef.get();

        if (!doc.exists) {
            return res.status(404).json({ mensagem: 'Cartão com ID ' + id + ' não encontrado' });
        }

        const dadosAtualizados = {};
        if (Nome) dadosAtualizados.Nome = Nome;
        if (Valor) dadosAtualizados.Valor = Valor;
        if (Imagem) dadosAtualizados.Imagem = Imagem;

        await cartaoRef.update(dadosAtualizados);

        res.status(200).json({ mensagem: 'Cartão com ID ' + id + ' atualizado com sucesso' });
    } catch (e) {
        console.error('Erro ao atualizar cartão:', e);
        res.status(500).json({ mensagem: 'Erro ao atualizar cartão' });
    }
});

module.exports = app;

/*app.listen(3000, () => {
    console.log('rodando')
});
*/