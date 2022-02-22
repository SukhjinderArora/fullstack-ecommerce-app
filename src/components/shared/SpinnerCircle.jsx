import styled from 'styled-components';

import { ReactComponent as TailSpinSVG } from '../../assets/images/svg/tail-spin.svg';

const SpinnerCircle = styled(TailSpinSVG)`
  width: ${(props) => props.width || '40px'};
  height: ${(props) => props.height || '40px'};
`;

export default SpinnerCircle;
