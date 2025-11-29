import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 0 24px;
  margin: 16px auto;
  font-family: 'Roboto', sans-serif;
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 16px;
`;

const Icon = styled.img`
  width: 120px;
  height: 120px;
  border-radius: 20px;
  margin-right: 16px;
`;

const Info = styled.div`
  flex: 1;
`;

const Title = styled.h2`
  font-size: 20px;
  margin: 0;
  color: #202124;
`;

const Developer = styled.p`
  font-size: 14px;
  color: #666;
  margin: 4px 0;
`;

const Version = styled.p`
  font-size: 12px;
  color: #999;
  margin: 0;
`;

const ButtonView = styled.div`
  width: 100%;
  margin-top: 12px;
  display: flex;
  flex-direction: row-reverse;
`;

const Button = styled.button`
  background-color: #1a73e8;
  color: #fff;
  border: none;
  border-radius: 8px;
  padding: 8px 16px;
  font-size: 14px;
  cursor: pointer;
`;

const Carousel = styled.div`
  display: flex;
  overflow-x: auto;
  gap: 8px;
  padding: 0 24px 16px;
`;

const CarouselItem = styled.img`
  width: 200px;
  height: 360px;
  border-radius: 8px;
  flex-shrink: 0;
  object-fit: cover;
`;

const Body = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
  margin-top: 16px;
`;

const Section = styled.div`
  background-color: #f1f3f4;
  padding: 16px;
  border-radius: 8px;
  box-shadow: 0 1px 3px rgba(60, 64, 67, 0.15);
`;

const SectionTitle = styled.h3`
  font-size: 16px;
  margin: 0 0 8px;
  color: #202124;
`;

const Description = styled.p`
  font-size: 14px;
  color: #202124;
  line-height: 1.5;
  margin: 0;
`;

const UpdateList = styled.ul`
  padding-left: 20px;
  margin: 0;
  font-size: 14px;
  color: #202124;
  li {
    margin-bottom: 4px;
  }
`;

const Footer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 24px;
`;

const FooterText = styled.p`
  font-size: 12px;
  color: #999;
  margin: 0;
  text-align: center;
`;

export {
  Container,
  Header,
  Icon,
  Info,
  Title,
  Developer,
  Version,
  ButtonView,
  Button,
  Carousel,
  CarouselItem,
  Body,
  Section,
  SectionTitle,
  Description,
  UpdateList,
  Footer,
  FooterText
};
