# labecommerce-backend

Nesse repositório estão todos os exercícios e o projeto final do "módulo 3 - back-end" do bootcamp Labenu.

Typescript I - Primeiramente adicionei o arquivo "index.ts", "database.ts" com os arrays "users" e "products", e "types.ts" para setar os types dos arrays de database.ts.

Typescript II - Criei 5 funções: createUser para criar um novo usuário, getAllUsers para mostrar a lista com todos os usuários, createProduct para criar um novo produto, getAllProducts para mostrar a lista com todos os produtos e searchProductsByName para filtrar os produtos desejados por nome.

APIs e Express - Criei 4 endpoints: "/", endpoint padrão, que é a primeira página e testa se a API está rodando, "/users", que mostra todos os usuários, "/products", que mostra todos os produtos e "ping", que foi requisito do exercício. Então foram criados 4 requests para a API: "Get all users", para mostrar todos os usuários, "Get products", que pode procurar produtos por nome ou mostrar a lista de produtos completa, "Create new user", para criar um novo usuário e "Create new product", para criar um novo produto. Foi adicionado o arquivo "request.rest" para enviar os requests direto do terminal do REST Client no VS Code.

Aprofundamento Express - Implementei a função de deletar user pelo id, deletar produto pelo id, e editar produto pelo id.

Fluxo de dados back-end - Refatorei todos endpoints com try/catch e adicionei verificações para lidar com valores incorretos.