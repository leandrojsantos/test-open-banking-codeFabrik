<h1 align="center">
    <a href="#" alt=""> Open Banking Application </a>
</h1>

<h4 align="center">
	🚧 Em produção 🚧
</h4>

<p align="center" >
 <a href="#sobre-o-projeto"> 📌 Sobre o projeto</a> •
 <a href="#layout">Layout</a> • 
 <a href="#rodando-o-projeto">Rodando o projeto</a> •
 <a href="#tecnologias">Tecnologias</a> •
 <a href="#contribuição">Contribuição</a>
</p>

## 📂 Sobre o projeto
Desenvolvimento de um backend robusto para Open Banking, aplicando boas práticas de engenharia de software com ênfase em usabilidade, código limpo e documentação completa.


## 🎨 Layout

<p align="center" style="display: flex; align-items: flex-start; justify-content: center;">
  <img alt="img1" title="#img1" src="./open-banking-api-nest/src/common/image/" width="400px">
</p>


### ⚙️ Rodando o projeto
```bash

1. Clone o repositório:
 $ git clone git@github.com:leandrojsantos/test-open-banking-codeFabrik.git
 $ cd open-banking-api-nest

2. Crie um arquivo `.env` baseado no `.env.example`

3. Execute `docker-compose up -d` para subir os containers

4. Execute as migrações: `npm run typeorm migration:run`

5. Escolha uma da versões:
# versão dev
npm install
npm run start:dev
# versão produção
npm run build
npm run start:prod

6. Acesse a documentação da API em: http://localhost:3000/api 
    Swagger UI (Rotas da api): http://localhost:3000/api
    PGAdmin (Banco de dados da api use os dados ".env"): http://localhost:5050

```

## 🛠️ Tecnologias
As seguintes ferramentas foram usadas:
- [ ] API REST com Nest
- [ ] Testes com Jest
- [ ] Containerização com Docker
- [ ] Banco de dados relacional com PostgreSQL
- [ ] Documentação da API na pasta "open-banking-api-nest"
- [ ] Usabilidade da API, código limpo e padrão de projeto

## 📜 Contribuição

  Faça um fork do projeto em seguida:

  1. Crie sua branch (git checkout -b feature/newFeature)

  2. Commit suas mudanças (git commit -m 'feat: descricao breve da newFeature')

  3. Push para a branch (git push origin feature/newFeature)

  4. Abra um Pull Request no github




