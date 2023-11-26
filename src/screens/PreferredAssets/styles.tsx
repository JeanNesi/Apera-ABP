import { StylesConfig } from 'react-select';
import { styled } from 'styled-components';
import { theme } from '../../styles/theme';

export const Container = styled.div``;

export const SearchContainer = styled.div`
`;

export const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 80dvh;
`;


export const StockCell = styled.div`
  display: flex;
  align-items: center;
  gap: ${theme.size.xsm};

  img {
    width: 36px;
    border-radius: ${theme.size.xxsm};
  }
`;

export const FavoriteButtonContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: ${theme.size.sm};
  width: fit-content;

  width: 100%;
`;

export const FavoriteButton = styled.button`
background-color: transparent;
`;

export const NoResultsContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: ${theme.size.xsm};
  height: 70dvh;

  img {
    width: 50%;
  }

  h5 {
    margin-top: ${theme.size.md};
    max-width: 300px;
    text-align: center;
    color: ${theme.color.secondary};
  }
`;

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
    marginTop: 16,
    marginBottom: 8
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
  menu: (styles) => ({ ...styles, background: theme.color.primary, margin: '0', opacity: '1' }),
  option: (styles, state) => ({
    ...styles,
    background: state.isSelected ? theme.color.dark50 : theme.color.primary,
    opacity: state.isDisabled ? '0.8' : '1',
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
