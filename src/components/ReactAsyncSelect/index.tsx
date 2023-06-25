import React from 'react';
import { components, OptionProps, SingleValueProps, NoticeProps } from 'react-select';
import { OptionContainer, ReactSelectContainer, selectStyles } from './styles';
import AsyncSelect from 'react-select/async';
import { OptionsProps, Props } from './types';

const ReactAsyncSelect: React.FC<Props> = ({
  loadOptions,
  placeholder,
  label,
  noOptionsMessage,
  onChange,
  value,
  disabled,
  style,
}) => {
  const Option = (props: OptionProps<any>) => (
    <components.Option {...props}>
      <OptionContainer>
        {props.data.icon && <img src={props.data.icon} alt="logo" style={{ width: '16px' }} />}
        {props.data.label}
      </OptionContainer>
    </components.Option>
  );

  const SingleValue = (props: SingleValueProps<any>) => (
    <components.SingleValue {...props}>
      <OptionContainer>
        {props.data.icon && <img src={props.data.icon} alt="logo" style={{ width: '16px' }} />}
        {props.data.label}
      </OptionContainer>
    </components.SingleValue>
  );

  const NoOptionsMessage = (props: NoticeProps) => (
    <components.NoOptionsMessage {...props}>
      {noOptionsMessage ?? 'Sem resultados'}
    </components.NoOptionsMessage>
  );

  const LoadingMessage = (props: NoticeProps) => (
    <components.LoadingMessage {...props}>{'Buscando...'}</components.LoadingMessage>
  );

  return (
    <ReactSelectContainer>
      {label && <p className="p6">{label}</p>}

      <AsyncSelect
        loadOptions={loadOptions}
        defaultOptions
        cacheOptions
        value={value}
        styles={style ?? selectStyles}
        placeholder={placeholder ?? 'Buscar ação'}
        isDisabled={disabled}
        onChange={(evt) => {
          onChange(evt as OptionsProps);
        }}
        components={{
          Option,
          SingleValue,
          NoOptionsMessage,
          LoadingMessage,
        }}
      />
    </ReactSelectContainer>
  );
};

export default ReactAsyncSelect;
