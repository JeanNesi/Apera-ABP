import { useEffect, useState } from 'react';
import { Api } from '../../services/api';
import { toast } from 'react-toastify';
import { IReleasesList, ITab, IStockData, IStocksWalletList, IWalletList } from './types';
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
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { ModalCreateWallet } from './utils/ModalCreateWallet';
import { ModalEditWallet } from './utils/ModalEditWallet';

export const Wallet = () => {
  const navigate = useNavigate();
  const { walletId } = useParams<{ walletId: string }>();
  const location = useLocation();

  const [loading, setLoading] = useState(true);
  const [releasesList, setReleasesList] = useState<IReleasesList[]>([]);

  const [selectedRelease, setSelectedRelease] = useState<IReleasesList>();
  const [stocksWalletList, setStocksWalletList] = useState<IStocksWalletList[]>([]);

  const [valueApplied, setValueApplied] = useState(0);
  const [grossBalance, setGrossBalance] = useState(0);
  const [walletName, setWalletName] = useState('');

  const [selectedWalletId, setSelectedWalletId] = useState(walletId);

  const [walletsList, setWalletsList] = useState<IWalletList[]>([]);

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
  const [modalCreateWalletIsOpen, setModalCreateWalletIsOpen] = useState(false);
  const [modalEditWalletIsOpen, setModalEditWalletIsOpen] = useState(false);

  //#region Releases API's

  async function requestReleasesList() {
    setLoading(true);
    await Api.get(`/release?walletId=${walletId}`)
      .then((res) => {
        setReleasesList(res.data);
      })
      .catch(() => toast.error('Algo deu errado'));
    // .finally(() => setLoading(false));
  }

  async function requestDeleteRelease(releaseId: number) {
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
        setGrossBalance(0);
        setStocksWalletList((prevState) => {
          const updatedState = data.results.map((element, i) => {
            const regularMarketPrice = Number(element.regularMarketPrice) * 100;
            const stock = prevState[i];

            setGrossBalance((prevState) => prevState + regularMarketPrice * stock.amount);

            return {
              ...stock,
              stockLogoUrl: element.logourl ?? 'https://brapi.dev/favicon.svg',
              balance: applyMask({ mask: 'BRL', value: String(regularMarketPrice * stock.amount) })
                .value,
              currentPrice: applyMask({ mask: 'BRL', value: regularMarketPrice.toFixed(2) }).value,
              appreciation: Number(
                (100 - stock.averagePrice / element.regularMarketPrice).toFixed(2),
              ),
            };
          });

          return updatedState;
        });
      })
      .catch(() => setLoading(false))
      .finally(() => setLoading(false));
  }

  async function requestWallet() {
    await Api.get(`/release/wallet?walletId=${walletId}`)
      .then((res) => {
        setStocksWalletList(res.data.stocks);
        setValueApplied(res.data.valueApplied);
        setWalletName(res.data.name);

        if (res.data.stocks.length) {
          const tickers = res.data.stocks
            .map((element: IStocksWalletList) => element.stock)
            .toString();
          requestUpdatedStockValues(tickers);
        } else {
          setLoading(false);
        }
      })
      .catch(() => toast.error('Algo deu errado'));
  }

  async function requestWalletsList() {
    await Api.get(`/wallet/user/${localStorage.getItem('userId')}`)
      .then((res) => {
        setWalletsList(res.data);
      })
      .catch(() => toast.error('Algo deu errado'));
  }

  function calcVariantion() {
    if (!stocksWalletList.length) return 0;
    return 100 - 100 * (valueApplied / grossBalance);
  }

  useEffect(() => {
    requestWallet();
    requestWalletsList();
    requestReleasesList();

    return () => {
      localStorage.setItem('walletId', selectedWalletId ?? '');
    };
  }, [location.pathname]);

  return (
    <Style.Container>
      {modalAddNewStockIsOpen && (
        <ModalAddNewStock
          setModal={setModalAddNewStockIsOpen}
          callback={() => {
            requestReleasesList();
            requestWallet();
          }}
        />
      )}

      {modalEditReleaseIsOpen && selectedRelease && (
        <ModalEditRelease
          releaseDetails={selectedRelease}
          setModal={setModalEditReleaseIsOpen}
          callback={() => {
            requestReleasesList();
            requestWallet();
          }}
        />
      )}

      {modalCreateWalletIsOpen && (
        <ModalCreateWallet
          setModal={setModalCreateWalletIsOpen}
          callback={() => {
            requestWalletsList();
          }}
        />
      )}

      {modalEditWalletIsOpen && (
        <ModalEditWallet
          walletName={walletName}
          setModal={setModalEditWalletIsOpen}
          callback={() => {
            requestReleasesList();
            requestWallet();
            requestWalletsList();
          }}
        />
      )}

      {!loading && (
        <Style.WalletInfosContainer>
          <Style.WalletInfosWrapper>
            <img src={icons.piggyBank} alt="" />
            <h6>Valor aplicado</h6>
            <p className="p5">
              {
                applyMask({
                  mask: 'BRL',
                  value: String(!!stocksWalletList.length ? valueApplied : 0),
                }).value
              }
            </p>
          </Style.WalletInfosWrapper>

          <Style.WalletInfosWrapper>
            <img src={icons.circleDollar} alt="" />
            <h6>Saldo bruto</h6>
            <p className="p5">
              {
                applyMask({
                  mask: 'BRL',
                  value: String(!!stocksWalletList.length ? grossBalance : 0),
                }).value
              }
            </p>
          </Style.WalletInfosWrapper>

          <Style.WalletInfosWrapper>
            <img src={icons.percent} alt="" />
            <h6>Variação</h6>
            <Style.VariationValueContainer className="p5" $variation={calcVariantion()}>
              {calcVariantion() > 0 ? '+ ' : ''}
              {calcVariantion().toFixed(2)}%
            </Style.VariationValueContainer>
          </Style.WalletInfosWrapper>

          <Style.WalletInfosWrapper>
            <img src={icons.wallet} alt="" />
            <h6>Carteiras</h6>

            <select
              value={selectedWalletId}
              defaultValue={walletId}
              onChange={(evt) => {
                setSelectedWalletId(evt.target.value);
                navigate(`/wallet/${evt.target.value}`);
              }}
            >
              {walletsList.map((element) => (
                <option value={element.id}>{element.name}</option>
              ))}
            </select>

            <Style.WalletButtonsContainer>
              <IconButton icon={icons.pencil} onClick={() => setModalEditWalletIsOpen(true)} />
              <IconButton icon={icons.plus} onClick={() => setModalCreateWalletIsOpen(true)} />
            </Style.WalletButtonsContainer>
          </Style.WalletInfosWrapper>
        </Style.WalletInfosContainer>
      )}

      {!loading && !stocksWalletList.length && !releasesList.length && (
        <IconButton
          label="Adicionar lançamento"
          icon={icons.plus}
          onClick={() => setModalAddNewStockIsOpen(true)}
          className="p3"
          color={theme.color.success}
        />
      )}

      {!loading && (!!stocksWalletList.length || !!releasesList.length) && (
        <>
          <Style.ButtonsContainer>
            <IconButton
              label="Adicionar lançamento"
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
                  key={category.value}
                  $activeTab={selectedTab.value}
                  $tab={category}
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

      {loading && (
        <Style.LoadingContainer>
          <DotLoading />
        </Style.LoadingContainer>
      )}

      {selectedTab.value === 'wallet' && !loading && !!stocksWalletList.length && (
        <ReleaseSummary stocksWalletList={stocksWalletList} />
      )}

      {selectedTab.value === 'releases' && !loading && !!releasesList.length && (
        <Releases
          releasesList={releasesList}
          onEditClick={(release) => {
            setModalEditReleaseIsOpen(true);
            setSelectedRelease(release);
          }}
          onTrashClick={(id) => requestDeleteRelease(id)}
        />
      )}

      {!loading && !stocksWalletList.length && !releasesList.length && (
        <Style.NoResultsContainer>
          <img src={icons.finance} alt="" />
          <h5>Sua carteira está vazia!</h5>
          <p className="p2">Adicione um ativo para visualizar.</p>
        </Style.NoResultsContainer>
      )}
    </Style.Container>
  );
};
