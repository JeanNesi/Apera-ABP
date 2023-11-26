import { Modal } from '../../../../components/Modal';
import { IFormData, IModalCreateWallet } from './types';
import { Button } from '../../../../components/Buttons/Button';
import { theme } from '../../../../styles/theme';
import { useState } from 'react';
import { Api } from '../../../../services/api';
import { toast } from 'react-toastify';
import { Form, Formik } from 'formik';
import { FormikInput } from '../../../../components/Form/FormikInput';
import * as yup from 'yup';
import { catchHandler } from '../../../../utils/functions';

const schema = yup.object({
  name: yup.string().required('Nome é obrigatório.'),
});

export const ModalCreateWallet = ({ setModal, callback }: IModalCreateWallet) => {
  const [onQuery, setOnQuery] = useState<boolean>(false);

  async function requestCreateWallet(data: IFormData) {
    setOnQuery(true);

    await Api.post(`/wallet`, {
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

  return (
    <Modal title="Criar carteira" setModal={() => setModal(false)}>
      <Formik
        initialValues={{
          name: '',
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

            <Button
              center
              loading={onQuery}
              label="Salvar"
              type="submit"
              color={theme.color.primary}
              bgColor={theme.color.success}
            />
          </Form>
        )}
      </Formik>
    </Modal>
  );
};
