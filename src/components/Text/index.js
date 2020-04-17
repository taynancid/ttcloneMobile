import {Text} from 'react-native';
import styled from 'styled-components/native';

export default styled(Text)`
  font-family: 'BalooBhaina2-Regular';
  font-size: ${props => props.fontSize || '20'}px;
  color: ${props => props.color || 'black'};
`;
