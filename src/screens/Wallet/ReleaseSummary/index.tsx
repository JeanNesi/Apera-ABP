import * as Style from './styles';
import { Table, TableContent } from '../../../components/Table';
import { applyMask } from '../../../utils/functions';
import { useNavigate } from 'react-router-dom';
import { IReleaseSummary } from './types';

export const ReleaseSummary = ({ stocksWalletList }: IReleaseSummary) => {
  const navigate = useNavigate();

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
      {stocksWalletList.map((stock, i) => (
        <TableContent
          key={`${stock.id}-${i}`}
          colsBody={[
            {
              cell: (
                <Style.StockCell onClick={() => navigate(`/dashboard/${stock.stock}`)}>
                  <img src={stock.stockLogoUrl} alt="" />
                  <p className="p3">{stock.stock}</p>
                </Style.StockCell>
              ),
              cssProps: {
                width: '150px',
              },
            },
            { cell: stock.amount },
            {
              cell: applyMask({ mask: 'BRL', value: String(stock.averagePrice.toFixed(0)) }).value,
            },
            { cell: stock.currentPrice },
            {
              cell: stock.appreciation < 0 ? `${stock.appreciation}%` : `+${stock.appreciation}%`,
            },
            { cell: stock.balance },
          ]}
        />
      ))}
    </Table>
  );
};
