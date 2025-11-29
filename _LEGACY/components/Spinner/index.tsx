import React from 'react';
import { Container, Logo } from './Spinner.styled';
import SvgIcon from '@components/SvgIcon';

const Spinner = () => {
  return (
    <Container>
      <Logo>
        RE: CBA
      </Logo>
      <SvgIcon name={'spinner'} width={100} height={100} fill={"none"} />
    </Container>
  );
};

export default Spinner;