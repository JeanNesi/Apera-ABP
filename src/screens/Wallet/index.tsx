import { Table, TableContent } from '../../components/Table';

export const Wallet = () => {
  return (
    <Table
      colsHeader={[
        { label: 'Ativo' },
        { label: 'Quantidade' },
        { label: 'Preço médio' },
        { label: 'Preço atual' },
        { label: 'Valorização' },
        { label: 'Saldo' },
      ]}
    >
      <TableContent
        onClick={() => ''}
        colsBody={[
          { cell: 'ABCB4' },
          { cell: '13' },
          { cell: 'R$ 16,96' },
          { cell: 'R$ 18,96' },
          { cell: '8,82%' },
          { cell: 'R$ 2.000,96' },
        ]}
      />
    </Table>
  );
};
