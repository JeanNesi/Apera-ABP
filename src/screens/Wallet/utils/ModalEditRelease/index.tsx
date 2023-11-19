import { useState } from 'react';
import { Modal } from '../../../../components/Modal';
import * as Style from './styles';
import { theme } from '../../../../styles/theme';
import { Form, Formik } from 'formik';
import { FormikInput } from '../../../../components/Form/FormikInput';
import { Button } from '../../../../components/Buttons/Button';
import ReactAsyncSelect from '../../../../components/ReactAsyncSelect';
import { BrApi } from '../../../../services/brApi';
import { IFormData, IModalEditRelease } from './types';
import { applyMask, dateToISOString, unMask } from '../../../../utils/functions';

import * as yup from 'yup';
import { Api } from '../../../../services/api';
import { toast } from 'react-toastify';

export const ModalEditRelease = ({ setModal, callback, releaseDetails }: IModalEditRelease) => {
  const [onQuery, setOnQuery] = useState(false);
  const [stocksList, setStocksList] = useState<IStocks[]>([]);
  const [selectedTransactionType, setSelectedTransactionType] = useState<'COMPRA' | 'VENDA'>(
    'COMPRA',
  );

  const schema = yup.object({
    stock: yup.object({
      value: yup.string().required('Selecione uma ação.'),
    }),
    buyDate: yup.string().required('Data é obrigatória.'),
    amount: yup.string().required('Quantidade é obrigatória.'),
    value: yup.string().required('Valor é obrigatório.'),
    otherCosts: yup.string(),
  });

  async function addStock(data: IFormData) {
    const selectedStockInfos = stocksList.find((stock) => stock.stock === data.stock.value);
    await Api.put(`/release/${releaseDetails.id}`, {
      id: releaseDetails.id,
      amount: Number(unMask(data.amount)),
      asset: {
        companyImage: selectedStockInfos?.logo,
        corporateReason: selectedStockInfos?.name,
        name: selectedStockInfos?.stock,
      },
      extraCosts: Number(unMask(data.otherCosts)),
      price: Number(unMask(data.value)),
      releaseType: selectedTransactionType,
      wallet: {
        id: 1,
      },
    })
      .then(() => {
        setOnQuery(false);
        setModal(false);
        callback();
        toast.success('Ativo adicionado com sucesso!');
      })
      .catch((error) => {
        toast.error(error.response.data);
        setOnQuery(false);
      });
  }

  async function requestStocks(search?: string) {
    let options: { value: string; label: string; icon: string }[] = [];
    await BrApi.get(`/quote/list?token=hXAyiiQ3NhNz1Kp1ciC6pu&search=${search}&limit=10`).then(
      ({ data }) => {
        setStocksList(data.stocks);
        data.stocks.forEach(({ stock, logo }: IStocks) => {
          options.push({ label: stock, value: stock, icon: logo });
        });
      },
    );
    return options;
  }

  function calcTotalValue({
    amount,
    value,
    otherCosts,
  }: {
    amount: number;
    value: number;
    otherCosts: number;
  }) {
    return String(amount * value + otherCosts);
  }

  return (
    <Modal title="Adicionar Transação" setModal={() => setModal(false)}>
      <Style.TransactionTypesContainer>
        <Style.TransactionTypeButton
          $isSelected={selectedTransactionType === 'COMPRA'}
          $type="buy"
          onClick={() => setSelectedTransactionType('COMPRA')}
        >
          <p className="p3">Compra</p>
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M12.0001 21.0001C11.8012 21.0001 11.6104 20.9211 11.4697 20.7804C11.3291 20.6398 11.2501 20.449 11.2501 20.2501L11.2501 5.56041L5.7807 11.0307C5.71101 11.1004 5.62829 11.1557 5.53724 11.1934C5.4462 11.2311 5.34862 11.2505 5.25007 11.2505C5.15153 11.2505 5.05394 11.2311 4.9629 11.1934C4.87185 11.1557 4.78913 11.1004 4.71945 11.0307C4.64976 10.961 4.59449 10.8783 4.55678 10.7873C4.51906 10.6962 4.49965 10.5986 4.49965 10.5001C4.49965 10.4016 4.51906 10.304 4.55678 10.2129C4.59449 10.1219 4.64976 10.0392 4.71945 9.96948L11.4694 3.21948C11.5391 3.14974 11.6218 3.09443 11.7129 3.05668C11.8039 3.01894 11.9015 2.99951 12.0001 2.99951C12.0986 2.99951 12.1962 3.01894 12.2873 3.05668C12.3783 3.09443 12.461 3.14974 12.5307 3.21948L19.2807 9.96948C19.4214 10.1102 19.5005 10.3011 19.5005 10.5001C19.5005 10.6991 19.4214 10.89 19.2807 11.0307C19.14 11.1715 18.9491 11.2505 18.7501 11.2505C18.551 11.2505 18.3602 11.1715 18.2194 11.0307L12.7501 5.56041V20.2501C12.7501 20.449 12.6711 20.6398 12.5304 20.7804C12.3897 20.9211 12.199 21.0001 12.0001 21.0001Z"
              fill={theme.color.light25}
            />
          </svg>
        </Style.TransactionTypeButton>

        <Style.TransactionTypeButton
          $isSelected={selectedTransactionType === 'VENDA'}
          $type="sale"
          onClick={() => setSelectedTransactionType('VENDA')}
        >
          <p className="p3">Venda</p>
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g id="Icons">
              <path
                id="Vector"
                d="M11.9999 2.9999C12.1988 2.9999 12.3896 3.07892 12.5303 3.21957C12.6709 3.36022 12.7499 3.55099 12.7499 3.7499L12.7499 18.4396L18.2193 12.9693C18.289 12.8996 18.3717 12.8443 18.4628 12.8066C18.5538 12.7689 18.6514 12.7495 18.7499 12.7495C18.8485 12.7495 18.9461 12.7689 19.0371 12.8066C19.1281 12.8443 19.2109 12.8996 19.2806 12.9693C19.3502 13.039 19.4055 13.1217 19.4432 13.2127C19.4809 13.3038 19.5003 13.4014 19.5003 13.4999C19.5003 13.5984 19.4809 13.696 19.4432 13.7871C19.4055 13.8781 19.3502 13.9608 19.2806 14.0305L12.5306 20.7805C12.4609 20.8503 12.3782 20.9056 12.2871 20.9433C12.1961 20.9811 12.0985 21.0005 11.9999 21.0005C11.9014 21.0005 11.8038 20.9811 11.7127 20.9433C11.6217 20.9056 11.539 20.8503 11.4693 20.7805L4.7193 14.0305C4.57857 13.8898 4.49951 13.6989 4.49951 13.4999C4.49951 13.3009 4.57857 13.11 4.7193 12.9693C4.86003 12.8285 5.05091 12.7495 5.24993 12.7495C5.44895 12.7495 5.63982 12.8285 5.78055 12.9693L11.2499 18.4396V3.7499C11.2499 3.55099 11.3289 3.36022 11.4696 3.21957C11.6103 3.07892 11.801 2.9999 11.9999 2.9999Z"
                fill={theme.color.light25}
              />
            </g>
          </svg>
        </Style.TransactionTypeButton>
      </Style.TransactionTypesContainer>

      <Formik
        initialValues={{
          stock: {
            label: releaseDetails.asset.name ?? '',
            value: releaseDetails.asset.name ?? '',
            icon: releaseDetails.asset.companyImage ?? '',
          },
          amount: String(releaseDetails.amount),
          buyDate: dateToISOString(new Date()),
          otherCosts: releaseDetails.extraCosts
            ? applyMask({ mask: 'BRL', value: String(releaseDetails.extraCosts) }).value
            : '',
          value: releaseDetails.price
            ? applyMask({ mask: 'BRL', value: String(releaseDetails.price) }).value
            : '',
        }}
        validationSchema={schema}
        onSubmit={async (data: IFormData) => {
          setOnQuery(true);

          addStock(data);
        }}
      >
        {({ errors, values, touched, setFieldValue }) => (
          <Form>
            <ReactAsyncSelect
              label="Ativo"
              name="stock"
              loadOptions={requestStocks}
              value={values.stock}
              error={touched.stock?.value && errors.stock?.value ? errors.stock.value : null}
              onChange={(evt) => {
                const stockValue = (
                  (stocksList.find((stock) => stock.stock === evt.value)?.close ?? 0) * 100
                )?.toFixed(2);

                setFieldValue('value', applyMask({ mask: 'BRL', value: stockValue ?? '' }).value);
                setFieldValue('stock', evt);
              }}
            />

            <Style.InputsWrapper>
              <FormikInput
                name="buyDate"
                label={selectedTransactionType === 'COMPRA' ? 'Data da compra' : 'Data da venda'}
                type="date"
                placeholder="Ex: joao.silva@satc.com"
                value={values.buyDate}
                error={touched.buyDate && errors.buyDate ? errors.buyDate : null}
              />

              <FormikInput
                name="amount"
                label="Quantidade"
                value={values.amount}
                placeholder="Ex: 10"
                maxLength={5}
                error={touched.amount && errors.amount ? errors.amount : null}
                onChange={(evt) => {
                  setFieldValue(
                    'amount',
                    applyMask({ mask: 'NUM', value: evt.target.value }).value,
                  );
                }}
              />
            </Style.InputsWrapper>

            <Style.InputsWrapper>
              <FormikInput
                name="value"
                label="Preço R$"
                value={values.value}
                placeholder="R$ 20,00"
                error={touched.value && errors.value ? errors.value : null}
                maxLength={15}
                onChange={(evt) => {
                  setFieldValue('value', applyMask({ mask: 'BRL', value: evt.target.value }).value);
                }}
              />

              <FormikInput
                name="otherCosts"
                label="Outros custos"
                value={values.otherCosts}
                placeholder="R$ 2,00"
                error={touched.otherCosts && errors.otherCosts ? errors.otherCosts : null}
                maxLength={15}
                onChange={(evt) => {
                  setFieldValue(
                    'otherCosts',
                    applyMask({ mask: 'BRL', value: evt.target.value }).value,
                  );
                }}
              />
            </Style.InputsWrapper>

            <Style.TotalValueContainer>
              <p className="p5">
                Valor total:{' '}
                {
                  applyMask({
                    mask: 'BRL',
                    value: calcTotalValue({
                      amount: Number(values.amount),
                      otherCosts: Number(unMask(values.otherCosts)),
                      value: Number(unMask(values.value)),
                    }),
                  }).value
                }
              </p>
            </Style.TotalValueContainer>

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
