# labecommerce-backend

Nesse repositório estão todos os exercícios e o projeto final do "módulo 3 - back-end" do bootcamp Labenu.

*Typescript I* - Primeiramente adicionei o arquivo "index.ts" (src/index.ts), "database.ts" (src/database.ts) com os arrays "users" e "products", e "types.ts" (src/types.ts) para setar os types dos arrays de database.ts.

*Typescript II* - Em "index.ts" (src/index.ts) criei 5 funções: createUser para criar um novo usuário, getAllUsers para mostrar a lista com todos os usuários, createProduct para criar um novo produto, getAllProducts para mostrar a lista com todos os produtos e searchProductsByName para filtrar os produtos desejados por nome.

*APIs e Express* - Em "index.ts" (src/index.ts) criei 4 endpoints: "/", endpoint padrão, que é a primeira página e testa se a API está rodando, "/users", que mostra todos os usuários, "/products", que mostra todos os produtos e "ping", que foi requisito do exercício. Então foram criados 4 requests para a API: "Get all users", para mostrar todos os usuários, "Get products", que pode procurar produtos por nome ou mostrar a lista de produtos completa, "Create new user", para criar um novo usuário e "Create new product", para criar um novo produto. Foi adicionado o arquivo "request.rest" para enviar os requests direto do terminal do REST Client no VS Code.

*Aprofundamento Express* - Em "index.ts" (src/index.ts) implementei a função de deletar user pelo id, deletar produto pelo id, e editar produto pelo id.

*Fluxo de dados back-end* - Em "index.ts" (src/index.ts) refatorei todos endpoints com try/catch e adicionei verificações para lidar com valores incorretos.

*Intro SQL* - Criei o banco de dados (src/database/labecommerce.db) e a página do SQLite (src/database/labecommerce.sql) e nela duas tabelas: "users" e "products". Populei users com 3 usuários e products com 5 produtos.

*Aprofundamento SQL* - Em (src/database/labecommerce.sql) criei as queries que futuramente serão conectadas às suas respectivas requests da API.

*Relações SQL I* - Implementei o sistema de relacionamento no banco de dados (src/database/labecommerce.sql) criando a tabela "purchases", populando ela com uma compra para cada usuário, e criando uma "nota fiscal" na query SELECT com JOIN onde ele coleta informações de ambas as tabelas para mostrar todas as informações da compra.