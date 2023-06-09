export function formatCurrencyBRL(value: number) {
  return value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
}

export function numericScaleIdentifier(number: number) {
  if (number === undefined) return `R$ 0`;

  const parts = number.toLocaleString('pt-br').split('.');

  switch (parts.length) {
    case 1:
      return `R$ ${parts[0]}`;
    case 2:
      return `R$ ${parts[0]} mil`;
    case 3:
      return `R$ ${parts[0]} mi`;
    case 4:
      return `R$ ${parts[0]} bi`;
    case 5:
      return `R$ ${parts[0]} tri`;
    default:
      return '';
  }
}
