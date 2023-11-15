import { useEffect, useState } from 'react';
import { Slider } from '../../components/Slider';
import { StockCard } from '../../components/StockCard';
import { toast } from 'react-toastify';
import * as Style from './styles';
import { theme } from '../../styles/theme';
import { ApexOptions } from 'apexcharts';
import ReactApexChart from 'react-apexcharts';
import { DotLoading } from '../../components/DotLoading';
import { BrApi } from '../../services/brApi';
import { Navbar } from '../../components/Navbar';

export const Home = () => {
  const [loading, setLoading] = useState(true);
  const [stocksList, setStocksList] = useState<IStocks[]>([]);
  const [stockData, setStockData] = useState<IStockData>();
  const [stockSeries, setStockSeries] = useState<number[][]>([]);

  async function requestStockData() {
    setStockSeries([]);
    BrApi.get(`/quote/%5EBVSP?token=wmrAAgWifqbawiycgFp1fo&range=3mo&interval=1d&fundamental=true`)
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
    await BrApi.get(`/quote/list?limit=20&token=wmrAAgWifqbawiycgFp1fo`)
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
      <Navbar />

      <Style.BannerSection>
        <Style.BannerContainer id="home">
          <Style.BannerWrapper>
            <Style.BannerContent>
              <h1>Mantenha seus investimentos no rumo certo</h1>
              <h5>
                Descubra o poder do controle financeiro: Tome decisões informadas e conquiste seus
                sonhos.
              </h5>
            </Style.BannerContent>
          </Style.BannerWrapper>
        </Style.BannerContainer>
      </Style.BannerSection>

      {loading && (
        <Style.LoadingContainer>
          <DotLoading />
        </Style.LoadingContainer>
      )}

      {!loading && (
        <>
          <Style.Main>
            <Slider>
              {stocksList.map((element) => (
                <StockCard stockInfos={element} key={element.stock} />
              ))}
            </Slider>
            <Style.Container>
              <Style.ChartContainer>
                <Style.IbovespaInfosContainer>
                  <Style.InfoWrapper>
                    <h3>Ibovespa (IBOV)</h3>
                    <p className="p5">
                      IBOVESPA{' '}
                      <span>
                        Atualizado {new Date(stockData?.updatedAt ?? '').toLocaleString('pt-br')}
                      </span>
                    </p>
                  </Style.InfoWrapper>

                  <Style.IbovespaInfosContent>
                    <Style.InfoWrapper>
                      <h3>{stockData?.regularMarketPrice.toLocaleString('pt-br')}</h3>
                      <p className="p8">Pontos</p>
                    </Style.InfoWrapper>

                    <Style.InfoWrapper>
                      <Style.StockVariantionPercentage
                        $percentage={stockData?.regularMarketChangePercent ?? 0}
                      >
                        {(stockData?.regularMarketChangePercent ?? 0) > 0 && '+'}
                        {(stockData?.regularMarketChangePercent ?? 0) < 0 && '-'}
                        {stockData?.regularMarketChangePercent.toFixed(2)}
                      </Style.StockVariantionPercentage>
                      <p className="p8">Variação (Dia)</p>
                    </Style.InfoWrapper>

                    <Style.InfoWrapper>
                      <h6>{stockData?.regularMarketDayLow.toLocaleString('pt-br')}</h6>
                      <p className="p8">Min (Dia)</p>
                    </Style.InfoWrapper>

                    <Style.InfoWrapper>
                      <h6>{stockData?.regularMarketDayHigh.toLocaleString('pt-br')}</h6>
                      <p className="p8">Max (Dia)</p>
                    </Style.InfoWrapper>
                  </Style.IbovespaInfosContent>
                </Style.IbovespaInfosContainer>
                <ReactApexChart options={options} series={series} type="area" height={350} />
              </Style.ChartContainer>
              {/* <img src={icons.charts} alt="" /> */}
            </Style.Container>
          </Style.Main>
        </>
      )}
    </>
  );
};
