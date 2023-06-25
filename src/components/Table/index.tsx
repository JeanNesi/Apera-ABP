/* eslint-disable react/no-array-index-key */

import * as Style from './styles';
import { theme } from '../../styles/theme';
import { ITableBody, ITableHeader } from './types';

export const Table = ({ colsHeader, children }: ITableHeader) => (
  <Style.Background>
    <Style.TableContainer>
      <Style.TableHead>
        <Style.TableRowHead>
          {colsHeader.map((col) => (
            <Style.TableColHeader
              key={col.label}
              $cssProps={col.cssProps}
              $cssOnMedia={col.cssOnMedia}
            >
              {col.label}
            </Style.TableColHeader>
          ))}
        </Style.TableRowHead>
      </Style.TableHead>
      <Style.TableBody>{children}</Style.TableBody>
    </Style.TableContainer>
  </Style.Background>
);

export const TableContent = ({ colsBody, onClick }: ITableBody) => (
  <Style.TableRow
    $bgColor={theme.color.dark25}
    onClick={() => {
      onClick();
    }}
  >
    {colsBody.map((col, i: number) => (
      <Style.TableColBody key={col.cell + i} cssOnMedia={col.cssOnMedia} cssProps={col.cssProps}>
        {col.cell}
      </Style.TableColBody>
    ))}
  </Style.TableRow>
);
