import React, { useEffect, useState } from 'react';
import { Container, ListItemDate, ListItemRight, ListItemSub, ListItemTitle, ListItemView } from './YoutubeOld.styled';
import { requestYoutube } from '@apis/index';
import { Youtube } from '@type/states';
import YouTube from "react-youtube";
import { useSetRecoilState } from 'recoil';
import { isLoadingState } from '@modules/atoms';

const YoutubeOldView = () => {
  const setIsLoading = useSetRecoilState(isLoadingState);
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
      {
        data.map((item, index) => (
          <ListItemView key={index}>
            <YouTube
              videoId={_parseYouTubeVideoId(item.link)}
              opts={{
                width: "100%",
                height: "108px",
                playerVars: {
                  autoplay: 0,
                  rel: 0,
                  modestbranding: 1,
                },
              }}
              onEnd={(e) => { e.target.stopVideo(0); }}
            />
            <ListItemRight>
              <ListItemTitle>{item.title}</ListItemTitle>
              <div>
                <ListItemSub>{item.retreatId === 1 ? "The Light" : "대학청년부 주일예배"}</ListItemSub>
                <ListItemDate>{_parseDate(item.createdAt)}</ListItemDate>
              </div>
            </ListItemRight>
          </ListItemView>
        ))
      }
    </Container>
  );
};

export default YoutubeOldView;