import { useNavigate } from 'react-router-dom';
import { icons } from '../../assets/icons';
import { Button } from '../Buttons/Button';
import * as Style from './styles';

interface INotFound {
  title?: string;
  subtitle?: string;
}

export const NotFound = ({
  title = 'Página não encontrada',
  subtitle = 'A página que você requisitou não existe ou ocorreu algum erro',
}: INotFound) => {
  const navigate = useNavigate();
  return (
    <Style.ContainerNotFound>
      <img src={icons.notFoundImage} alt="" />
      <h2>{title}</h2>
      <h6>{subtitle}</h6>

      <Button label="Voltar" onClick={() => navigate(-1)} />
    </Style.ContainerNotFound>
  );
};
