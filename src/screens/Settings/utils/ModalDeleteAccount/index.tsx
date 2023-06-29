import { Modal } from '../../../../components/Modal';
import { IModalDeleteAccount } from './types';
import * as Style from './styles';
import { Button } from '../../../../components/Buttons/Button';
import { theme } from '../../../../styles/theme';
import { useContext, useState } from 'react';
import { AuthContext } from '../../../../context/AuthContext';
import { Api } from '../../../../services/api';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

export const ModalDeleteAccount = ({ setModal }: IModalDeleteAccount) => {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  const [onQuery, setOnQuery] = useState<boolean>(false);

  async function deleteAccount() {
    setOnQuery(true);
    await Api.delete(`/login/${user?.id}`)
      .then(() => {
        setOnQuery(false);
        toast.success('Conta deletada com sucesso!');
        navigate('/login');
      })
      .catch(() => {
        setOnQuery(false);
        toast.error('Algo de errado aconteceu!');
      });
  }
  return (
    <Modal title="Deletar conta" setModal={() => setModal(false)}>
      <Style.Container>
        <p className="p1">Deseja excluir a sua conta?</p>
        <p className="p3">Essa ação não poderá ser desfeita posteriormente.</p>

        <Button
          loading={onQuery}
          center
          label="Excluir"
          bgColor={theme.color.danger}
          onClick={deleteAccount}
        />
      </Style.Container>
    </Modal>
  );
};
