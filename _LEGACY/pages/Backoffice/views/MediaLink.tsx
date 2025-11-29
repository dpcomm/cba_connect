import React, { useState } from 'react';
import { Container } from './View.styled';
import BackTextInput from '@components/BackTextinput';

const MediaLink = () => {
  const [search, set_search] = useState("");

  return (
    <Container>
      <BackTextInput placeHolder={'Search...'} getter={search} setter={set_search} />
    </Container>
  );
};

export default MediaLink;