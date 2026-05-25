import { readFileSync } from 'node:fs';

const source = readFileSync('.variables.gamb-design-system.scss', 'utf8');
const palette = readFileSync('src/palettes/_gamb-personal.scss', 'utf8');
const core = readFileSync('dist/gamb-design-system.css', 'utf8');
const paletteCss = readFileSync('dist/gamb-palette.css', 'utf8');
const legacy = readFileSync('dist/compat/gamb-legacy.css', 'utf8');

const expectedPalette = {
  '--gamb-primary': '#ed3224',
  '--gamb-secondary': '#1b5866',
  '--gamb-accent': '#ff4089',
  '--gamb-success': '#16a34a',
  '--gamb-warning': '#f59e0b',
  '--gamb-danger': '#dc2626',
  '--gamb-background': '#f2f4f7',
  '--gamb-background-muted': '#dfe2e7',
  '--gamb-text': '#191b1c',
  '--gamb-on-dark': '#ffffff'
};

const failures = [];

for (const [token, value] of Object.entries(expectedPalette)) {
  const rule = `${token}: ${value};`;
  if (!palette.toLowerCase().includes(rule)) {
    failures.push(`Paleta sem o valor requerido: ${rule}`);
  }
  if (!core.toLowerCase().includes(rule)) {
    failures.push(`CSS compilado sem o valor requerido: ${rule}`);
  }
  if (!paletteCss.toLowerCase().includes(rule)) {
    failures.push(`Distribuicao minima sem o valor requerido: ${rule}`);
  }
}

for (const family of ['primary', 'secondary', 'accent', 'success', 'warning', 'danger']) {
  if (!core.includes(`--gamb-${family}-hover: color-mix(`)) {
    failures.push(`Estado hover nao foi gerado dinamicamente para ${family}.`);
  }
  if (!core.includes(`--gamb-${family}-active: color-mix(`)) {
    failures.push(`Estado active nao foi gerado dinamicamente para ${family}.`);
  }
  if (!paletteCss.includes(`--gamb-${family}-hover: color-mix(`)) {
    failures.push(`Paleta minima nao gerou hover para ${family}.`);
  }
}

const forbiddenCoreTokens = /--(?:primary|secondary|accent|success|warning|danger)-color(?:-hover|-active)?\s*:/;
if (forbiddenCoreTokens.test(core) || forbiddenCoreTokens.test(source)) {
  failures.push('O nucleo voltou a declarar tokens no formato *-color-hover.');
}
if (/--primaryColor\s*:/.test(core)) {
  failures.push('Aliases camelCase devem permanecer fora do CSS principal.');
}
if (/\.btn|--p-button|--color-primary/.test(paletteCss)) {
  failures.push('A distribuicao minima nao deve conter components ou bridges de framework.');
}
if (!/--primaryColor\s*:\s*var\(--gamb-primary\)/.test(legacy)) {
  failures.push('A folha opt-in de compatibilidade nao contem os aliases esperados.');
}

const selfReference = core.match(/(--gamb-[\w-]+)\s*:\s*var\(\1(?:[),])/);
if (selfReference) {
  failures.push(`Token com autorreferencia invalida: ${selfReference[1]}.`);
}

if (failures.length) {
  console.error(failures.join('\n'));
  process.exitCode = 1;
} else {
  console.log('Build validado: paleta, estados dinamicos e isolamento de compatibilidade estao consistentes.');
}
