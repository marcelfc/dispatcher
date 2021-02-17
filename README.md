# Dispatcher
## _Gerenciamento de execução de jobs_

Este projeto surgiu da necessidade de gerenciar diversas chamadas a scripts que pertenciam a diversos projetos e antes eram executados diretamente no CronTab do Sistema Operacional. Com este projeto, os processos passam a ser executados no Redis, trazendo mais segurança para a fila de processamento e controle sobre os processos que estão sendo executados.

## Tecnologias utilizadas

Dillinger uses a number of open source projects to work properly:

- [NodeJs] - Utilizado o ExpressJs como framework.
- [Knex e Postgres] - Bancos de Dados, query builder e geração de migrations.
- [Redis] - Para a criação de filas e execução de jobs.
- [Telegraf] - Para disparo de mensagens para um bot no telegram, caso ocorra erro na execução de alguym job
- [Bee-queue] - Para gerenciamento das filas e conexão com o redis
- [node-cron] - Scheduler dos jobs a serem executados
- [PM2] - Execução da aplicação em ambiente de produção

## Instalação

Instalação das dependências

```sh
npm i
knex migrate:latest
```

Para execução do projeto em desenvolvimento

```sh
cp .env-example .env (configure as variáveis de ambiente)
npm start
```

Para execução do projeto em produção

```sh
cp .env-example .env (configure as variáveis de ambiente)
npm run prod
```
## License

MIT


