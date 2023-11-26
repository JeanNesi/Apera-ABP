import { Modal } from '../../../../components/Modal';
import { IFormData, IModalEditWallet } from './types';
import { Button } from '../../../../components/Buttons/Button';
import { theme } from '../../../../styles/theme';
import { useState } from 'react';
import { Api } from '../../../../services/api';
import { toast } from 'react-toastify';
import { Form, Formik } from 'formik';
import { FormikInput } from '../../../../components/Form/FormikInput';
import * as yup from 'yup';
import * as Style from './styles';
import { catchHandler } from '../../../../utils/functions';
import { useParams } from 'react-router-dom';

const schema = yup.object({
  name: yup.string().required('Nome é obrigatório.'),
});

export const ModalEditWallet = ({ setModal, callback, walletName }: IModalEditWallet) => {
  const { walletId } = useParams<{ walletId: string }>();
  const [onQuery, setOnQuery] = useState<boolean>(false);

  async function requestCreateWallet(data: IFormData) {
    setOnQuery(true);

    await Api.post(`/wallet`, {
      id: walletId,
      name: data.name,
      user: {
        id: localStorage.getItem('userId'),
      },
    })
      .then(() => {
        setOnQuery(false);
        setModal(false);
        toast.success('Carteira criada com sucesso!');
        callback();
      })
      .catch((error) => {
        setOnQuery(false);
        catchHandler(error);
      });
  }

  async function requestDeleteWallet() {
    setOnQuery(true);

    await Api.delete(`/wallet/${walletId}?userId=${localStorage.getItem('userId')}`)
      .then(() => {
        setOnQuery(false);
        setModal(false);
        toast.success('Carteira deletada com sucesso!');
        callback();
      })
      .catch((error) => {
        setOnQuery(false);
        console.log(error);
        catchHandler(error);
      });
  }

  return (
    <Modal title="Editar carteira" setModal={() => setModal(false)}>
      <Formik
        initialValues={{
          name: walletName,
        }}
        validationSchema={schema}
        onSubmit={async (data: IFormData) => {
          requestCreateWallet(data);
        }}
      >
        {({ errors, values, touched }) => (
          <Form>
            <FormikInput
              name="name"
              label={'Nome'}
              placeholder="Ex: Cateira de dividendos"
              value={values.name}
              error={touched.name && errors.name ? errors.name : null}
            />

            <Style.ButtonsContainer>
              <Button
                borderless
                disable={onQuery}
                label="Excluir"
                type="button"
                color={theme.color.primary}
                bgColor={theme.color.success}
                onClick={() => requestDeleteWallet()}
              />

              <Button
                loading={onQuery}
                label="Salvar"
                type="submit"
                color={theme.color.primary}
                bgColor={theme.color.success}
              />
            </Style.ButtonsContainer>
          </Form>
        )}
      </Formik>
    </Modal>
  );
};
