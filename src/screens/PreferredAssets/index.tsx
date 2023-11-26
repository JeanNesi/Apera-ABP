import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { icons } from '../../assets/icons';
import { IconButton } from '../../components/Buttons/IconButton';
import { DotLoading } from '../../components/DotLoading';
import ReactAsyncSelect from '../../components/ReactAsyncSelect';
import { Table, TableContent } from '../../components/Table';
import { Api } from '../../services/api';
import { BrApi } from '../../services/brApi';
import { theme } from '../../styles/theme';
import { catchHandler } from '../../utils/functions';
import * as Style from './styles';
import { IFavoriteAsset } from './types';

export const PreferredAssets = () => {
  const navigate = useNavigate();
  const [favorite, setFavorite] = useState(true);
  const [showSearch, setShowSearch] = useState(false);
  const [onquery, setOnQuery] = useState(false);
  const [favoriteAssets, setFavoriteAssets] = useState([]);
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

    console.log('options', options)
    return options;
  }

  async function requestFavoriteAssets() {
    setOnQuery(true);
    await Api.get('/favoriteAssets')
      .then(({ data }) => {
       setFavoriteAssets(data.content)
        setOnQuery(false);
      })
      .catch((error) => {
        catchHandler(error);
        setOnQuery(false);
      });
  }

  async function sendFavorite(formdata: IFavoriteAsset) {
    await Api.post('/favoriteAssets', {asset: formdata})
      .then(() => {
        requestFavoriteAssets();
        toast.success('Ativo favoritado com sucesso!');
      })
      .catch((error) => {
        catchHandler(error);
      });
  }

  useEffect(() => {
    requestFavoriteAssets()
  }, [])
  return (
    <Style.Container>
    {onquery && (
        <Style.LoadingContainer>
          <DotLoading />
        </Style.LoadingContainer>
      )}
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
          onChange={(evt) => sendFavorite({
            companyImage: evt.icon as string,
            corporateReason:  evt.value as string,
            name:  evt.value as string
          })}
        />
        </Style.SearchContainer>
        }

    {!onquery && !favoriteAssets.length && <Table
      colsHeader={[
        { label: 'Ativo' },
        { label: '' },
      ]}
    >
       {favoriteAssets.map((el: any) =>  <TableContent
          key={el.id}
          colsBody={[
            {
              cell: (
                <Style.StockCell onClick={() => navigate(`/dashboard/${el.name}`)}>
                  <img src={el.companyImage} alt="" />
                  <p className="p3">{el.name}</p>
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
        />)}
    </Table>}

    {!onquery && !favoriteAssets.length && (
        <Style.NoResultsContainer>
          <img src={icons.finance} alt="" />
          <h5>Sua lista de ativos favoritos está vazia!</h5>
          <p className="p2">Favorite um ativo para visualizar.</p>
        </Style.NoResultsContainer>
      )}
    </Style.Container>

  );
};
