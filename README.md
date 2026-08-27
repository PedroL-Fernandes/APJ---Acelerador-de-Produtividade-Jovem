# APJ — Acelerador de Produtividade Jovem

## Sobre o projeto

O APJ é uma plataforma de onboarding desenvolvida para organizar e centralizar informações importantes para a entrada de novos integrantes em uma equipe de tecnologia e dados.

A proposta do projeto é transformar um processo de integração que normalmente depende de diversos documentos, links, explicações e checklists em uma jornada única, organizada e interativa.

O usuário pode navegar pelas etapas, consultar conteúdos, acompanhar seu progresso, verificar acessos necessários e entender as principais ferramentas, ambientes e processos utilizados durante sua integração.

Esta versão foi preparada para publicação no GitHub utilizando conteúdos demonstrativos e referências públicas, sem expor informações, dados ou sistemas corporativos.

---

## Objetivo

O principal objetivo do projeto foi resolver um problema de organização e acesso à informação durante o processo de onboarding.

Em um ambiente de tecnologia, uma pessoa que está começando pode precisar consultar diferentes fontes para descobrir:

* Quais ferramentas utilizar
* Quais acessos solicitar
* Onde encontrar determinada documentação
* Como funcionam os ambientes
* Como utilizar ferramentas de desenvolvimento
* Como funciona o fluxo de trabalho da equipe
* Onde encontrar suporte quando surgir uma dúvida

O APJ reúne essas informações em uma única aplicação, criando uma sequência lógica de aprendizado e adaptação.

---

## O que foi desenvolvido

A aplicação foi estruturada como uma jornada dividida em diferentes etapas.

Cada etapa apresenta conteúdos específicos através de cards, tópicos, imagens, dicas e referências.

Entre os principais recursos desenvolvidos estão:

* Jornada de onboarding
* Organização de conteúdos por etapas
* Checklist de acessos
* Categorias de ferramentas
* Acompanhamento de progresso
* Links para documentação
* Glossário de termos técnicos
* Conteúdos relacionados a desenvolvimento
* Conteúdos relacionados a dados e BI
* Conceitos de ambientes de desenvolvimento
* Git e GitHub
* Monitoramento
* Processos e chamados
* Boas práticas
* Segurança e documentação

---

## Estrutura de acessos

Uma das funcionalidades importantes do projeto é o checklist de acessos.

A ideia é organizar os recursos necessários para que uma pessoa consiga iniciar suas atividades, separando-os por categorias.

Exemplo:

```text
Acessos
├── Desenvolvimento
│   ├── Editor de código
│   ├── Git
│   └── Ambiente local
│
├── Dados e BI
│   ├── Banco de dados
│   ├── Ferramenta de BI
│   └── Dataset
│
├── Colaboração
│   ├── GitHub
│   ├── Repositórios
│   └── Pull Requests
│
└── Segurança
    ├── Autenticação
    ├── 2FA
    └── Secrets
```

Essa estrutura foi pensada para ser reutilizável e adaptável a diferentes equipes e organizações.

---

## Estrutura do projeto

O conteúdo da aplicação é separado da lógica da interface.

O arquivo `data.js` concentra as informações utilizadas pelas etapas da aplicação.

Isso permite modificar ou adicionar conteúdos sem precisar alterar diretamente a estrutura principal da interface.

Por exemplo, uma nova etapa pode possuir:

```javascript
{
    titulo: "Nova Etapa",
    cards: [
        {
            titulo: "Título",
            descricao: "Descrição da etapa",
            topicos: [],
            imagem: "assets/imagem.png",
            dica: "Informação adicional",
            referencia: "Referência"
        }
    ]
}
```

Essa abordagem facilita a manutenção e permite que a plataforma seja expandida conforme novas necessidades surgem.

---

## Tecnologias utilizadas

### Front-end

* HTML5
* CSS3
* JavaScript

O front-end é responsável pela interface, navegação entre as etapas, apresentação dos conteúdos, checklists e interação com o usuário.

### Back-end

* Node.js

O Node.js foi utilizado como base para a estrutura de back-end da aplicação e para o gerenciamento das funcionalidades relacionadas ao projeto.

