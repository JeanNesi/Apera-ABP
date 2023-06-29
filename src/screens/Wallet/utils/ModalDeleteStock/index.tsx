import { Modal } from '../../../../components/Modal';
import { IModalDeleteStock } from './types';
import * as Style from './styles';
import { Button } from '../../../../components/Buttons/Button';
import { theme } from '../../../../styles/theme';
import { useState } from 'react';
import { Api } from '../../../../services/api';
import { toast } from 'react-toastify';

export const ModalDeleteStock = ({ setModal, stockId, callback }: IModalDeleteStock) => {
  const [onQuery, setOnQuery] = useState<boolean>(false);

  async function deleteStock() {
    setOnQuery(true);

    await Api.delete(`/wallet/${stockId}`)
      .then(() => {
        setOnQuery(false);
        setModal(false);
        toast.success('Ativo deletado com sucesso!');
        callback();
      })
      .catch(() => {
        setOnQuery(false);
        toast.error('Algo deu errado');
      });
  }
  return (
    <Modal title="Deletar ativo" setModal={() => setModal(false)}>
      <Style.Container>
        <p className="p1">Deseja excluir este ativo?</p>
        <p className="p3">Essa ação não poderá ser desfeita posteriormente.</p>

        <Button
          loading={onQuery}
          center
          label="Excluir"
          bgColor={theme.color.danger}
          onClick={deleteStock}
        />
      </Style.Container>
    </Modal>
  );
};
