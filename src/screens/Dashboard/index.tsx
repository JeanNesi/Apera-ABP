import { ApexOptions } from 'apexcharts';
import ReactApexChart from 'react-apexcharts';
import { theme } from '../../styles/theme';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { Slider } from '../../components/Slider';
import * as Style from './styles';
import { DotLoading } from '../../components/DotLoading';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { NotFound } from '../../components/NotFound';

interface IHistoricalDataPrice {
  date: number;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
  adjustedClose: number;
}

interface IStockData {
  symbol: string;
  shortName: string;
  longName: string;
  currency: string;
  regularMarketPrice: number;
  regularMarketDayHigh: number;
  regularMarketDayLow: number;
  regularMarketDayRange: string;
  regularMarketChange: number;
  regularMarketChangePercent: number;
  regularMarketTime: string;
  marketCap: number;
  regularMarketVolume: number;
  regularMarketPreviousClose: number;
  regularMarketOpen: number;
  averageDailyVolume10Day: number;
  averageDailyVolume3Month: number;
  fiftyTwoWeekLowChange: number;
  fiftyTwoWeekLowChangePercent: number;
  fiftyTwoWeekRange: string;
  fiftyTwoWeekHighChange: number;
  fiftyTwoWeekHighChangePercent: number;
  fiftyTwoWeekLow: number;
  fiftyTwoWeekHigh: number;
  twoHundredDayAverage: number;
  twoHundredDayAverageChange: number;
  twoHundredDayAverageChangePercent: number;
  validRanges: '1d' | '5d' | '1mo' | '3mo' | '6mo' | '1y' | '2y' | '5y' | '10y' | 'ytd' | 'max'[];
  historicalDataPrice: IHistoricalDataPrice[];
  priceEarnings: number;
  earningsPerShare: number;
  logourl: string;
}

export const Dashboard = () => {
  const [loading, setLoading] = useState(true);
  const [stockSeries, setStockSeries] = useState<number[][]>([]);
  const [stockData, setStockData] = useState<IStockData>();
  const [lastUpdate, setLastUpdate] = useState('');
  const { stockName } = useParams<{ stockName: string }>();

  async function requestStockData() {
    setLoading(true);
    setStockSeries([]);
    axios
      .get(`https://brapi.dev/api/quote/${stockName}?range=5y&interval=1mo&fundamental=true`)
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
        toast.error('Ação não encontrada');
        setLoading(false);
      });
  }

  useEffect(() => {
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

          <ReactApexChart options={options} series={series} type="area" height={350} />
          <Slider>
            <Style.StockContainer />
            <Style.StockContainer />
            <Style.StockContainer />
            <Style.StockContainer />
            <Style.StockContainer />
            <Style.StockContainer />
          </Slider>
        </>
      )}

      {!loading && !stockData && <NotFound />}
    </div>
  );
};
