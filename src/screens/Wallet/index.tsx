import { useContext, useEffect, useState } from 'react';
import { Table, TableContent } from '../../components/Table';
import { Api } from '../../services/api';
import { toast } from 'react-toastify';
import { applyMask } from '../../utils/functions';
import { BrApi } from '../../services/brApi';
import { IStockData, IStocksWalletList } from './types';
import { DotLoading } from '../../components/DotLoading';
import { AuthContext } from '../../context/AuthContext';
import { IconButton } from '../../components/Buttons/IconButton';
import { icons } from '../../assets/icons';
import { theme } from '../../styles/theme';
import * as Style from './styles';
import { ModalAddNewStock } from './utils/ModalAddNewStock';
import { useNavigate } from 'react-router-dom';

export const Wallet = () => {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const [loading, setLoading] = useState(true);
  const [stocksWalletList, setStocksWalletList] = useState<IStocksWalletList[]>([]);

  const [modalAddNewStockIsOpen, setModalAddNewStockIsOpen] = useState(false);

  async function requestUpdatedStockValues(tickers: string) {
    await BrApi.get(`/quote/${tickers}?token=hXAyiiQ3NhNz1Kp1ciC6pu`)
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

            console.log(
              newState[i].averagePrice / element.regularMarketPrice,
              newState[i].averagePrice,
              element.regularMarketPrice,
            );

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
    setLoading(true);

    await Api.get(`/wallet`)
      .then((res) => {
        const stocks = res.data.filter((element: any) => element.userId === user?.id);
        setStocksWalletList(stocks);

        if (stocks.length) {
          const tickers = stocks.map((element: IStocksWalletList) => element.stock).toString();
          requestUpdatedStockValues(tickers);
        } else {
          setLoading(false);
        }
      })
      .catch(() => toast.error('Algo deu errado'));
  }

  useEffect(() => {
    requestWallet();
  }, []);

  return (
    <Style.Container>
      {modalAddNewStockIsOpen && (
        <ModalAddNewStock
          setModal={setModalAddNewStockIsOpen}
          stocksWalletList={stocksWalletList}
          callback={() => {
            setStocksWalletList([]);
            requestWallet();
          }}
        />
      )}

      {loading && (
        <Style.LoadingContainer>
          <DotLoading />
        </Style.LoadingContainer>
      )}

      {!loading && !stocksWalletList.length && (
        <IconButton
          label="Adicionar ativo"
          icon={icons.plus}
          onClick={() => setModalAddNewStockIsOpen(true)}
          className="p3"
          color={theme.color.success}
        />
      )}

      {!loading && !!stocksWalletList.length && (
        <>
          <Style.WalletInfosContainer>
            <Style.WalletInfosWrapper>
              <img src={icons.piggyBank} alt="" />
              <h6>Valor aplicado</h6>
              <p className="p5">R$ 1.168,07</p>
            </Style.WalletInfosWrapper>

            <Style.WalletInfosWrapper>
              <img src={icons.circleDollar} alt="" />
              <h6>Saldo bruto</h6>
              <p className="p5">R$ 1.335,97</p>
            </Style.WalletInfosWrapper>

            <Style.WalletInfosWrapper>
              <img src={icons.percent} alt="" />
              <h6>Variação</h6>
              <Style.VariationValueContainer className="p5" $variation={14.37}>
                + 14,37%
              </Style.VariationValueContainer>
            </Style.WalletInfosWrapper>

            <Style.WalletInfosWrapper>
              <img src={icons.wallet} alt="" />
              <h6>Carteiras</h6>

              <p className="p5">Carteira 1</p>
            </Style.WalletInfosWrapper>
          </Style.WalletInfosContainer>

          <Style.ButtonsContainer>
            <IconButton
              label="Ver lançamentos"
              icon={icons.scroll}
              onClick={() => setModalAddNewStockIsOpen(true)}
              className="p3"
              size="8px"
              color={theme.color.white}
            />

            <IconButton
              label="Adicionar ativo"
              icon={icons.plus}
              onClick={() => setModalAddNewStockIsOpen(true)}
              className="p3"
              color={theme.color.success}
            />
          </Style.ButtonsContainer>

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
                  { cell: applyMask({ mask: 'BRL', value: String(stock.averagePrice) }).value },
                  { cell: stock.currentPrice },
                  {
                    cell:
                      stock.appreciation < 0 ? `${stock.appreciation}%` : `+${stock.appreciation}%`,
                  },
                  { cell: stock.balance },
                ]}
              />
            ))}
          </Table>
        </>
      )}

      {!loading && !stocksWalletList.length && (
        <Style.NoResultsContainer>
          <img src={icons.finance} alt="" />
          <h5>Sua carteira está vazia!</h5>
          <p className="p2">Adicione um ativo para visualizar.</p>
        </Style.NoResultsContainer>
      )}
    </Style.Container>
  );
};
