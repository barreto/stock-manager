<img src="https://raw.githubusercontent.com/lucaspolizeli/stock-manager/4d2ce4a963e81b1954da85f71021024ee4d4a88b/assets/boxes.svg" width="100px" align="right">
<img src="https://raw.githubusercontent.com/lucaspolizeli/stock-manager/4d2ce4a963e81b1954da85f71021024ee4d4a88b/assets/boxes.svg" width="100px" align="left">

<h2 align="center">
  Stock Manager
    <br>
  (back-end)
</h2>

<h6 align="center">
API feita em Java para o gerenciamento de estoques.
</h6>

---

<h4 align="center">
  <a href="#tecnologias">Tecnologias</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#como-executar">Como executar</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#documentação">Documentação</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#desenvolvimento">Desenvolvimento</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#plugins">Plugins</a>
</h4>

### Tecnologias

Tecnologias utilizadas no projeto:
<img src="https://raw.githubusercontent.com/lucaspolizeli/stock-manager/4d2ce4a963e81b1954da85f71021024ee4d4a88b/assets/box.svg" width="100px" align="right">

- [Java Persistence API (JPA)](https://pt.wikipedia.org/wiki/Java_Persistence_API)
- [Hibernate](https://hibernate.org/)
- [Lombok](https://projectlombok.org/)
- [Modelmapper](http://modelmapper.org/)
- [MySQL](https://www.mysql.com/)
- [Docker](https://www.docker.com/)
- [Swagger](https://swagger.io/)

São tecnologias de fácil acesso aos desenvolvedores que utilizamos para criar a nossa aplicação, sendo o repositório de versionamento o [Github](https://github.com/).

### Como executar

Stock Manager requer [Java](https://www.java.com/pt_BR/download/) na versão 11 para funcionar corretamente, assim com uma versão específica de MySQL e as denais tecnologias utilizadas.

Para simplificar o processo de execução usamos o Docker como forma facilitada de rodar a aplicação e embutir todas essas dependências.

Executando a aplicação:

```sh
docker-compose up --build
```

O processo pode demorar alguns minutos. Assim que o terminal indicar que o servidor está em execução basta acessar a [documentação](#documentação) para ver quais são os endpoints disponibilizados.

### Documentação

Assim que a aplicação estiver **em execução** você poderá acessar a nossa documentação interativa através do Swagger.

A documentação estará disponível por padrão na seguinte uri:

[http://localhost:8080/swagger-ui.html](http://localhost:8080/swagger-ui.html)

### Desenvolvimento

Usamos o [InteliJ](https://www.jetbrains.com/pt-br/idea/) no desenvolvimento, pois é a IDE que temos mais familiaridade, mas caso queira [contribuir](#como-contribuir) sinta-se livre para utilizar o que lhe for mais conveniente.

Caso o InteliJ não instale todos os pacotes de dependência assim que você abrir a aplicação ou estiver utilizando outra IDE use os comando abaixo.

```sh
$ mvn clean
$ mvn install
```

<p align="center">
<img src="https://raw.githubusercontent.com/lucaspolizeli/stock-manager/4d2ce4a963e81b1954da85f71021024ee4d4a88b/assets/pallet.svg" width="200px">
</p>

A instalação será útil apenas em tempo de desenvolvimento, pois como utilizamos o Docker caso queira executar o projeto basta rodar o comando de [execução](#como-executar) citado acima.

### Plugins

- [Spring Boot](https://spring.io/projects/spring-boot)

  - Definição da base do projeto.

- [Maven](https://maven.apache.org/)
  - Gerênciamento de dependências

<p align="center">
<img src="https://raw.githubusercontent.com/lucaspolizeli/stock-manager/4d2ce4a963e81b1954da85f71021024ee4d4a88b/assets/factory.svg" width="400px">
</p>

---

<h6 style="text-align:center;">

Icons made by <a href="http://www.freepik.com/" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/" title="Flaticon"> www.flaticon.com</a>

</h6>
