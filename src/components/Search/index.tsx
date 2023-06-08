import axios from 'axios';
import ReactAsyncSelect from '../ReactAsyncSelect';
import * as Style from './styles';
import { IconButton } from '../Buttons/IconButton';
import { icons } from '../../assets/icons';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface ISearch {
  iconPosition?: 'left' | 'right';
}

interface IStocks {
  stock: string;
  name: string;
  close: number;
  change: number;
  volume: number;
  market_cap: number;
  logo: string;
  sector: string;
}

export const Search = ({ iconPosition = 'right' }: ISearch) => {
  const navigate = useNavigate();
  const [isOpenSearch, setIsOpenSearch] = useState(false);

  async function requestStocks(search?: string) {
    let options: { value: string; label: string; icon: string }[] = [];
    await axios
      .get(`https://brapi.dev/api/quote/list?search=${search}&limit=10`)
      .then(({ data }) => {
        data.stocks.forEach(({ stock, logo }: IStocks) => {
          options.push({ label: stock, value: stock, icon: logo });
        });
      });
    return options;
  }

  return (
    <Style.SearchContainer $iconPosition={iconPosition}>
      {isOpenSearch && (
        <ReactAsyncSelect
          loadOptions={requestStocks}
          onChange={(evt) => navigate(`/dashboard/${evt.value}`)}
        />
      )}

      <IconButton icon={icons.search} onClick={() => setIsOpenSearch(!isOpenSearch)} />
    </Style.SearchContainer>
  );
};