### Banco de dados

* MySQL

O MySQL foi utilizado para trabalhar com persistência e organização de dados da aplicação.

### Ferramentas

* Git
* GitHub
* Visual Studio Code
* XAMPP

---

## Desafios encontrados

Um dos principais desafios foi transformar uma grande quantidade de informações em uma estrutura que fosse fácil de entender e navegar.

Não bastava apenas disponibilizar documentos e links. Era necessário pensar em uma sequência que ajudasse o usuário a entender o contexto antes de chegar às informações mais específicas.

Outro desafio foi criar uma estrutura de dados flexível o suficiente para permitir diferentes tipos de conteúdo.

As etapas possuem necessidades diferentes. Algumas apresentam informações simples, enquanto outras precisam de checklists, categorias, links ou conteúdos técnicos.

Por isso, o `data.js` foi estruturado de maneira que diferentes componentes pudessem utilizar a mesma base de dados.

Também foi necessário pensar na organização visual e na experiência do usuário para evitar que uma grande quantidade de informações se tornasse difícil de consultar.

---

## Problema que o projeto busca resolver

O APJ busca reduzir a dificuldade encontrada por pessoas que estão entrando em um novo ambiente de tecnologia.

Sem uma estrutura centralizada, informações importantes podem ficar distribuídas entre:

* Documentações
* Mensagens
* E-mails
* Sistemas
* Planilhas
* Links
* Explicações de outros integrantes

Isso pode aumentar o tempo necessário para que uma pessoa consiga começar suas atividades de forma independente.

A proposta do APJ é transformar esse processo em uma jornada estruturada, na qual o usuário consegue consultar as informações necessárias de acordo com cada etapa.

---

## Decisões de desenvolvimento

Uma das principais decisões foi separar o conteúdo da aplicação da lógica responsável pela apresentação.

Com isso, o conteúdo pode ser atualizado diretamente na estrutura de dados sem precisar alterar toda a aplicação.

Outra decisão foi utilizar uma estrutura baseada em etapas e cards.

Isso permite que o projeto seja utilizado para diferentes cenários, não apenas onboarding de tecnologia.

A mesma estrutura pode ser adaptada para:

* Treinamentos
* Documentação interna
* Trilhas de aprendizagem
* Integração de novos funcionários
* Guias técnicos
* Checklists
* Processos operacionais

---

## Open Source

A versão disponibilizada neste repositório foi adaptada para publicação pública.

Foram removidos ou substituídos conteúdos que poderiam expor informações corporativas, utilizando exemplos genéricos, dados fictícios e links públicos.

O objetivo é disponibilizar a estrutura e as ideias do projeto sem expor informações de ambientes privados.

Ao utilizar o projeto em um ambiente real, recomenda-se revisar cuidadosamente:

* URLs
* Credenciais
* Tokens
* API Keys
* Dados pessoais
* Informações de clientes
* Imagens
* Screenshots
* Configurações internas
* Histórico do Git

---

## Possíveis melhorias

O projeto pode ser expandido futuramente com:

* Autenticação de usuários
* Persistência do progresso
* Banco de dados integrado
* Painel administrativo
* Criação e edição de etapas
* Sistema de busca
* Sistema de notificações
* Testes automatizados
* API
* Controle de permissões
* Gamificação
* Deploy em cloud

---

## Resultado

O resultado é uma plataforma que transforma o processo de onboarding em uma experiência mais organizada e interativa.

Em vez de depender exclusivamente de documentos e explicações isoladas, o usuário possui uma jornada estruturada para entender o ambiente, consultar ferramentas, verificar acessos e acompanhar sua evolução.

O projeto também demonstra conceitos de desenvolvimento web, organização de dados, experiência do usuário, documentação e estruturação de sistemas.

---

## Autor

**Pedro Luiz**

Projeto desenvolvido como estudo e aplicação prática de conceitos de desenvolvimento web, organização de processos e criação de uma plataforma de onboarding.

---

## Licença

Este projeto está disponível para fins de estudo e desenvolvimento, podendo ser adaptado conforme as necessidades de outros projetos.
