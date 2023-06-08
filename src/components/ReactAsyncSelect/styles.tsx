import { StylesConfig } from 'react-select';
import styled from 'styled-components';
import { theme } from '../../styles/theme';

export const selectStyles: StylesConfig = {
  control: (styles) => ({
    ...styles,
    backgroundColor: theme.color.dark25,
    height: '38px',
    padding: '0',
    minWidth: '200px',
    border: `none`,
    boxShadow: 'none',
    '&:hover': {
      borderColor: theme.color.gray3,
    },
    cursor: 'pointer',
  }),
  valueContainer: (styles) => ({
    ...styles,
    padding: '0 20px',
    color: theme.color.gray2,
    overflow: 'auto',
    flexWrap: 'nowrap',
  }),
  input: (styles) => ({
    ...styles,
    margin: '0px',
    fontSize: '14px',
    fontWeight: 400,
    padding: '0',
    color: theme.color.gray2,
  }),

  placeholder: (styles) => ({
    ...styles,
    fontSize: '14px',
    fontWeight: 400,
    margin: '0',
  }),
  singleValue: (styles) => ({
    ...styles,
    color: theme.color.gray2,
    fontSize: '14px',
    fontFamily: 'Inter',
    fontWeight: 400,
    marginInline: '0px',
  }),
  menuList: (styles) => ({
    ...styles,
    '::-webkit-scrollbar': {
      display: 'none',
    },
  }),
  menu: (styles) => ({ ...styles, background: theme.color.primary, margin: '0' }),
  option: (styles, state) => ({
    ...styles,
    background: state.isSelected ? theme.color.dark50 : theme.color.primary,
    opacity: state.isDisabled ? '0.5' : '1',
    color: theme.color.gray2,
    cursor: 'pointer',
    fontSize: '14px',
    fontWeight: 400,
    '&:hover': {
      background: theme.color.dark25,
    },
  }),
  indicatorSeparator: (styles) => ({ ...styles, display: 'none' }),
  dropdownIndicator: (styles, state) => ({
    ...styles,
    rotate: state.selectProps.menuIsOpen ? '180deg' : '0',
    transition: '0.2s',
  }),
  multiValue: (styles) => ({
    ...styles,
    background: theme.color.primary,
    color: theme.color.secondary,
  }),
};

export const ReactSelectContainer = styled.label`
  display: flex;
  flex-direction: column;
  gap: 6px;
`;

export const OptionContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
`;
