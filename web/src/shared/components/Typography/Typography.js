import styled from 'styled-components';
import { space, color, textAlign } from 'styled-system'

const Typography = styled.div`
  margin: 0;
  ${space}
  ${color}
  ${textAlign};
`

Typography.displayName = 'Typography';


Typography.h1 = styled(Typography)`
  font-weight: 200;
  font-size: 34px;
  line-height: 40px;
  margin: 0 0 32px 0;
`;

Typography.h1.defaultProps = {
  as: "h1"
}

Typography.h2 = styled(Typography)`
  font-weight: 600;
  font-size: 28px;
  line-height: 56px;
  text-transform: uppercase;
`;

Typography.h2.defaultProps = {
  as: "h2"
}

Typography.h3 = styled(Typography)`
  font-weight: 500;
  font-size: 18px;
  line-height: 24px;
  margin: 0 0 24px 0;
`;

Typography.h3.defaultProps = {
  as: "h3",
}

Typography.h4 = styled(Typography)`
  font-weight: 500;
  font-size: 14px;
  line-height: 40px;
  margin: 0;
`;

Typography.h4.defaultProps = {
  as: "h4"
}

Typography.h5 = styled(Typography)`
  display: block;
  font-weight: 300;
  font-size: 12px;
  line-height: 20px;
  margin: 0 0 16px 0;
  opacity: .87;

  a {
    color: inherit;
  }
`;

Typography.h5.defaultProps = {
  as: "h5"
}

Typography.p = styled(Typography)`
  font-weight: 300;
  font-size: 16px;
  line-height: 32px;
  margin: 0 0 32px 0;
`;

Typography.p.defaultProps = {
  as: "p"
}

Typography.small = styled(Typography)`
  display: inline-block;
  font-weight: 300;
  font-size: 12px;
  line-height: 16px;
  opacity: .87;
`;


Typography.small.defaultProps = {
  as: "small"
}

export default Typography;