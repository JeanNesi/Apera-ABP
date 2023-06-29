import { StylesConfig } from 'react-select';

interface OptionsProps {
  value: string;
  label: string;
  icon?: string;
}

interface Props {
  loadOptions: () => Promise<OptionsProps[]>;

  label?: string;
  placeholder?: string;
  noOptionsMessage?: string;
  value?: OptionsProps | undefined;
  onChange: (evt: OptionsProps) => void;
  disabled?: boolean;
  style?: StylesConfig;
  error?: string | null;
  name?: string;
}
