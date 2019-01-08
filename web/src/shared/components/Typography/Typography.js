import styled from 'styled-components';
import Text from './../Text'

const Typography = styled.div;

Typography.displayName = 'Typography';


Typography.h1 = styled(Text)`
  font-weight: 300;
  font-size: 36px;
  line-height: 40px;
`;

Typography.h1.defaultProps = {
  as: "h1"
}

Typography.h2 = styled(Text)`
  font-weight: 300;
  font-size: 36px;
  line-height: 40px;
`;

Typography.h2.defaultProps = {
  as: "h2"
}

Typography.h3 = styled(Text)`
  font-weight: 300;
  font-size: 36px;
  line-height: 40px;
`;

Typography.h4 = styled(Text)`
  font-weight: 300;
  font-size: 36px;
  line-height: 40px;
`;

Typography.h5 = styled(Text)`
  font-weight: 300;
  font-size: 36px;
  line-height: 40px;
`;

Typography.p = styled(Text)`
  font-weight: 400;
  font-size: 16px;
  line-height: 24px;
`;

export default Typography