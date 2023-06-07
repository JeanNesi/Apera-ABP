import { ApexOptions } from 'apexcharts';
import ReactApexChart from 'react-apexcharts';
import { theme } from '../../styles/theme';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { Slider } from '../../components/Slider';
import * as Style from './styles';

export const Dashboard = () => {
  const [teste, setTeste] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  async function getData() {
    axios
      .get(`https://brapi.dev/api/quote/PETR4?range=5y&interval=1mo&fundamental=true`)
      .then(({ data }) => {
        console.log(data.results[0].historicalDataPrice);
        data.results[0].historicalDataPrice.forEach((element: any) => {
          setTeste((prevState) => {
            const newState = [...prevState];
            newState.push([element.date * 1000, element.close]);
            return newState;
          });
        });
        setLoading(false);
      });
  }

  useEffect(() => {
    getData();
  }, []);

  const series = [
    {
      name: 'Valor',
      data: teste,
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
      {loading ? (
        'Carregando...'
      ) : (
        <>
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
    </div>
  );
};
