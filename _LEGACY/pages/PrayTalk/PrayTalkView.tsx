import React, { useState, useEffect, useRef } from 'react';
import { Container, MessageContainer, MyMessage, OtherMessage, InputContainer, Input, DateBar, MyTimestamp, OtherTimestamp, OtherMessageName, MessageBottom } from './PrayTalkView.styled';
import { IconButton } from '@components/IconButton';
import { EColor } from '@styles/color';
import { requestCreatePray, requestDeletePray, requestPray } from '@apis/index';
import { useRecoilValue } from 'recoil';
import { userState } from '@modules/atoms';
import useConfirm from '@hooks/useConfirm';
import SvgIcon from '@components/SvgIcon';

interface Message {
  text: string;
  isMine: boolean;
  id: number;
  time: string;
  date: string;
}

const formatTime = (date: Date) => {
  return date.toLocaleTimeString('ko-KR', { hour: '2-digit', minute: '2-digit' });
};

const formatDate = (date: Date) => {
  return date.toLocaleDateString('ko-KR', { year: 'numeric', month: 'long', day: 'numeric' });
};

const PrayTalkView = () => {
  const user = useRecoilValue(userState);
  const [messages, set_messages] = useState<Message[]>([]);
  const [input, set_input] = useState<string>('');
  const messageEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    requestPray().then((res) => {
      const initialMessages = Object.values(res.data.prays).map((value) => (
        user.id === value.userId ? {
          id: value.id,
          text: value.content,
          isMine: true,
          time: formatTime(new Date(value.createdAt)),
          date: formatDate(new Date(value.createdAt)),
        } : {
          id: value.id,
          text: value.content,
          isMine: false,
          time: formatTime(new Date(value.createdAt)),
          date: formatDate(new Date(value.createdAt)),
        }
      ));
      set_messages(initialMessages);
    });
  }, []);

  useEffect(() => {
    if (messageEndRef.current) {
      messageEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  const confirmSend = useConfirm("기도제목을 전송하시겠습니까?", () => handleSend(), () => console.log("Cancled.."));

  const handleSend = () => {
    requestCreatePray(user.id, input).then(() => {
      const now = new Date();
      const newMessage = {
        text: input,
        isMine: true,
        time: formatTime(now),
        date: formatDate(now),
      };
      set_messages([...messages, newMessage]);
      set_input('');
      alert("기도제목이 전송되었습니다.");
    }).catch((err) => {
      console.log(err.response.data.message);
      alert("기도제목 전송에 실패했습니다.");
    });
  };

  const handleDelete = (id: number) => {
    const isConfirm = confirm("기도제목을 삭제하시겠습니까?");
    if (isConfirm) {
      requestDeletePray(id).then(() => {
        const deletedMessageIndex = messages.findIndex((message) => message.id === id);
        const updatedMessages = [...messages];
        updatedMessages.splice(deletedMessageIndex, 1);
        set_messages(updatedMessages);
        set_input('');
        alert("기도제목이 삭제되었습니다.");
      }).catch((err) => {
        console.log(err);
        alert("기도제목 삭제에 실패했습니다.");
      });
    }
  };

  return (
    <Container>
      <MessageContainer>
        {messages.map((message, index) => {
          const showDateBar = index === 0 || message.date !== messages[index - 1].date;
          return (
            <React.Fragment key={index}>
              {showDateBar && <DateBar>{message.date}</DateBar>}
              {message.isMine ? (
                <>
                  <MyMessage>
                    {message.text}
                    <MessageBottom>
                      <MyTimestamp>{message.time}</MyTimestamp>
                      <div onClick={() => handleDelete(message.id)}><SvgIcon name='trash' width='14px' height='14px' fill={'none'} stroke={'white'} /></div>
                    </MessageBottom>
                  </MyMessage>
                </>

              ) : (
                <OtherMessage>
                  <OtherMessageName>익명 {message.id}</OtherMessageName>
                  {message.text}
                  <OtherTimestamp>{message.time}</OtherTimestamp>
                </OtherMessage>
              )}
            </React.Fragment>
          );
        })}
        <div ref={messageEndRef} />
      </MessageContainer>
      <InputContainer>
        <Input
          value={input}
          onChange={(e) => set_input(e.target.value)}
          placeholder="기도 제목을 입력하세요..."
          maxLength={156}
        />
        <IconButton
          label={'전송'}
          onClick={() => confirmSend()}
          color={EColor.TEXT_200}
          backgroundColor={EColor.COLOR_PRIMARY_SUB1}
          borderWidth='0'
          borderRadius='8px'
          width='86px'
        />
      </InputContainer>
    </Container>
  );
};

export default PrayTalkView;
