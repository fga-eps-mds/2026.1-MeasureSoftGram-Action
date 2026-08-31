# MeasureSoftGram Action

[![Quality Gate Status](https://sonarcloud.io/api/project_badges/measure?project=fga-eps-mds_MeasureSoftGram-Action&metric=alert_status)](https://sonarcloud.io/summary/new_code?id=fga-eps-mds_MeasureSoftGram-Action) [![Coverage](https://sonarcloud.io/api/project_badges/measure?project=fga-eps-mds_MeasureSoftGram-Action&metric=coverage)](https://sonarcloud.io/summary/new_code?id=fga-eps-mds_MeasureSoftGram-Action) [![Maintainability Rating](https://sonarcloud.io/api/project_badges/measure?project=fga-eps-mds_MeasureSoftGram-Action&metric=sqale_rating)](https://sonarcloud.io/summary/new_code?id=fga-eps-mds_MeasureSoftGram-Action) [![Reliability Rating](https://sonarcloud.io/api/project_badges/measure?project=fga-eps-mds_MeasureSoftGram-Action&metric=reliability_rating)](https://sonarcloud.io/summary/new_code?id=fga-eps-mds_MeasureSoftGram-Action) [![Security Rating](https://sonarcloud.io/api/project_badges/measure?project=fga-eps-mds_MeasureSoftGram-Action&metric=security_rating)](https://sonarcloud.io/summary/new_code?id=fga-eps-mds_MeasureSoftGram-Action) [![Bugs](https://sonarcloud.io/api/project_badges/measure?project=fga-eps-mds_MeasureSoftGram-Action&metric=bugs)](https://sonarcloud.io/summary/new_code?id=fga-eps-mds_MeasureSoftGram-Action) [![Code Smells](https://sonarcloud.io/api/project_badges/measure?project=fga-eps-mds_MeasureSoftGram-Action&metric=code_smells)](https://sonarcloud.io/summary/new_code?id=fga-eps-mds_MeasureSoftGram-Action)

## Action do GitHub para Análise de Código com MeasureSoftGram

Use essa action do GitHub para realizar uma análise de código com o MeasureSoftGram. A ferramenta gera resultados de análise de código, que são enviador ao servidor web e mostrado em formas de graficos quando seus pull requests para a main (ou branch escolhida) sejam fechados.

<img src="./assets/images/MeasureSoftwareGram.png">

O MeasureSoftGram é uma ferramenta robusta para gestão e avaliação de qualidade de software. Ele suporta múltiplos atributos de qualidade e retorna métricas analisadas de software com base em modelos algébricos. O MeasureSoftGram é completamente gratuito para projetos open-source.

## Documentação

- [Documentação do componente](https://fga-eps-mds.github.io/MeasureSoftGram-Docs/docs/componente-action/)
  - Arquitetura e funcionamento do componente
  - Configuração e execução
  - Informações técnicas específicas
- [Documentação oficial do MeasureSoftGram](https://fga-eps-mds.github.io/MeasureSoftGram-Docs/)
  - Visão geral do produto
  - Arquitetura geral
  - Documentação dos componentes

## Pré-requisitos

* Ter uma conta no GitHub. [Crie uma gratuitamente agora](https://github.com/signup) caso ainda não possua!
* O repositório para análise está configurado no MeasureSoftGram.
* Ter uma release em andamento criada na interface web.
* Ter um token de acesso ao MeasureSoftGram (pode ser gerado na interface web).

## Uso
Para utilizar o MeasureSoftGram no seu repositório GitHub, crie um novo fluxo de trabalho do GitHub Actions (por exemplo, `msgram-analysis.yml`) no diretório `.github/workflows`. No novo arquivo, insira o seguinte código:

Caso você queira coletar as métricas do github passando a flag `collectGithubMetrics`, é importante que seu workflow seja disparado ao completar o worflow de build utilizado na sua Release. Só assim será possível que a métrica de tempo de feedback da build da Release seja corretamente persistida.

```yaml
name: MeasureSoftGram

on:
  workflow_run:
    workflows: ["nome_do_seu_workflow_de_build"]
    types:
      - completed

jobs:
  msgram_job:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v3

      - name: Action MeasureSoftGram
        id: msgram
        uses: fga-eps-mds/MeasureSoftGram-Action@v2.1.5
        with:
          githubToken: ${{ secrets.GITHUB_TOKEN }}
          sonarProjectKey: "nome-da-org_nome-do-repositorio"
          msgramServiceToken: ${{ secrets.MSGRAM_SERVICE_TOKEN }}
          productName: "nome-do-seu-produto"
          workflowName: "nome-do-seu-workflow-de-build"
          collectSonarqubeMetrics: true  # obrigatório
          collectGithubMetrics: true     # obrigatório
          usLabel: "US"
```

## Entradas

| entrada                   | obrigatório | descrição                                                                                                                                                                   |
|---------------------------|-------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `githubToken`             | sim         | Token do GitHub. Mais informações em [Token do GitHub](https://docs.github.com/en/actions/reference/authentication-in-a-workflow#about-the-github_token-secret)             |
| `sonarProjectKey`         | não         | Chave do projeto no SonarQube. A chave padrão é coletada a partir das informações coletadas do repositorio no github '<proprietário do repositorio>_<nome do repositório>'. |
| `msgramServiceToken`      | sim         | Token para acessar o serviço MeasureSoftGram                                                                                                                                |
| `productName`             | sim         | Nome do produto                                                                                                                                                             |
| `workflowName`            | não         | Nome do do worflow de build da release                                                                                                                                      |
| `collectSonarqubeMetrics` | sim         | Determina se serão coletadas métricas do Sonarqube                                                                                                                          |
| `collectGithubMetrics`    | sim         | Determina se serão coletadas métricas do Github                                                                                                                             |
| `usLabel`                 | não         | Label usada para se referir a Histórias de Usuário no seu projeto                                                                                                           |

Lembre-se que é necessário que você disponha do seu token do GitHub para executar o MeasureSoftGram. Recomendamos o uso dos [Segredos do GitHub](https://docs.github.com/pt/actions/security-guides/encrypted-secrets#creating-encrypted-secrets-for-a-repository) para armazenar estas credenciais de forma segura.


## Resultados da análise no pull request

Os resultados são adicionados ao website do MeasureSoftwareGram e exibidos nesse gráfico:

![Resultado Web](./assets/images/resultado_msgram.png)
## Desenvolvimento local

O gerenciador de pacotes padrão deste repositório é o **Yarn** (o `yarn.lock` é o
lockfile versionado). Use Yarn em todos os passos para evitar divergência de
dependências.

```bash
yarn install --frozen-lockfile
yarn lint            # ESLint + Prettier
yarn test            # roda a suíte uma vez, com cobertura
yarn build           # compila src/ para dist/ com o ncc
```

> **Importante:** a Action é executada a partir do código já compilado em
> `dist/index.js`, então o `dist/` **precisa ser versionado**. Sempre que alterar
> algo em `src/`, rode `yarn build` e faça commit do `dist/` atualizado junto com
> a mudança. O alvo `make update-dist` faz `yarn install` + `yarn build` de uma vez.

## Contribuição

Consulte o [Guia de Contribuição](./CONTRIBUTING.md) antes de realizar alterações no projeto.

## Código de Conduta

Este projeto segue o [Código de Conduta](./code_of_conduct.md).

## Licença

Este projeto é distribuído sob a licença [AGPL-3.0](./LICENSE).
