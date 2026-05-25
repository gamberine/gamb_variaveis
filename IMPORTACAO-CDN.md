# Importacao CDN - Guia Simples

## Escolha Rapida

Se voce quer importar apenas as cores para usar no seu proprio CSS, utilize
somente esta linha:

```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/gamberine/.gamb_variaveis@v1.0.1/dist/gamb-palette.min.css">
```

Essa e a opcao recomendada para projetos novos. Ela fornece a paleta e suas
variacoes dinamicas sem adicionar botoes ou classes prontas ao projeto.

Exemplo de uso:

```css
.meu-botao {
  background-color: var(--gamb-primary);
  color: var(--gamb-on-dark);
}

.meu-botao:hover {
  background-color: var(--gamb-primary-hover);
}
```

## O Que Cada CDN Significa

### 1. Somente Cores - Recomendado

Use uma linha:

```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/gamberine/.gamb_variaveis@v1.0.1/dist/gamb-palette.min.css">
```

Inclui:

- `--gamb-primary`, `--gamb-secondary`, `--gamb-accent`
- `--gamb-success`, `--gamb-warning`, `--gamb-danger`
- fundos e textos
- variantes dinamicas como `--gamb-primary-hover` e `--gamb-primary-active`

Nao inclui:

- classes `.btn-*`
- ajustes PrimeNG
- utilities Tailwind-like

Escolha esta opcao quando voce quer apenas cores padronizadas, sem risco de
alterar componentes ja existentes no projeto.

### 2. Design System Completo

Use uma linha:

```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/gamberine/.gamb_variaveis@v1.0.1/dist/gamb-design-system.min.css">
```

Inclui tudo da paleta e tambem:

- classes de botao, como `.btn-primary`
- utilities de cor e gradiente
- integracao com PrimeNG
- ponte para tokens Tailwind/CSS

Importante: se voce usar o arquivo completo, nao precisa importar tambem
`gamb-palette.min.css`, pois a paleta ja esta incluida nele.

Escolha esta opcao quando o projeto realmente deve usar os estilos e
componentes prontos deste design system.

### 3. Compatibilidade Legada

Compatibilidade significa manter funcionando um projeto antigo que ja utiliza
nomes anteriores, por exemplo:

```css
color: var(--primaryColor);
background: var(--secondaryColor);
```

O padrao novo usa:

```css
color: var(--gamb-primary);
background: var(--gamb-secondary);
```

O arquivo de compatibilidade apenas traduz os nomes antigos para os novos:

```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/gamberine/.gamb_variaveis@v1.0.1/dist/compat/gamb-legacy.min.css">
```

Ele nao deve ser usado sozinho. Use compatibilidade apenas se o seu projeto
ainda tiver variaveis antigas.

Projeto antigo que precisa somente das cores:

```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/gamberine/.gamb_variaveis@v1.0.1/dist/gamb-palette.min.css">
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/gamberine/.gamb_variaveis@v1.0.1/dist/compat/gamb-legacy.min.css">
```

Projeto antigo que precisa do design system completo:

```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/gamberine/.gamb_variaveis@v1.0.1/dist/gamb-design-system.min.css">
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/gamberine/.gamb_variaveis@v1.0.1/dist/compat/gamb-legacy.min.css">
```

Projetos novos nao devem importar compatibilidade.

## Posso Importar Apenas Um CDN?

Sim.

Para projeto novo que so precisa das cores, importe somente:

```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/gamberine/.gamb_variaveis@v1.0.1/dist/gamb-palette.min.css">
```

Para projeto novo que precisa de classes e componentes prontos, importe
somente:

```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/gamberine/.gamb_variaveis@v1.0.1/dist/gamb-design-system.min.css">
```

A segunda linha so existe quando voce precisa de compatibilidade com codigo
antigo ou quando publicar uma paleta alternativa para um projeto especifico.

## Usar Uma Paleta Diferente Em Um Projeto

Importe uma das opcoes principais e, depois, declare apenas as novas cores no
CSS do projeto:

```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/gamberine/.gamb_variaveis@v1.0.1/dist/gamb-palette.min.css">
<link rel="stylesheet" href="/styles/paleta-do-projeto.css">
```

```css
:root {
  --gamb-primary: #0057b8;
  --gamb-secondary: #18324b;
  --gamb-accent: #f04e45;
  --gamb-background: #f8fafc;
  --gamb-text: #0f172a;
}
```

Nao e necessario declarar `hover` ou `active`: as variacoes sao recalculadas
automaticamente a partir das cores base.

## Regra De Seguranca

Use sempre a versao na URL, atualmente `@v1.0.1`. Assim um projeto publicado
nao muda sozinho quando uma nova versao do design system for criada.
