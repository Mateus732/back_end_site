let cartoesData = [
    {
        nome: 'Tenis adidas',
        valor: 'Rs10,00',
        imagem: 'https://images3.memedroid.com/images/UPLOADED931/63d04581c8edb.jpeg'
    },
    {
        nome: 'Camisa puma',
        valor: 'Rs10,00',
        imagem: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQEktUvgIfWt6NY2S9B17Zm1E8qjhyv5umz4A&s'
    },
    {
        nome: 'Bone lacost',
        valor: 'Rs10,00',
        imagem: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQv-7uzT8wAlv1fvgs0JD-9-KSsUYd2nHlRK6V9HKoMb4BZDU-QGTdCxy0NbokvyVGb0qc&usqp=CAU'
    },
    {
        nome: 'puma',
        valor: 'Rs11,00',
        imagem: 'https://images3.memedroid.com/images/UPLOADED924/64fe629031dec.jpeg'
    },
    {
        nome: 'the last of us',
        valor: 'Rs10,00',
        imagem: 'https://i.redd.it/xmy1rnvzduh31.jpg'
    },
    {
        nome: 'mesa de vidro desmontada',
        valor: 'Rs10,00',
        imagem: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQzrJ3m7hJWlLgg8GNiLscuwdgpQAY8vhbNLQ&s'
    },
    {
        nome: 'Minecraft oficial',
        valor: 'Rs10,00',
        imagem: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR4zNOVbI4IYMssXwlneKWpF-fIuZ89TK3fyA&s'
    },
    {
        nome: 'Tenis nike oficial',
        valor: 'Rs10,00',
        imagem: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT3iTl7kg7TMG7QNHwwcCyIDGpNEF5AzXp1Hg&s'
    },
    {
        nome: 'brinquedo vingadores',
        valor: 'Rs10,00',
        imagem: 'https://nofake.com.br/wp-content/uploads/2023/02/Brinquedos-falsificados-01.webp'
    },
    {
        nome: 'frozen',
        valor: 'Rs10,00',
        imagem: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRxOY10fUtkFUe1v40QJoxKBVkV_69kFgswog&s'
    },
    {
        nome: 'Mochila Mario',
        valor: 'Rs10,00',
        imagem: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRR1syt4N_H20QHlb2uvTKegWk2gVTEqCiXX-EcIUDA6L1CTL8x9Jm-3PT0rhLYfg2E_7E&usqp=CAU'
    },
    {
        nome: 'camisa vingadores',
        valor: 'Rs10,00',
        imagem: 'https://lh3.googleusercontent.com/proxy/hn8bkAM5t4QVygBcbXzfnR__UXua4W1cQRQ8EeCiw524wcUfO2CILInZiesJExciP-FLIjTQWAuYg55NPff7xZuhZA-s1YNWtDtOgf2zUDQA1bU_EFxNZpSk1btJmGxzKwevBm7kEQ'
    },
    {
        nome: 'tenis apple',
        valor: 'Rs10,00',
        imagem: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ6SH1icolT0vkn3b0Mbyb8KA5sGum-91IV4Q&s'
    },
    {
        nome: 'godzilla vs kong',
        valor: 'Rs10,00',
        imagem: 'https://images7.memedroid.com/images/UPLOADED494/616c4a3e300ad.jpeg'
    },
    {
        nome: 'carro para pedreiro conjunto',
        valor: 'Rs10,00',
        imagem: 'https://cdn.autopapo.com.br/box/uploads/2020/11/20134828/logus-pedreiro-antes-depois-lata-velha-5.jpg'
    },
    {
        nome: 'dvd carros',
        valor: 'Rs10,00',
        imagem: 'https://http2.mlstatic.com/D_NQ_NP_652901-MLB47908793421_102021-O.webp'
    },
    {
        nome: 'preisteixon 5',
        valor: 'Rs1000,00',
        imagem: 'https://segredosdomundo.r7.com/wp-content/uploads/2015/08/414.jpg' 
    },
    {
        nome: 'guerra civil carreta furacao edition',
        valor: 'Rs10,00',
        imagem: 'https://www.criatives.com.br/wp-content/uploads/2017/06/12809721_1709850359271468_778102089026941415_n-597x479.jpg'
    },
    {
        nome: 'rtx 4090',
        valor: 'Rs10,00',
        imagem: 'https://http2.mlstatic.com/D_NQ_NP_999867-MLA48656384323_122021-O.webp' 
    },
    {
        nome: 'jaqueta nike',
        valor: 'Rs10,00',
        imagem: 'https://segredosdomundo.r7.com/wp-content/uploads/2015/08/105.jpg.webp'
    }
];


export function criarCartoes() {
    let sectionCartoes = document.getElementById('cartoes');

    // Usando um loop for para iterar sobre cartoesData
    for (let i = 0; i < cartoesData.length; i++) {
        let cartao = cartoesData[i]; // Acessa cada objeto de cartão
        let cartaoDiv = document.createElement('div');
        cartaoDiv.className = 'cartao';

        // Criando os elementos de texto e imagem
        let h1 = document.createElement('h1');
        h1.textContent = cartao.nome;

        let h3 = document.createElement('h3');
        h3.textContent = cartao.valor;

        let p = document.createElement('p');
        p.textContent = 'sobre';

        let img = document.createElement('img');
        img.src = cartao.imagem;  // Adiciona a imagem
        img.alt = `Imagem de ${cartao.nome}`;
        img.style.width = '100%';  // Adapta a largura da imagem ao cartão
        img.style.height = 'auto'; // Mantém a proporção da imagem

        // Adiciona os elementos ao cartão
        cartaoDiv.appendChild(h1);
        cartaoDiv.appendChild(img);  // Insere a imagem no cartão
        cartaoDiv.appendChild(h3);
        cartaoDiv.appendChild(p);

        // Adiciona o cartão à seção
        sectionCartoes.appendChild(cartaoDiv);
    }
}
