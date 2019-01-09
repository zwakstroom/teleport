import styled from 'styled-components';
import Text from './../Text'

const Typography = styled.div;

Typography.displayName = 'Typography';


Typography.h1 = styled(Text)`
  font-weight: 300;
  font-size: 36px;
  line-height: 40px;
  margin: 0 0 32px 0;
`;

Typography.h1.defaultProps = {
  as: "h1"
}

Typography.h2 = styled(Text)`
  font-weight: 600;
  font-size: 28px;
  line-height: 56px;
  text-transform: uppercase;
`;

Typography.h2.defaultProps = {
  as: "h2"
}

Typography.h3 = styled(Text)`
  font-weight: 500;
  font-size: 18px;
  line-height: 24px;
  margin: 0 0 24px 0;
`;

Typography.h3.defaultProps = {
  as: "h3",
  margin: "0 0 24px 0",
}

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
  font-weight: 300;
  font-size: 16px;
  line-height: 32px;
  margin: 0 0 32px 0;
`;

Typography.small = styled(Text)`
  display: inline-block;
  font-weight: 300;
  font-size: 12px;
  line-height: 16px;
  opacity: .87;
`;

Typography.aside = styled(Text)`
  display: block;
  font-weight: 300;
  font-size: 12px;
  line-height: 20px;
  margin: 0 0 16px 0;
  opacity: .56;
`;

Typography.small.defaultProps = {
  as: "small"
}

export default Typography