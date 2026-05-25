# .gamb_variaveis

Tokens de cor e estilos compartilhados do GAMB Design System, distribuiveis
como CSS por CDN. A paleta padrao e a paleta pessoal GAMB; variantes `hover`,
`active` e escalas sao calculadas a partir das cores base.

## Uso Via CDN

Para usar somente cores e evitar classes ou integracoes globais:

```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/gamberine/.gamb_variaveis@v1.0.1/dist/gamb-palette.min.css">
```

Para usar o design system completo, incluindo utilities, botoes e pontes
Tailwind/PrimeNG:

```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/gamberine/.gamb_variaveis@v1.0.1/dist/gamb-design-system.min.css">
```

Na versao `v1.0.1`, a paleta minificada tem cerca de 17 KB; a folha completa
tem cerca de 417 KB por preservar as utilities e componentes do arquivo
original. Prefira a paleta quando o projeto nao usar essas classes.

Projetos legados que ainda usam tokens camelCase carregam uma segunda linha,
de forma intencional:

```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/gamberine/.gamb_variaveis@v1.0.1/dist/compat/gamb-legacy.min.css">
```

Use sempre uma tag exata (`@v1.0.1`) em producao. Nao use `@main` ou uma URL
sem versao: uma alteracao futura poderia atingir um projeto sem revisao.

## Paleta Padrao

Os tokens publicos sao prefixados para evitar colisao com variaveis locais ou
de outros design systems:

| Uso | Token | Valor base |
| --- | --- | --- |
| Principal | `--gamb-primary` | `#ed3224` |
| Secundaria | `--gamb-secondary` | `#1b5866` |
| Destaque | `--gamb-accent` | `#ff4089` |
| Sucesso | `--gamb-success` | `#16a34a` |
| Aviso | `--gamb-warning` | `#f59e0b` |
| Erro/perigo | `--gamb-danger` | `#dc2626` |
| Fundo claro | `--gamb-background` | `#f2f4f7` |
| Fundo mais escuro | `--gamb-background-muted` | `#dfe2e7` |
| Texto | `--gamb-text` | `#191b1c` |
| Texto em fundo escuro | `--gamb-on-dark` | `#ffffff` |

O segundo valor `destaqueColor` recebido (`#dc2626`) foi mapeado para
`danger`, pois `destaque/accent` ja esta definido como `#ff4089`.

## Estados Dinamicos

Codigo novo usa `--gamb-primary-hover`, nunca `--primary-color-hover`.
O gerador em `src/_color-api.scss` deriva todos os estados sem repetir HEX:

```css
color: var(--gamb-primary-hover);
background: var(--gamb-secondary-active);
```

Com a paleta padrao, o calculo de `hover` resulta aproximadamente em
`#cc2b1f` para primary, proximo ao alvo `#cb2e23`, e `#15434e` para
secondary, proximo ao alvo `#15424d`. Para ajustar intensidade sem duplicar
cores, sobrescreva `--gamb-state-hover-weight` ou um peso especifico, como
`--gamb-secondary-hover-weight`.

## Paleta Por Projeto

Carregue o CDN primeiro e um arquivo do projeto depois. Defina somente bases;
variantes, gradientes e componentes passam a acompanhar a nova paleta.

```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/gamberine/.gamb_variaveis@v1.0.1/dist/gamb-design-system.min.css">
<link rel="stylesheet" href="/styles/paleta-projeto.css">
```

```css
:root {
  --gamb-primary: #0057b8;
  --gamb-secondary: #18324b;
  --gamb-accent: #f04e45;
  --gamb-success: #15803d;
  --gamb-warning: #ca8a04;
  --gamb-danger: #b91c1c;
  --gamb-background: #f8fafc;
  --gamb-background-muted: #e2e8f0;
  --gamb-text: #0f172a;
  --gamb-on-dark: #ffffff;
}
```

Uma paleta que deva ser compartilhada por varios projetos pode ser adicionada
a `src/themes/`, compilada e publicada em uma nova versao. Ela sera uma
segunda linha CDN carregada depois da folha principal.

## Conflitos E Seguranca

`dist/gamb-palette.min.css` e a opcao de menor superficie: so declara
`--gamb-*`. `dist/gamb-design-system.min.css` tambem exporta classes como
`.btn-*`, utilities e tokens de integracao `--p-*`/`--color-*`; use-o apenas
quando o projeto quiser que este sistema controle esses recursos.

CSS carregado por CDN nao consegue notificar automaticamente que outro CSS o
sobrescreveu. A protecao efetiva e o namespace, a ordem explicita das folhas e
a auditoria dos overrides:

```bash
npm run audit:theme -- caminho/para/paleta-projeto.css
```

## Desenvolvimento E Release

```bash
npm ci
npm run check
```

Fontes importantes:

- `.variables.gamb-design-system.scss`: folha completa.
- `src/_color-api.scss`: geracao unica das variantes.
- `src/palettes/_gamb-personal.scss`: valores base editaveis.
- `src/gamb-palette.scss`: entrada minima sem componentes.
- `src/themes/gamb-personal.scss`: modelo de tema publicado.
- `src/compat/gamb-legacy.scss`: aliases opcionais.

Fluxo de publicacao:

1. Edite fontes e atualize a versao/changelog conforme impacto.
2. Execute `npm run check` e versione os arquivos de `dist/`.
3. Integre em `main` somente apos o workflow `validate` passar.
4. Crie uma tag imutavel, por exemplo `v1.0.1`, e uma GitHub Release.
5. Atualize projetos consumidores somente depois de testar a nova URL fixada.

O jsDelivr serve arquivos publicos do GitHub e os mantem em cache; por isso
uma tag publicada nao deve ser movida ou reutilizada. Correcoes saem em uma
nova versao.

## Referencias

- [jsDelivr para GitHub](https://www.jsdelivr.com/github)
- [GitHub Rulesets](https://docs.github.com/en/repositories/configuring-branches-and-merges-in-your-repository/managing-rulesets/about-rulesets)
