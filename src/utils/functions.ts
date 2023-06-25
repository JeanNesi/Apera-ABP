import { IMask } from './types';

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

export const applyMask = ({
  mask,
  value,
}: {
  mask: 'CPF' | 'CNPJ' | 'TEL' | 'CEP' | 'BRL' | 'NUM';
  value: string;
}) => {
  let Mask: IMask = { value: '', length: 0 };

  switch (mask) {
    case 'CPF':
      Mask = {
        value: value
          .replace(/\D/g, '')
          .replace(/^(\d{9})(\d)/g, '$1-$2')
          .replace(/^(\d{6})(\d)/g, '$1.$2')
          .replace(/^(\d{3})(\d)/g, '$1.$2'),
        length: 14,
      };
      break;
    case 'CNPJ':
      Mask = {
        value: value
          .replace(/\D/g, '')
          .replace(/^(\d{12})(\d)/g, '$1-$2')
          .replace(/^(\d{8})(\d)/g, '$1/$2')
          .replace(/^(\d{5})(\d)/g, '$1.$2')
          .replace(/^(\d{2})(\d)/g, '$1.$2'),
        length: 18,
      };
      break;
    case 'CEP':
      Mask = {
        value: value.replace(/\D/g, '').replace(/^(\d{5})(\d)/g, '$1-$2'),
        length: 9,
      };
      break;
    case 'TEL':
      Mask = {
        value: value
          .replace(/\D/g, '')
          .replace(/^(\d{2})(\d)/g, '($1) $2')
          .replace(/(\d)(\d{4})$/, '$1-$2'),
        length: 15,
      };
      break;
    case 'BRL':
      Mask = {
        value: (Number(value.replace(/[^0-9]*/g, '')) / 100).toLocaleString('pt-br', {
          style: 'currency',
          currency: 'BRL',
        }),
        length: 17,
      };
      break;

    case 'NUM':
      Mask = {
        value: value.replace(/[^0-9]*/g, ''),
        length: 0,
      };
      break;

    default:
      break;
  }
  return Mask;
};
