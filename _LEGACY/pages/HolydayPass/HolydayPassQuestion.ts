export interface Question {
  id: number;
  title: string;
  desc?: string;
  answera?: string;
  answerb?: string;
  bible?: string;
  options?: string[];
  nextBtn?: string;
  type: string;
}

export const HolidayPassQuestion: Question[] = [
  {
    id: 1,
    title: '2025 여름 수련회(7/11~7/13) "하나님 나라"에 참가하나요?',
    answera: '참가',
    answerb: '불참',
    type: 'choice',
  },
  {
    id: 2,
    title: '식사도 모두 함께 하나요?',
    nextBtn: '다음',
    options: ['7/11','7/12','7/13'],
    type: 'selector',
  },
  {
    id: 3,
    title: '소속을 선택해주세요.',
    nextBtn: '다음',
    desc: '가족실 자녀의 경우 대표자 1인만 작성해주시면 감사하겠습니다!',
    options: ["배윤희&김준영M", "노시은&윤승오M", "권수영&임강미M", "가족실", "예배당(기관)","기타"],
    type: 'list',
  },
  {
    id: 4,
    title: '수련회장으로 갈 이동수단을 선택해주세요. (집->수련회장)',
    nextBtn: '다음',
    options: ["본대 대형버스","후발대 대형버스", "자차","대중교통"],
    type: 'list',
  },
  {
    id: 5,
    title: '집으로 갈 이동수단을 선택해주세요. (수련회장->집)',
    nextBtn: '다음',
    options: ["대형버스", "자차","대중교통"],
    type: 'list',
  },
  {
    id: 6,
    title: '생년월일을 입력해주세요.',
    nextBtn: '다음',
    type: 'answer',
  },
  {
    id: 7,
    title: '',
    nextBtn: '설문지 등록',
    type: 'done',
  },
];


// export const HolidayPassQuestion: Question[] = [
//   {
//     id: 1,
//     title: '2025 홀리데이 참가하나요?',
//     answera: '참가',
//     answerb: '불참',
//     type: 'choice',
//   },
//   {
//     id: 2,
//     title: '어느 역할로 참가하시나요?',
//     answera: '리딩자',
//     answerb: '멤버',
//     type: 'choice',
//   },
//   {
//     id: 3,
//     title: '식사도 모두 함께 하나요?',
//     answera: '네',
//     answerb: '아니요',
//     type: 'choice',
//   },
//   {
//     id: 4,
//     title: '금요일 철야도 함께 해요!',
//     answera: '네',
//     answerb: '고민좀..',
//     type: 'choice',
//   },
//   {
//     id: 5,
//     title: '멤버를 선택하셨나요? \n 리딩자로 섬길 기회를 한번 더 드려요~',
//     desc: '있다면 살포시 알려주세요.',
//     bible:
//       '그러므로 너희는 가서 모든 족속으로 제자를 삼아 \n 아버지와 아들과 성령의 이름으로 세례를 주고 내가 너희에게 분부한 모든 것을 가르쳐 지키게 하라 \n (마태복음 28:19-20)',
//     answera: '리딩자 도전!',
//     answerb: '멤버 할게요!',
//     type: 'choice',
//   },
//   {
//     id: 6,
//     title: '2025 홀리데이에 가져갈 기도제목이 있다면 알려주세요.',
//     desc: '작성된 기도제목은 기도 TALK에 익명으로 게시됩니다.',
//     nextBtn: '완료',
//     type: 'answer',
//   },
//   {
//     id: 7,
//     title: '2025 홀리데이 패스권이 발급되었습니다!',
//     nextBtn: '패스 등록하기',
//     type: 'done',
//   },
// ];