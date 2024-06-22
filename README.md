## Rodar esta aplicação

### Software necessário

Você deve ter o Docker instalado.

### Gerando as imagens

Crie a imagem do frontend do programa inserindo o código:
```
docker build -t "frontend:1.0" .
```

### Integração com Back

Realize a integração com o back-end para acessar as funcionalidades do programa: [Back-end](https://github.com/joaovictorramos/Monitoring_NestJs)

### Rodando

Execute o arquivo docker-compose:
```
docker-compose up
```

### Acessando a interface

Acesse a interface do programa:
```
http://localhost:82
```