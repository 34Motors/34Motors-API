<div align="center">
    <h2><strong>
    Instalando as dependências
    </strong>
    </h2>
    <p>Para inciar este projeto, é necessário instalar as dependências. Portanto você deve estar no diretório correto e utilizar o comando abaixo para instalar as dependências:</p>
</div>

```bash
# caso use npm
npm install

# caso use yarn
yarn
```
<br>
<br>
<hr>
<br>
<div align="center">
    <h2>
    <strong>Aplicar as migrações e gerar tabelas</strong>
    </h2>
    <p>Para gerar as tabelas com o PRISMA, é necessário utilizar o comando abaixo:</p>
</div>

```bash
npx prisma migrate dev
```
<br>
<br>
<hr>
<br>
<div align="center">
    <h2>
    <strong>Rodando a aplicação localmente</strong>
    </h2>
    <p>Para rodar a aplicação localmente, também se faz necessário acessar a pasta de cada uma e utilizar o comando abaixo:</p>
</div>

```bash
# caso use npm
npm run dev

# caso use yarn
yarn dev
```
<br>
<br>
<hr>

## **Endpoints**
### **[POST]/users**
* Cria um usuário contendo os seguintes dados: 
  * **name**,
  * **email**,
  * **password**,
  * **cpf**,
  * **phone**
  * **birthDate**
  * **description**
  * **cep**
  * **state**
  * **city**
  * **street**
  * **number**
  * **complement**
  * **isSeller**
* Não é possível criar um novo usuário com email, cpf ou telefone que já está cadastrado.

### **[POST]/login**
* Realiza login de usuário cadastrado com os seguintes dados:
  * **email**
  * **password**

### **[GET]/users/:id**
* Retorna o usuário passado por 'id'.

### **[PATCH]/users/:id**
* Atualiza os dados do usuário passado por 'id'.
  
### **[DELETE]/users/**
 * Exclui o usuário que está autenticado.
 * É necessário passar o **password** do usuário para confirmar a exclusão.
 
### **[POST]/cars**
* Cria um novo carro para o usuário com os seguintes dados: 
  * **brand**,
  * **model**,
  * **year**
  * **fuelType**
  * **quilometers**
  * **color**
  * **fipePrice**
  * **price**
  * **description**
  * **published**
  * **userId**

### **[PATCH]/cars/:id/upload**
* Adiciona uma imagem de capa para o carro cadastrado.

### **[POST]/cars/:id/upload**
* Adiciona imagens de galeria para o carro cadastrado.

### **[GET]/cars**
* Retorna uma lista com todos os carros cadastrados.

### **[DELETE]/cars/:id/images/delete**
* Exclui as imagens do carro cadastrado.

### **[DELETE]/cars/:id**
* Exclui o carro passado por 'id'.