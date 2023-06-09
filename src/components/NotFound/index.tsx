import { icons } from '../../assets/icons';
import * as Style from './styles';

interface INotFound {
  title?: string;
  subtitle?: string;
}

export const NotFound = ({
  title = 'Página não encontrada',
  subtitle = 'A página que você requisitou não existe ou ocorreu algum erro',
}: INotFound) => {
  return (
    <Style.ContainerNotFound>
      <img src={icons.notFoundImage} alt="" />
      <h2>{title}</h2>
      <h6>{subtitle}</h6>
    </Style.ContainerNotFound>
  );
};
