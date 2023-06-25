import { useEffect, useState } from 'react';
import { Table, TableContent } from '../../components/Table';
import { Api } from '../../services/api';
import { StockCell } from './styles';
import { toast } from 'react-toastify';
import { applyMask } from '../../utils/functions';
import { BrApi } from '../../services/brApi';
import { IStockData, IStocksWalletList } from './types';
import { DotLoading } from '../../components/DotLoading';

export const Wallet = () => {
  const [loading, setLoading] = useState(true);
  const [stocksWalletList, setStocksWalletList] = useState<IStocksWalletList[]>([]);

  async function requestUpdatedStockValues(tickers: string) {
    await BrApi.get(`/quote/${tickers}`)
      .then(({ data }: { data: IStockData }) => {
        data.results.forEach((element, i) => {
          setStocksWalletList((prevState) => {
            const newState = [...prevState];

            newState[i].currentPrice = applyMask({
              mask: 'BRL',
              value: String(element.regularMarketPrice * 100),
            }).value;

            newState[i].balance = applyMask({
              mask: 'BRL',
              value: String(element.regularMarketPrice * 100 * newState[i].amount),
            }).value;

            newState[i].appreciation = Number(
              (100 - newState[i].averagePrice / element.regularMarketPrice).toFixed(2),
            );

            return newState;
          });
        });
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }

  async function requestWallet() {
    await Api.get(`/wallet`)
      .then((res) => {
        setStocksWalletList(res.data);

        const tickers = res.data.map((element: IStocksWalletList) => element.stock).toString();
        requestUpdatedStockValues(tickers);
      })
      .catch(() => toast.error('Algo deu errado'));
  }

  useEffect(() => {
    requestWallet();
  }, []);

  return (
    <>
      {loading && <DotLoading />}

      {!loading && (
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
          {stocksWalletList.map((stock) => (
            <TableContent
              key={stock.id}
              onClick={() => ''}
              colsBody={[
                {
                  cell: (
                    <StockCell>
                      <img src={stock.stockLogoUrl} alt="" />
                      <p className="p3">{stock.stock}</p>
                    </StockCell>
                  ),
                },
                { cell: stock.amount },
                { cell: applyMask({ mask: 'BRL', value: String(stock.averagePrice) }).value },
                { cell: stock.currentPrice },
                { cell: `${stock.appreciation}%` },
                { cell: stock.balance },
              ]}
            />
          ))}
        </Table>
      )}
    </>
  );
};
