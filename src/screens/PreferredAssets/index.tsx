import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { icons } from '../../assets/icons';
import { IconButton } from '../../components/Buttons/IconButton';
import ReactAsyncSelect from '../../components/ReactAsyncSelect';
import { Table, TableContent } from '../../components/Table';
import { BrApi } from '../../services/brApi';
import { theme } from '../../styles/theme';
import * as Style from './styles';

export const PreferredAssets = () => {
  const navigate = useNavigate();
  const [favorite, setFavorite] = useState(true);
  const [showSearch, setShowSearch] = useState(false);
  const isFavoriteIcon = <img src={icons.heartFill}/>
  const isNotFavoriteIcon = <img src={icons.heart}/>

  async function requestStocks(search?: string) {
    let options: { value: string; label: string; icon: string }[] = [];
    await BrApi.get(`/quote/list?search=${search}&limit=10&token=hXAyiiQ3NhNz1Kp1ciC6pu`).then(
      ({ data }) => {
        data.stocks.forEach(({ stock, logo }: IStocks) => {
          options.push({ label: stock, value: stock, icon: logo });
        });
      },
    );
    return options;
  }
  return (
    <Style.Container>

        <IconButton
          label="Adicionar ativo favorito"
          icon={icons.plus}
          className="p3"
          color={theme.color.success}
          onClick={() => setShowSearch(!showSearch)}
        />


    {showSearch && <Style.SearchContainer>
          <ReactAsyncSelect
          loadOptions={requestStocks}
          style={Style.selectStyles}
          onChange={(evt) => navigate(`/dashboard/${evt.value}`)}
        />
        </Style.SearchContainer>
        }

    <Table
      colsHeader={[
        { label: 'Ativo' },
        { label: '' },
      ]}
    >
        <TableContent
          key={'pele'}
          colsBody={[
            {
              cell: (
                <Style.StockCell onClick={() => navigate(`/dashboard/pele`)}>
                  <img src={'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/Pele_con_brasil_%28cropped%29.jpg/250px-Pele_con_brasil_%28cropped%29.jpg'} alt="" />
                  <p className="p3">{'pele'}</p>
                </Style.StockCell>
              ),
              cssProps: {
                width: '150px',
              },
            },
            {
              cell: (
                <Style.FavoriteButtonContainer>
                  <Style.FavoriteButton onClick={() => setFavorite(!favorite)}>
                {favorite ? isFavoriteIcon : isNotFavoriteIcon}
                  </Style.FavoriteButton>
                </Style.FavoriteButtonContainer>
              ),
            },
          ]}
        />
    </Table>
    </Style.Container>

  );
};
