
import styled from 'styled-components';

export const Container = styled.div`
  padding: 2rem;
  max-width: 600px;
  margin: 0 auto;
  font-family: sans-serif;
  line-height: 1.6;
`;

export const Heading = styled.h1`
  font-size: 2rem;
  margin-bottom: 1rem;
`;

export const Text = styled.p`
  font-size: 1rem;
  margin-bottom: 0.5rem;
`;

export const Email = styled.p`
  font-size: 1.2rem;
  font-weight: bold;

  a {
    color: inherit;
    text-decoration: none;

    &:hover {
      text-decoration: underline;
    }
  }
`;