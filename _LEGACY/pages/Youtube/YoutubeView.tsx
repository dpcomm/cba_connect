import React, { useEffect, useState } from 'react';
import { Container, FooterView, ItemView, TextSub, TextTitle } from './Youtube.styled';
import { requestYoutube } from '@apis/index';
import { Youtube } from '@type/states';
import YouTube from "react-youtube";
import { IconButton } from '@components/IconButton';
import { EColor } from '@styles/color';
import usePageControll from '@hooks/usePageControll';
import { useSetRecoilState } from 'recoil';
import { isLoadingState } from '@modules/atoms';

const YoutubeView = () => {
  const setIsLoading = useSetRecoilState(isLoadingState);
  const { handlePage } = usePageControll();
  const [data, set_data] = useState<Youtube[]>([]);

  useEffect(() => {
    setIsLoading({ isLoading: true });
    requestYoutube().then((res) => {
      setIsLoading({ isLoading: false });
      set_data(res.data.youtube);
    }).catch(() => {
      alert("유튜브 링크를 불러오는데 실패하였습니다.");
      setIsLoading({ isLoading: false });
    });
  }, []);

  const _parseYouTubeVideoId = (url: string) => {
    try {
      const urlObj = new URL(url);
      return urlObj.searchParams.get('v');
    } catch (e) {
      return "";
    }
  };

  const _parseDate = (value: string) => {
    if (!value) return "0000-00-00";
    console.log(value);
    const date = new Date(value);
    return date.toISOString().split('T')[0];
  };

  return (
    <Container>
      <YouTube
        videoId={_parseYouTubeVideoId(data[0]?.link)}
        opts={{
          width: "324px",
          height: "224px",
          playerVars: {
            autoplay: 0,
            rel: 0,
            modestbranding: 1,
          },
        }}
        onEnd={(e)=>{e.target.stopVideo(0);}}
      />
      <TextTitle>{data[0]?.title}</TextTitle>
      <ItemView>
        <TextSub>주제</TextSub>
        <TextSub>{data[0]?.retreatId === 3  ? "Kingdom of GOD" : "대학청년부 주일예배"}</TextSub>
      </ItemView>
      <ItemView>
        <TextSub>게시 날짜</TextSub>
        <TextSub>{_parseDate(data[0]?.createdAt)}</TextSub>
      </ItemView>
      <FooterView>
        <IconButton
          label={'이전 라이브 보기'}
          onClick={() => handlePage('youtube-old')}
          width='156px'
          height='32px'
          color={EColor.TEXT_200}
          backgroundColor={EColor.COLOR_PRIMARY}
          borderRadius='8px'
        />
      </FooterView>
    </Container>
  );
};

export default YoutubeView;