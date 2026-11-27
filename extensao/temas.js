/* Astronáutica · os três refúgios da extensão.
   Os nomes seguem a tabela de equivalências do Panteão no app (moeda, lugar, sede, toque, guardião, mensageiro). */
var TEMAS = {
  greek: {
    rotulo: 'Acampamento Meio-Sangue', saud: 'Greetings from', postal: 'Camp<br>Half-Blood', sub: 'Chalé 7 · Long Island Sound',
    portao: 'Portão do acampamento', lugar: 'Chalé', moeda: 'Dracmas', moeda1: 'dracma', diretor: 'Quíron', sede: 'Casa Grande', naSede: 'na Casa Grande',
    arena: 'Arena', treino: 'Treino na Arena', loja: 'Bolsa de Dracmas', quadro: 'Quadro de Avisos', fim: 'fogueira', chegada: 'Como você chega à fogueira?', toque: 'Concha',
    dorme: 'O acampamento dorme', missoes: 'Missões do dia', habitos: 'Treinos', voltar: 'Hora de voltar para a Arena.',
    fx: { '06': 'alvorada', '09': 'treinos', '12': 'refeitório', '15': 'arena', '18': 'jantar', '21': 'fogueira' },
    guardiao: { nome: 'Sully', completo: 'Sully Brookhaven', papel: 'sátiro protetor', img: 'img/sully.jpg' },
    mensageiro: 'Polly McCaw',
    falas: {
      ini: ['Cara, um bloco de cada vez. Bora?', 'Tô de olho na fogueira. Você cuida do treino.', 'Quíron não cobra a lista inteira, só o próximo passo.'],
      agua: 'Ei, faltam {n} copos de água. Até sátiro bebe água, cara.',
      foco: 'Aí sim! {n} {b} hoje. Mais um e eu toco um solo de flauta.',
      fim: 'Fecha o dia antes que a fogueira apague?'
    }
  },
  norse: {
    rotulo: 'Hotel Valhala', saud: 'Greetings from', postal: 'Hotel<br>Valhalla', sub: 'Andar 19 · Boston, Mass.',
    portao: 'Portaria do hotel', lugar: 'Andar 19', moeda: 'Marcos de ouro', moeda1: 'marco', diretor: 'Helgi', sede: 'Saguão', naSede: 'no Saguão',
    arena: 'Arena', treino: 'Treino na Arena', loja: 'Tesouro de Andvari', quadro: 'Quadro do Saguão', fim: 'banquete', chegada: 'Como você chega ao banquete?', toque: 'Gjallarhorn',
    dorme: 'O hotel dorme', missoes: 'Sagas do dia', habitos: 'Treinos', voltar: 'Hora de voltar para a Arena, einherji.',
    fx: { '06': 'despertar', '09': 'treinos', '12': 'salão do banquete', '15': 'arena', '18': 'jantar', '21': 'banquete' },
    guardiao: { nome: 'Brynn', completo: 'Brynn Halvorsen', papel: 'valquíria recrutadora', img: 'img/brynn.jpg' },
    mensageiro: 'Hugin',
    falas: {
      ini: ['Einherji, um ponto no placar de cada vez.', 'Brynn está na arquibancada, anotando o placar.', 'Aposto que você não fecha o próximo bloco. Prove o contrário.'],
      agua: 'Faltam {n} copos de água. Guerreiro desidratado não vence ninguém.',
      foco: '{n} {b} no placar hoje. Isso é coisa de guerreiro!',
      fim: 'O banquete vai começar. Feche o dia antes?'
    }
  },
  egypt: {
    rotulo: 'Casa do Brooklyn', saud: 'Greetings from', postal: 'Casa do<br>Brooklyn', sub: 'Nomo 21 · Brooklyn, N.Y.',
    portao: 'Portão da Casa', lugar: 'Aposento', moeda: 'Debens de ouro', moeda1: 'deben', diretor: 'Amós', sede: 'Grande Salão', naSede: 'no Grande Salão',
    arena: 'Arena', treino: 'Treino na Arena', loja: 'Tesouro do Faraó', quadro: 'Quadro do Grande Salão', fim: 'braseiro', chegada: 'Como você chega ao braseiro?', toque: 'Sistro',
    dorme: 'A Casa dorme', missoes: 'Papiros do dia', habitos: 'Ritos', voltar: 'Hora de voltar para a Arena, iniciado.',
    fx: { '06': 'nascer de Rá', '09': 'treinos', '12': 'terraço', '15': 'arena', '18': 'jantar', '21': 'braseiro' },
    guardiao: { nome: 'Toby', completo: 'Toby Nefer', papel: 'babuíno escriba', img: 'img/toby.jpg' },
    mensageiro: 'Benh',
    falas: {
      ini: ['Iniciado, uma linha do papiro de cada vez.', 'Toby está na mesa ao lado, molhando o cálamo.', 'A balança de Ma’at pesa o dia. Comece pelo próximo bloco.'],
      agua: 'Faltam {n} copos de água no registro, iniciado.',
      foco: '{n} {b} registrados. A balança de Ma’at agradece.',
      fim: 'O braseiro já acende. Vamos fechar o registro do dia?'
    }
  }
};
function temaDe(k) { return TEMAS[k] || TEMAS.greek; }
