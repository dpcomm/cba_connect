import { useEffect, useState } from 'react';
import {
  Container,
  ProgressBarBox,
  MainTitle,
  QuestioBox,
  Title,
  ButtonGroup,
  Button,
  Textarea,
  AnswerBox,
  TextForm,
  Bible,
  Ticket,
  TicketIssued,
  MealButton,
  MealButtonFalse,
  Callout,
  GradientText
} from './Winter26Application.styled';
import { ProgressBar } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Winter26ApplicationQuestion } from './Winter26ApplicationQuestion';
import usePageControll from '@hooks/usePageControll';
import { requestApplication, requestApplicationByUserAndRetreatId, requestCreatePray, requestUserBirth, requestUserGroup } from '@apis/index';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { isLoadingState, userState } from '@modules/atoms';
import SvgIcon from '@components/SvgIcon';

import { InputBox, SvgBox,GroupInputView } from './Winter26Application.styled';
import Dropdown  from '@components/Dropdown';
import { EColor } from '@styles/color';
import TextInputB from '@components/TextInputB';
import CustomMealRadioButton from '@components/CustomMealRadioButton';
import DateInput from '@components/DateInput';

const Winter26ApplicationView = () => {
  const { handlePage } = usePageControll();
  const [questionNum, setQuestionNum] = useState(0);
  const [inputValue, setInputValue] = useState('');
  const [answers, setAnswers] = useState<any[]>([]);
  // console.log(answers);
  
  const setIsLoading = useSetRecoilState(isLoadingState);
  const user = useRecoilValue(userState);
  
  const [EtcGroup,setEtcGroup] = useState("");
  const [CarNumber, setCarNumber] = useState("");
  const [meal, set_meal] = useState([[0,0,0], [0,0,0], [0,0,0]]);
  const [bus,set_bus] = useState([0,0]);
  const [childCount,set_childCount] = useState(0);
  const [birth,set_birth] = useState("");

  useEffect(() => {
    if (!user.group) return;
    setAnswers((prev) => {
      const next = [...prev];
      if (!next[2]) next[2] = user.group;
      return next;
    });
  }, [user.group]);

  useEffect(() => {
    requestApplicationByUserAndRetreatId(user.userId, 4)
      .then((res) => {
        const saved = res.data?.application;
        if (!saved) return;

        const savedMeal = saved.surveyData?.meal || [[0, 0, 0], [0, 0, 0], [0, 0, 0]];
        const savedTransfer = saved.surveyData?.transfer;
        const savedBus = savedTransfer?.bus || [0, 0];
        const savedCarId = savedTransfer?.['own-car'] || '';
        const savedChildCount = saved.surveyData?.childCount ?? 0;

        set_meal(savedMeal);
        set_bus(savedBus);
        setCarNumber(savedCarId);
        set_childCount(savedChildCount);
        set_birth(user.birth || '');
        setAnswers((prev) => {
          const next = [...prev];
          next[0] = '참가';
          next[2] = user.group || next[2];
          next[3] = savedTransfer?.transfer || next[3];
          next[4] = savedBus[1] === 1 ? '대형버스' : next[4];
          return next;
        });
      })
      .catch((err) => {
        const data = err.response?.data;
        if (data?.message === 'Application not exist') {
          return;
        } else {
          alert('서버 오류가 발생했습니다.');
          console.error(err);
        }
      });
  }, []);

  if (!Winter26ApplicationQuestion || Winter26ApplicationQuestion.length === 0) {
    return <div>Loading...</div>;
  }

  const currentQuestion = Winter26ApplicationQuestion[questionNum];
  const handleAnswerChange = (questionId: number, answer: any) => {
    const updatedAnswers = [...answers];
    updatedAnswers[questionId - 1] = answer;
    // console.log(`[DEBUG] handleAnswerChange 호출됨: id=${questionId}, answer=`, answer);

    // 특수 케이스 처리
    switch (questionId) {
      case 1:
        if (answer === '불참') {
          alert('다음에는 꼭 함께 해요!');
          handlePage('home');
          return;
        }
        break;
      
      case 4: // 집 -> 수련회장
        if (answer === '본대 대형버스') {
          set_bus([1, bus[1]]); // 출발: 본대, 귀가 정보 유지
        } else if (answer === '후발대 대형버스') {
          set_bus([2, bus[1]]); // 출발: 후발대, 귀가 정보 유지
        } else {
          set_bus([0, bus[1]]); // 자차 or 대중교통
        }
        break;
    
      case 5: // 수련회장 -> 집
        if (answer === '대형버스') {
          set_bus([bus[0], 1]); // 귀가: 버스, 출발 정보 유지
        } else {
          set_bus([bus[0], 0]); // 귀가: 자차 or 대중교통이면 전체 0으로
        }
        break;

      default:
        break;
    }
  
    setAnswers(updatedAnswers);
  
    if (questionNum < Winter26ApplicationQuestion.length - 1) {
      setQuestionNum(questionNum + 1);
    }
  
    setInputValue('');
  };
  

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
  
    // list 타입일 경우 group 값 체크
    if (currentQuestion.type === 'list') {

      const selected = answers[currentQuestion.id - 1];
      if (!selected || selected.trim() === '') {
        alert('옵션을 선택해주세요.');
        return;
      }

      if (selected === '자차') {
        if (!CarNumber || CarNumber.trim() === '') {
          alert('차 번호를 입력해주세요.');
          return;
        }
      }
      if (selected === '기타') {
        if (!EtcGroup || EtcGroup.trim() === '') {
          alert('기타 소속 정보를 입력해주세요.');
          return;
        }
      handleAnswerChange(currentQuestion.id, EtcGroup);
      return;
      } else {
      handleAnswerChange(currentQuestion.id, selected);
      }
      return;
    }
  
    // answer 타입일 경우 inputValue 값 체크
    if (currentQuestion.type === 'answer') {
      if (birth.trim() === '') {
        alert('내용을 입력해주세요~~');
        return;
      }
      handleAnswerChange(currentQuestion.id, birth);
      return;

      // if (inputValue.trim() === '') {
      //   alert('내용을 입력해주세요~~');
      //   return;
      // }
      // handleAnswerChange(currentQuestion.id, inputValue);
      // return;
    }

    if (currentQuestion.type === 'selector') {
      const isAllZero = meal.every((row) => row.every((val) => val === 0));
      if (isAllZero) {
        const confirmSkip = window.confirm("식사를 모두 하지 않으시는 게 맞나요?");
        if (!confirmSkip) return;
      } 
      handleAnswerChange(currentQuestion.id, meal);
      return;
    }
  
    // done 타입일 경우 제출 처리
    if (currentQuestion.type === 'done') {
      try {
        setIsLoading({ isLoading: true });
        // console.log(answers)
        await requestCreatePray(user.id, answers[4]);
        await requestApplication(user.userId,4,meal ,answers[3],bus,CarNumber,false,childCount);
        await requestUserGroup(user.userId,answers[2]);
        await requestUserBirth(user.userId,'1900-01-01');
        setIsLoading({ isLoading: false });
        alert('2026 겨울수련회 "바라봄"에서 만나요~');
        handlePage('home');
      } catch (err) {
        setIsLoading({ isLoading: false });
        // console.log(err);
        // console.log(err.response?.data?.message);
        alert('Pass 등록 중 오류가 발생했습니다.');
      }
    }
  };
  
  const handleMealChange = (newData: number[][]) => {
    const enforcedOff = newData.map((row, rowIdx) =>
      row.map((val, colIdx) => {
        const isLockedOff = (rowIdx === 0 && (colIdx === 0 || colIdx === 1)) || (rowIdx === 2 && colIdx === 2);
        return isLockedOff ? 0 : val;
      })
    );
    set_meal(enforcedOff);
  };

  return (
    <Container>
      <ProgressBarBox>
        <ProgressBar style={{ height: '10px', marginBottom: '20px', borderRadius: 0 }}>
          <ProgressBar
            striped
            now={(questionNum / (Winter26ApplicationQuestion.length - 1)) * 100}
            style={{
              height: '100%',
              // background: 'linear-gradient(to right, #ff7e5f, #feb47b)',
              background: 'linear-gradient(to right, #87d5f2, #1f9edd)',
            }}
          />
        </ProgressBar>
        <div className="progressNum">
          {currentQuestion.type !== 'done' ? `${currentQuestion.id} / ${Winter26ApplicationQuestion.length}` : '완료!'}
        </div>
      </ProgressBarBox>
      <QuestioBox>
        <Title isDone={currentQuestion.type === 'done'}>{currentQuestion.title}</Title>
        {currentQuestion.type === 'choice' && (
          <>
            {currentQuestion.bible && <Bible>{currentQuestion.bible}</Bible>}
            <ButtonGroup>
              <Button onClick={() => handleAnswerChange(currentQuestion.id, currentQuestion.answera || '')}>
                {currentQuestion.answera}
              </Button>
              <Button onClick={() => handleAnswerChange(currentQuestion.id, currentQuestion.answerb || '')}>
                {currentQuestion.answerb}
              </Button>
            </ButtonGroup>
          </>
        )}
        {currentQuestion.type === 'answer' && (
          <form onSubmit={handleSubmit}>
            <AnswerBox>
              {/* <Textarea
                placeholder={currentQuestion.desc}
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
              /> */}
              <DateInput getter={birth} setter={set_birth} />
              <Button onClick={handleSubmit} type="submit">
                {currentQuestion.nextBtn}
              </Button>
            </AnswerBox>
          </form>
        )}
        {currentQuestion.type === 'selector' && (
          <form onSubmit={handleSubmit}>
            <InputBox>
              <CustomMealRadioButton
                rowLabels={['1/30','1/31','2/1']}
                columnLabels={['아침','점심','저녁']}
                labelOn='식사 O'
                labelOff='식사 X'
                data={meal}
                disabled={[
                  [true,true,false],
                  [false,false,false],
                  [false,false,true],
                ]}
                onChange={handleMealChange}
              />
              <Button type="submit">
                  {currentQuestion.nextBtn}
              </Button>
              <Callout>
                해당하는 날짜에 <span style={{ fontWeight: 600}}>한 번이라도</span>식사를 하신다면 체크!!
              </Callout>
            </InputBox>
        </form>
        )}
        {currentQuestion.type === 'list' && (
          <form onSubmit={handleSubmit}>
            <InputBox>
              <SvgBox><SvgIcon name={'users'} width={30} height={30} fill={EColor.TEXT_200} stroke={EColor.COLOR_PRIMARY} /></SvgBox>

              <Dropdown 
              key={currentQuestion.id}
              options={currentQuestion.options || []} 
              placeholder={"선택해주세요."} 
              initialValue={answers[currentQuestion.id - 1] || ''} 
              onChange={(selected) => {
                const updated = [...answers];
                updated[currentQuestion.id - 1] = selected;
                setAnswers(updated);
              }}/>
              {answers[currentQuestion.id - 1] === "자차" &&
              <GroupInputView>
                <TextInputB placeHolder={'차량 번호 입력'} getter={CarNumber} setter={setCarNumber} type={'text'}/>
              </GroupInputView>}
              {answers[currentQuestion.id - 1] === "가족실" &&
              <GroupInputView>
                <InputBox>
                  함께 참여하는 자녀 수
                </InputBox>
                <Dropdown
                  options={['0명','1명','2명','3명','4명','5명']}
                  placeholder={'자녀 수 선택'}
                  initialValue={`${childCount}명`}
                  onChange={(selected) => set_childCount(parseInt(selected.replace('명',''),10))}
                />
              </GroupInputView>}
              {answers[currentQuestion.id - 1] === "기타" &&
              <GroupInputView>
                <TextInputB placeHolder={'기타 소속 정보 입력'} getter={EtcGroup} setter={setEtcGroup} type={'text'}/>
              </GroupInputView>}
              <Button onClick={handleSubmit} type="submit">
              {currentQuestion.nextBtn}
              </Button>
              {currentQuestion.id === 3 && (
              <Callout>
                {/* **가족실 안내사항** <br/>함께 참여하시는 자녀 인원 작성은 부부 중 <strong>1인만</strong> 작성해주세요! */}
                기타 항목은 <br/><strong>기관,지예배당 및 교단교회</strong>에 해당하시면 선택하여 작성 바랍니다.
              </Callout>
              )}
              {currentQuestion.id === 4 && (
              <Callout>
                **선발대 안내**
                <br/> <span style={{fontWeight:600}}>선발대 인원 중 차량을 갖고 가시는 분들은 자차 선택 후 번호 기입 부탁드리겠습니다.</span>
              </Callout>
              )}
            </InputBox>
          </form>
        )}
        {currentQuestion.type === 'done' && (
          <InputBox>
            <Callout>
                <GradientText>2026 겨울 수련회</GradientText><br/><GradientText>[바라봄]</GradientText><br/><br/>수련회 등록이 <br/><strong>완료</strong>되었습니다!
            </Callout>
            <Button onClick={handleSubmit} type="submit">
              {currentQuestion.nextBtn}
            </Button>
          </InputBox>
        )}
         {/* {currentQuestion.type === 'done' && (
          <TicketIssued>
            <Ticket>
              <SvgIcon name={'holydaypassTicket'} width={'100%'} height={'100%'} fill={'none'} stroke={'none'} />
              {<Ticket src="/holydaypass.png" alt="holydaypass" />}
            </Ticket>
            <Button onClick={handleSubmit} type="submit">
              {currentQuestion.nextBtn}
            </Button>
          </TicketIssued>
        )}  */}
      </QuestioBox>
    </Container>
  );
};

export default Winter26ApplicationView;
