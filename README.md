## como rodar o conteiner

### buildar
* docker build --tag conversor:1.0 .

#### entrar no container
* docker run -it conversor:1.0 bash

### rodar o container
* docker run -p 3000:3500 conversor:1.0

rotas:
GET http://localhost:3000/api
POST http://localhost:3000/api/converter 
GET http://localhost:3000/api/version

obs.: reajustar os comandos caso mude a tag da imagem