import { readFileSync } from 'node:fs';

const files = process.argv.slice(2);

if (files.length === 0) {
  console.error('Uso: npm run audit:theme -- caminho/tema.css [outro.css]');
  process.exit(1);
}

let count = 0;
for (const file of files) {
  const css = readFileSync(file, 'utf8');
  const declarations = [...css.matchAll(/(--gamb-[\w-]+)\s*:\s*([^;]+);/g)];

  if (declarations.length === 0) {
    console.log(`${file}: nenhum override --gamb-* encontrado.`);
    continue;
  }

  console.log(`${file}: ${declarations.length} override(s) GAMB declarado(s):`);
  for (const [, token, value] of declarations) {
    console.log(`  ${token}: ${value.trim()};`);
  }
  count += declarations.length;
}

if (count > 0) {
  console.log('Confirme que esta folha e carregada depois do CDN e registre a paleta no projeto consumidor.');
}
