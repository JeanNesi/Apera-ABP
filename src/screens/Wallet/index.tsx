import { useEffect, useState } from 'react';
import { Api } from '../../services/api';
import { toast } from 'react-toastify';
import { IReleasesList, ITab, IStockData, IStocksWalletList } from './types';
import { DotLoading } from '../../components/DotLoading';
import { IconButton } from '../../components/Buttons/IconButton';
import { icons } from '../../assets/icons';
import { theme } from '../../styles/theme';
import * as Style from './styles';

import { Releases } from './Releases';
import { ReleaseSummary } from './ReleaseSummary';
import { ModalAddNewStock } from './utils/ModalAddNewStock';
import { ModalEditRelease } from './utils/ModalEditRelease';
import { BrApi } from '../../services/brApi';
import { applyMask } from '../../utils/functions';

export const Wallet = () => {
  const [loading, setLoading] = useState(false);
  const [releasesList, setReleasesList] = useState<IReleasesList[]>([]);

  const [selectedRelease, setSelectedRelease] = useState<IReleasesList>();
  const [stocksWalletList, setStocksWalletList] = useState<IStocksWalletList[]>([]);

  const [selectedTab, setSelectedTab] = useState<ITab>({
    label: 'Saídas',
    value: 'wallet',
  });

  const tabOptions: ITab[] = [
    { label: 'Carteira', value: 'wallet' },
    { label: 'Lançamentos', value: 'releases' },
  ];

  const [modalAddNewStockIsOpen, setModalAddNewStockIsOpen] = useState(false);
  const [modalEditReleaseIsOpen, setModalEditReleaseIsOpen] = useState(false);

  //#region Releases API's

  async function requestReleasesList() {
    setLoading(true);

    await Api.get(`/release?walletId=1`)
      .then((res) => {
        setReleasesList(res.data);
        console.log(res.data);
      })
      .catch(() => toast.error('Algo deu errado'))
      .finally(() => setLoading(false));
  }

  async function requestDeleteRelease(releaseId: number) {
    setLoading(true);

    await Api.delete(`/release/${releaseId}`)
      .then(() => {
        toast.success('Lançamento deletado com sucesso!');
        requestReleasesList();
      })
      .catch(() => toast.error('Algo deu errado'));
  }

  //#endregion

  async function requestUpdatedStockValues(tickers: string) {
    await BrApi.get(`/quote/${tickers}?token=hXAyiiQ3NhNz1Kp1ciC6pu`)
      .then(({ data }: { data: IStockData }) => {
        data.results.forEach((element, i) => {
          setStocksWalletList((prevState) => {
            const newState = [...prevState];

            newState[i].stockLogoUrl = element.logourl;

            newState[i].balance = applyMask({
              mask: 'BRL',
              value: String(Number(element.regularMarketPrice) * 100 * newState[i].amount),
            }).value;

            newState[i].currentPrice = applyMask({
              mask: 'BRL',
              value: String(Number((element.regularMarketPrice * 100).toFixed(2))),
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
    // setLoading(true);

    await Api.get(`/release/wallet?walletId=${1}`)
      .then((res) => {
        setStocksWalletList(res.data);

        if (res.data.length) {
          const tickers = res.data.map((element: IStocksWalletList) => element.stock).toString();
          requestUpdatedStockValues(tickers);
        } else {
          setLoading(false);
        }
      })
      .catch(() => toast.error('Algo deu errado'));
  }

  useEffect(() => {
    requestWallet();
    requestReleasesList();
  }, []);

  return (
    <Style.Container>
      {modalAddNewStockIsOpen && (
        <ModalAddNewStock
          setModal={setModalAddNewStockIsOpen}
          callback={() => {
            requestReleasesList();
          }}
        />
      )}

      {modalEditReleaseIsOpen && selectedRelease && (
        <ModalEditRelease
          releaseDetails={selectedRelease}
          setModal={setModalEditReleaseIsOpen}
          callback={() => {
            requestReleasesList();
          }}
        />
      )}

      {loading && (
        <Style.LoadingContainer>
          <DotLoading />
        </Style.LoadingContainer>
      )}

      {!loading && true && (
        <IconButton
          label="Adicionar ativo"
          icon={icons.plus}
          onClick={() => setModalAddNewStockIsOpen(true)}
          className="p3"
          color={theme.color.success}
        />
      )}

      {!loading && true && (
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
              label="Adicionar ativo"
              icon={icons.plus}
              onClick={() => setModalAddNewStockIsOpen(true)}
              className="p3"
              color={theme.color.success}
            />
          </Style.ButtonsContainer>

          <Style.TabsContainer>
            <Style.TabsHeader>
              {tabOptions.map((category) => (
                <Style.Tab
                  activeTab={selectedTab.value}
                  tab={category}
                  onClick={() => {
                    setSelectedTab(category);
                  }}
                >
                  <h6>{category.label}</h6>
                </Style.Tab>
              ))}
            </Style.TabsHeader>
          </Style.TabsContainer>
        </>
      )}

      {selectedTab.value === 'wallet' && <ReleaseSummary stocksWalletList={stocksWalletList} />}

      {selectedTab.value === 'releases' && (
        <Releases
          releasesList={releasesList}
          onEditClick={(release) => {
            setModalEditReleaseIsOpen(true);
            setSelectedRelease(release);
          }}
          onTrashClick={(id) => requestDeleteRelease(id)}
        />
      )}

      {!loading && false && (
        <Style.NoResultsContainer>
          <img src={icons.finance} alt="" />
          <h5>Sua carteira está vazia!</h5>
          <p className="p2">Adicione um ativo para visualizar.</p>
        </Style.NoResultsContainer>
      )}
    </Style.Container>
  );
};
