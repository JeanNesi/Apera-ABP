import { motion } from 'framer-motion';
import * as Style from './styles';
import { formatCurrencyBRL } from '../../utils/functions';
import { useNavigate } from 'react-router-dom';

export const StockCard = ({ stockInfos }: IStockCard) => {
  const navigate = useNavigate();
  return (
    <motion.div
      key={stockInfos.stock}
      onDoubleClick={() => navigate(`/dashboard/${stockInfos.stock}`)}
    >
      <Style.StockContainer>
        <Style.LeftSide>
          <h4>{stockInfos.stock}</h4>
          <p className="p3">{stockInfos.name}</p>
          <p className="p3">{formatCurrencyBRL(stockInfos.close)}</p>
        </Style.LeftSide>
        <Style.RightSide>
          <img src={stockInfos.logo} alt="" />
          <Style.VariationContainer $variation={stockInfos.change}>
            <p className="p3">{stockInfos.change.toFixed(2)}%</p>
          </Style.VariationContainer>
        </Style.RightSide>
      </Style.StockContainer>
    </motion.div>
  );
};
