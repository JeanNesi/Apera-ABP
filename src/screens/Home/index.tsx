import { useEffect, useState } from 'react';
import { Slider } from '../../components/Slider';
import { StockCard } from '../../components/StockCard';
import { toast } from 'react-toastify';
import { icons } from '../../assets/icons';
import * as Style from './styles';
import { theme } from '../../styles/theme';
import { ApexOptions } from 'apexcharts';
import ReactApexChart from 'react-apexcharts';
import { DotLoading } from '../../components/DotLoading';
import { BrApi } from '../../services/brApi';

export const Home = () => {
  const [loading, setLoading] = useState(true);
  const [stocksList, setStocksList] = useState<IStocks[]>([]);
  const [stockData, setStockData] = useState<IStockData>();
  const [stockSeries, setStockSeries] = useState<number[][]>([]);

  async function requestStockData() {
    setStockSeries([]);
    BrApi.get(`/quote/%5EBVSP?range=5y&interval=1mo&fundamental=true`)
      .then(({ data }) => {
        setStockData(data.results[0]);

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
    await BrApi.get(`/quote/list?limit=20`)
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
  }, []);

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
        enabled: false,
      },
      toolbar: {
        show: false,
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
          return `${value.toLocaleString('pt-br')}`;
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
          return `${value.toLocaleString('pt-br')}`;
        },
      },
    },
    fill: {
      type: 'solid',
      colors: [theme.color.infos50],
    },
  };

  return (
    <>
      {loading && (
        <Style.LoadingContainer>
          <DotLoading />
        </Style.LoadingContainer>
      )}

      {!loading && (
        <>
          <Style.Container>
            <Style.ChartContainer>
              <Style.IbovespaInfosContainer>
                <h3>Ibovespa</h3>
                <h3>{stockData?.regularMarketPrice.toLocaleString('pt-br')}</h3>

                <p className="p2">+152,23 (0,13%)</p>
              </Style.IbovespaInfosContainer>
              <ReactApexChart options={options} series={series} type="area" height={350} />
            </Style.ChartContainer>
            <img src={icons.homeImage} alt="" />
          </Style.Container>
          <Slider>
            {stocksList.map((element) => (
              <StockCard stockInfos={element} key={element.stock} />
            ))}
          </Slider>
        </>
      )}
    </>
  );
};
