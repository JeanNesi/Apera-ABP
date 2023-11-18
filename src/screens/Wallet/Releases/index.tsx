import { IReleases } from './types';
import * as Style from './styles';
import { Table, TableContent } from '../../../components/Table';
import { useNavigate } from 'react-router-dom';

import { applyMask } from '../../../utils/functions';
import { IconButton } from '../../../components/Buttons/IconButton';
import { icons } from '../../../assets/icons';
import { IReleasesList } from '../types';

export const Releases = ({ releasesList, onEditClick, onTrashClick }: IReleases) => {
  const navigate = useNavigate();

  function calcTotalPrice(release: IReleasesList) {
    return applyMask({
      mask: 'BRL',
      value: String(release.amount * release.price + (release.extraCosts ?? 0)),
    }).value;
  }

  return (
    <Table
      colsHeader={[
        { label: 'Ativo' },
        { label: 'Quantidade' },
        { label: 'Preço' },
        { label: 'Outros Custos' },
        { label: 'Custo total' },
        { label: 'Operação' },
        { label: '' },
      ]}
    >
      {releasesList.map((release) => (
        <TableContent
          key={release.id}
          colsBody={[
            {
              cell: (
                <Style.StockCell onClick={() => navigate(`/dashboard/${release.asset.name}`)}>
                  <img src={release.asset.companyImage} alt="" />
                  <p className="p3">{release.asset.name}</p>
                </Style.StockCell>
              ),
              cssProps: {
                width: '150px',
              },
            },
            { cell: release.amount },
            { cell: applyMask({ mask: 'BRL', value: String(release.price) }).value },
            {
              cell: release.extraCosts
                ? applyMask({ mask: 'BRL', value: String(release.extraCosts) }).value
                : '-',
            },
            { cell: calcTotalPrice(release) },
            { cell: release.releaseType },
            {
              cell: (
                <Style.ButtonsContainer>
                  <IconButton
                    size="16px"
                    icon={icons.pencil}
                    onClick={() => onEditClick(release)}
                  />
                  <IconButton icon={icons.trash} onClick={() => onTrashClick(release.id)} />
                </Style.ButtonsContainer>
              ),
            },
          ]}
        />
      ))}
    </Table>
  );
};
