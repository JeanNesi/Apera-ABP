import { ApexOptions } from 'apexcharts';
import ReactApexChart from 'react-apexcharts';
import { theme } from '../../styles/theme';
import { useEffect, useState } from 'react';
import { Slider } from '../../components/Slider';
import * as Style from './styles';
import { DotLoading } from '../../components/DotLoading';
import { useParams } from 'react-router-dom';
import { NotFound } from '../../components/NotFound';
import { toast } from 'react-toastify';
import { StockCard } from '../../components/StockCard';
import { formatCurrencyBRL, numericScaleIdentifier } from '../../utils/functions';
import { icons } from '../../assets/icons';
import { BrApi } from '../../services/brApi';

export const Dashboard = () => {
  const { stockName } = useParams<{ stockName: string }>();

  const [loading, setLoading] = useState(true);

  const [stockSeries, setStockSeries] = useState<number[][]>([]);
  const [stockData, setStockData] = useState<IStockData>();
  const [stocksList, setStocksList] = useState<IStocks[]>([]);
  const [lastUpdate, setLastUpdate] = useState('');

  async function requestStockData() {
    setLoading(true);
    setStockSeries([]);

    BrApi.get(
      `/quote/${stockName}?range=3mo&interval=1d&fundamental=true&token=${
        import.meta.env.BRAPI_DEV
      }`,
    )
      .then(({ data }) => {
        setStockData(data.results[0]);
        setLastUpdate(data.requestedAt);

        data.results[0].historicalDataPrice.forEach((element: IHistoricalDataPrice) => {
          setStockSeries((prevState) => {
            const newState = [...prevState];
            newState.push([element.date * 1000, element.close]);
            return newState;
          });
        });
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  }

  async function requestStocks() {
    await BrApi.get(`/quote/list?limit=20&token=hXAyiiQ3NhNz1Kp1ciC6pu`)
      .then(({ data }) => {
        setStocksList(data.stocks.reverse());
      })
      .catch(() => {
        toast.error('Ops! Estamos com problemas!');
      });
  }

  useEffect(() => {
    requestStocks();
    requestStockData();
  }, [stockName]);

  const series = [
    {
      name: 'Valor',
      data: stockSeries,
    },
  ];

  const options: ApexOptions = {
    chart: {
      id: 'area-datetime',
      type: 'area',

      height: 350,
      foreColor: theme.color.gray1,
      zoom: {
        autoScaleYaxis: true,
      },
      toolbar: {
        tools: {
          download: false,
        },
      },
    },
    colors: [theme.color.infos70],
    grid: {
      show: false,
    },
    dataLabels: {
      enabled: false,
    },
    markers: {
      size: 0,
    },

    yaxis: {
      labels: {
        formatter: function (value) {
          return `R$${value.toFixed(2)}`;
        },
      },
    },
    xaxis: {
      type: 'datetime',
    },
    tooltip: {
      theme: 'dark',

      x: {
        format: 'dd MMM yyyy',
      },

      y: {
        formatter: function (value) {
          return `R$${value.toFixed(2)}`;
        },
      },
    },
    fill: {
      type: 'solid',
      colors: [theme.color.infos50],
    },
  };

  return (
    <div>
      {loading && (
        <Style.LoadingContainer>
          <DotLoading />
        </Style.LoadingContainer>
      )}

      {!loading && stockData && (
        <>
          <Style.StockDetailsContainer>
            <Style.StockDetailsLeftSide>
              <img src={stockData?.logourl} alt="" />
              <div>
                <h4>{stockData?.symbol}</h4>
                <p className="p2">{stockData?.longName}</p>
              </div>
            </Style.StockDetailsLeftSide>

            <Style.StockDetailsRightSide>
              <p className="p3">Última atualização</p>
              <div>
                <p className="p2">{new Date(lastUpdate).toLocaleDateString('pt-br')}</p>
                <p className="p2">{new Date(lastUpdate).toLocaleTimeString('pt-br')}</p>
              </div>
            </Style.StockDetailsRightSide>
          </Style.StockDetailsContainer>

          <Style.StockValuesContainer>
            <Style.StockValuesContent>
              <p className="p2">Preço</p>
              <h3>{formatCurrencyBRL(stockData.regularMarketPrice)}</h3>
            </Style.StockValuesContent>

            <Style.StockValuesContent>
              <p className="p2">Variação (dia)</p>
              <div>
                <h3>
                  {formatCurrencyBRL(stockData.regularMarketChange)} (
                  {stockData.regularMarketChangePercent.toFixed(2)}%)
                </h3>
                {stockData.regularMarketChange < 0 ? (
                  <img src={icons.downValue} alt="" />
                ) : (
                  <img src={icons.upValue} alt="" />
                )}
              </div>
            </Style.StockValuesContent>

            <Style.StockValuesContent>
              <p className="p2">Min. 52 semanas</p>
              <h3>{formatCurrencyBRL(stockData.fiftyTwoWeekLow)}</h3>
            </Style.StockValuesContent>

            <Style.StockValuesContent>
              <p className="p2">Máx. 52 semanas</p>
              <h3>{formatCurrencyBRL(stockData.fiftyTwoWeekHigh)}</h3>
            </Style.StockValuesContent>

            <Style.StockValuesContent>
              <p className="p2">Capitalização de mercado</p>
              <h3>{numericScaleIdentifier(stockData.marketCap)}</h3>
            </Style.StockValuesContent>
          </Style.StockValuesContainer>

          <ReactApexChart options={options} series={series} type="area" height={350} />

          <Slider>
            {stocksList.map((element) => (
              <StockCard stockInfos={element} key={element.stock} />
            ))}
          </Slider>
        </>
      )}

      {!loading && !stockData && (
        <NotFound
          title="Ação não encontrada"
          subtitle="A ação que você requisitou não existe ou ocorreu algum erro"
        />
      )}
    </div>
  );
};
