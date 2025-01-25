<h1 align="center"> Soul Points </h1>

<div align="center">

  <a href="https://github.com/coelhoalexandre/projeto-alura-alfood/blob/master/LICENSE" target="_blank"><img src="https://img.shields.io/badge/License-MIT-yellow.svg" alt="License: MIT"></a> <img src="https://img.shields.io/badge/Completo-lightgreen.svg" alt="Completo">

</div>

## Sumário

- [Sobre o Projeto](#sobre-o-projeto)
- [Instalando e Iniciando o Projeto](#instalando-e-iniciando-o-projeto)
- [Mecânicas do Jogo](#mecânicas-do-jogo)
- [Tecnologias Utilizadas](#tecnologias-utilizadas)
- [Autor](#autor)

## Sobre o Projeto

Soul Points é um projeto simples de jogo multiplayer desenvolvido para pratica principalmente a tecnologia de WebSocket.

Como mecionado, o jogo é simples e conta com uma tematica em que os jogadores são almas e ficam coletando outras almas, seja a de outros jogadores mais fracos ou almas puras que surgem no mapa. 

Além disso, o jogo conta com um sistema de autenticação, que permite cadastrar e logar com um usuario, como também salvar a quantidade de pontos de alma foram coletados antes de sair.

## Instalando e Iniciando o Projeto

Antes de tudo, este projeto usa o serviço do MongoDB, então será necessario criar ou usar um banco de dados com ele. O nome do banco de dados é "soul-points" e possui três coleções, sendo elas: "users", "players" e "pureSouls". 

As configurações sobre a conexão com banco de dados se encontra em `./server/db/dbConnect.js` e caso mude o banco de dados as classes em `./server/services` devem ser verificadas, já que são elas que fazem a conexão com o banco de dados.

Agora começando, após ter o projeto em sua maquina, seja por download ou clonagem, devera fazer os seguintes passos:

1. Instalar as dependecias com `npm install`
3. Criar um arquivo `.env` na raiz do projeto.
4. Dentro do `.env` criar duas variaveis com os nomes: `JWT_SECRET_KEY` e `MONGO_DB_CONNECTION`
   - Atribua `JWT_SECRET_KEY` com algum valor qualquer
   - Atribua `MONGO_DB_CONNECTION` com o valor da string de conexão fornecida pelo MongoDB Driver.
5. Levante o servidor com `npm run dev` no terminal

Com esses passos o servidor já estará funcionando localmente!

## Mecânicas do Jogo

Soul Points conta com algumas mecanicas que estão concentradas na pasta GameController (./server/GameController), dentre elas estão:

- O **Movimento** do Jogador com as teclas de seta ou WASD
- **Colisão** com outros Jogadores e Almas Puras, que tem efeitos diferentes:
  - Colidir com Jogadores com mais pontos de alma que você ou com a mesma cor cancela o **Movimento**
  - Colidir com Jogadores com menos almas e cor diferente faz com que o Jogador em **Movimento** ganhe todas os pontos almas do Jogador Colidido, que por sua vez é destruido
  - Colidir com Almas Puras sempre faz com que ela seja Destruida e o Jogador em **Movimento** recebe seus pontos de alma
- Ser **Destruido** significa que os dados são removidos do **Estado do Jogo**, caso um Jogado seja Destruido ele recebe uma tela de **Game Over**
- As **Cores** dos Jogadores são alteradas baseadas na quantidade de pontos de alma que ele possui. A quantidade de pontos de alma para trocar de cor é definido pela propriedade **pointsToChangeColor**. 

Todas as mêcanicas são cambiáveis e suas alterações podem ser feitas dentro de `./server/GameController`.

## Tecnologias Utilizadas

1. HTML
2. Tailwind
3. JavaScript
4. Node.js
5. Express
6. Socket.io
7. MongoDB
8. JSON Web Token

## Autor
Meu nome é **Alexandre Coelho**, sou autor deste Readme, sou aluno da Universidade Estadual de Santa Cruz e da Alura. No momento estudo Desenvolvimento Web e este foi um dos projetos que tive ideia de fazer enquanto estudava WebSockets na Alura.

Para este projeto deve agradecimento especial a Filipe Deschamps, que mesmo não sabendo me ajudou a salvar este projeto com uma playlist dele de meia decáda atrás, na qual ele tinha um projeto muito similar com minha propria ideia.

Por fim, tentei seguir boas práticas na criação do projeto em si e por em prática algumas ideias que tinha em minha mente. Qualquer opnião ou contribuição será aceita como de grande ajuda!

Agradeço por sua leitura e a seguir deixo alguns links de redes minhas:

<br>

<br>

<div align="center">

<a href = "https://github.com/coelhoalexandre"><img src="https://img.shields.io/badge/GitHub-%23333?style=for-the-badge&logo=github&logoColor=white" alt="GitHub Badge"></a>
<a href="https://www.linkedin.com/in/-coelhoalexandre/" target="_blank"><img src="https://img.shields.io/badge/-LinkedIn-%230077B5?style=for-the-badge&logo=linkedin&logoColor=white" alt="LinkedIn Badge"></a>
<a href = "mailto:alexandrecoelhocontato@gmail.com" target="_blank"><img src="https://img.shields.io/badge/-Gmail-critical?style=for-the-badge&logo=gmail&logoColor=white" target="_blank" alt="Gmail Badge"></a>
<a href = "https://cursos.alura.com.br/user/coelhoalexandre" target="_blank"><img src="https://img.shields.io/badge/Alura-0747a6?style=for-the-badge&logo=alura&logoColor=white" target="_blank" alt="Alura Badge"></a>
