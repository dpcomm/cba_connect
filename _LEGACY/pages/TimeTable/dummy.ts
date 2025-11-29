/* 2025년 겨울수련회 */
export const schedule = {
  day1: [ // 7/11 (금)
    { startTime: new Date('2025-07-11T11:30:00').getTime(), endTime: new Date('2025-07-11T12:30:00').getTime(), activity: '점심식사' },
    { startTime: new Date('2025-07-11T13:00:00').getTime(), endTime: new Date('2025-07-11T14:00:00').getTime(), activity: '등록/OT' },
    { startTime: new Date('2025-07-11T14:00:00').getTime(), endTime: new Date('2025-07-11T15:30:00').getTime(), activity: '개회예배 (찬양/설교: 한세리 M)' },
    { startTime: new Date('2025-07-11T15:30:00').getTime(), endTime: new Date('2025-07-11T17:30:00').getTime(), activity: '특강 1 (김민정 교수)' },
    { startTime: new Date('2025-07-11T17:30:00').getTime(), endTime: new Date('2025-07-11T19:30:00').getTime(), activity: '저녁식사' },
    { startTime: new Date('2025-07-11T19:30:00').getTime(), endTime: new Date('2025-07-11T22:00:00').getTime(), activity: '저녁예배 (김근주 교수)' },
    { startTime: new Date('2025-07-11T22:00:00').getTime(), endTime: new Date('2025-07-12T00:00:00').getTime(), activity: '기도회(1) - 임강미 M' },
    { startTime: new Date('2025-07-12T00:00:00').getTime(), endTime: new Date('2025-07-12T07:30:00').getTime(), activity: '취침' },
  ],
  day2: [ // 7/12 (토)
    { startTime: new Date('2025-07-12T07:30:00').getTime(), endTime: new Date('2025-07-12T08:30:00').getTime(), activity: '아침식사' },
    { startTime: new Date('2025-07-12T08:30:00').getTime(), endTime: new Date('2025-07-12T09:30:00').getTime(), activity: '소그룹 QT' },
    { startTime: new Date('2025-07-12T09:30:00').getTime(), endTime: new Date('2025-07-12T11:30:00').getTime(), activity: '특강 2 (김학철 교수)' },
    { startTime: new Date('2025-07-12T11:30:00').getTime(), endTime: new Date('2025-07-12T13:00:00').getTime(), activity: '점심식사' },
    { startTime: new Date('2025-07-12T13:00:00').getTime(), endTime: new Date('2025-07-12T13:30:00').getTime(), activity: '침례' },
    { startTime: new Date('2025-07-12T13:30:00').getTime(), endTime: new Date('2025-07-12T15:30:00').getTime(), activity: '자유시간' },
    { startTime: new Date('2025-07-12T15:30:00').getTime(), endTime: new Date('2025-07-12T17:00:00').getTime(), activity: '중그룹 GBS' },
    { startTime: new Date('2025-07-12T17:00:00').getTime(), endTime: new Date('2025-07-12T17:30:00').getTime(), activity: '단체사진' },
    { startTime: new Date('2025-07-12T17:30:00').getTime(), endTime: new Date('2025-07-12T19:30:00').getTime(), activity: '저녁식사' },
    { startTime: new Date('2025-07-12T19:30:00').getTime(), endTime: new Date('2025-07-12T22:00:00').getTime(), activity: '저녁예배 (권연경 교수)' },
    { startTime: new Date('2025-07-12T22:00:00').getTime(), endTime: new Date('2025-07-13T00:00:00').getTime(), activity: '기도회(2) - 권수영 M' },
    { startTime: new Date('2025-07-13T00:00:00').getTime(), endTime: new Date('2025-07-13T07:30:00').getTime(), activity: '취침' },
  ],
  day3: [ // 7/13 (일)
    { startTime: new Date('2025-07-13T07:30:00').getTime(), endTime: new Date('2025-07-13T08:30:00').getTime(), activity: '아침식사' },
    { startTime: new Date('2025-07-13T08:30:00').getTime(), endTime: new Date('2025-07-13T09:30:00').getTime(), activity: '짐정리' },
    { startTime: new Date('2025-07-13T09:30:00').getTime(), endTime: new Date('2025-07-13T11:30:00').getTime(), activity: '주일예배 (백종호 목사)' },
    { startTime: new Date('2025-07-13T11:30:00').getTime(), endTime: new Date('2025-07-13T12:30:00').getTime(), activity: '점심식사' },
    { startTime: new Date('2025-07-13T12:30:00').getTime(), endTime: new Date('2025-07-13T17:00:00').getTime(), activity: '집으로' },
  ],
};




/* 2025년 겨울수련회 */
// export const schedule = {
//   day1: [
//     { startTime: new Date('2025-02-15T00:00:00').getTime(), endTime: new Date('2025-02-15T13:00:00').getTime(), activity: '수련회 출발!' },
//     { startTime: new Date('2025-02-15T13:00:00').getTime(), endTime: new Date('2025-02-15T14:00:00').getTime(), activity: '수련회 등록' },
//     { startTime: new Date('2025-02-15T14:00:00').getTime(), endTime: new Date('2025-02-15T15:00:00').getTime(), activity: '개회예배' },
//     { startTime: new Date('2025-02-15T15:00:00').getTime(), endTime: new Date('2025-02-15T16:00:00').getTime(), activity: 'OT' },
//     { startTime: new Date('2025-02-15T16:00:00').getTime(), endTime: new Date('2025-02-15T18:00:00').getTime(), activity: '특강 1 (로마서에 나타난 하나님의 은혜) & 새친구 프로그램' },
//     { startTime: new Date('2025-02-15T18:00:00').getTime(), endTime: new Date('2025-02-15T20:00:00').getTime(), activity: '저녁식사' },
//     { startTime: new Date('2025-02-15T20:00:00').getTime(), endTime: new Date('2025-02-15T24:00:00').getTime(), activity: '집회 & 새친구 프로그램' },
//     { startTime: new Date('2025-02-15T24:00:00').getTime(), endTime: new Date('2025-02-16T08:00:00').getTime(), activity: '세면 및 취침' },
//   ],
//   day2: [
//     { startTime: new Date('2025-02-17T08:00:00').getTime(), endTime: new Date('2025-02-17T09:00:00').getTime(), activity: '기상' },
//     { startTime: new Date('2025-02-17T09:00:00').getTime(), endTime: new Date('2025-02-17T10:00:00').getTime(), activity: '아침식사' },
//     { startTime: new Date('2025-02-17T10:00:00').getTime(), endTime: new Date('2025-02-17T12:00:00').getTime(), activity: '폐회예배' },
//     { startTime: new Date('2025-02-17T12:00:00').getTime(), endTime: new Date('2025-02-17T13:00:00').getTime(), activity: '점심식사' },
//     { startTime: new Date('2025-02-17T13:00:00').getTime(), endTime: new Date('2025-02-17T24:00:00').getTime(), activity: '귀가' },
//   ],
// };


/* 2024년 여름수련회 */
// export const schedule = {
//   day1: [
//     { startTime: new Date('2024-08-23T00:00:00').getTime(), endTime: new Date('2024-08-23T13:00:00').getTime(), activity: '수련회 출발!' },
//     { startTime: new Date('2024-08-23T13:00:00').getTime(), endTime: new Date('2024-08-23T14:00:00').getTime(), activity: '수련회 등록' },
//     { startTime: new Date('2024-08-23T14:00:00').getTime(), endTime: new Date('2024-08-23T15:00:00').getTime(), activity: '개회예배' },
//     { startTime: new Date('2024-08-23T15:00:00').getTime(), endTime: new Date('2024-08-23T16:00:00').getTime(), activity: 'OT' },
//     { startTime: new Date('2024-08-23T16:00:00').getTime(), endTime: new Date('2024-08-23T18:00:00').getTime(), activity: '특강 1 (로마서에 나타난 하나님의 은혜) & 새친구 프로그램' },
//     { startTime: new Date('2024-08-23T18:00:00').getTime(), endTime: new Date('2024-08-23T20:00:00').getTime(), activity: '저녁식사' },
//     { startTime: new Date('2024-08-23T20:00:00').getTime(), endTime: new Date('2024-08-23T24:00:00').getTime(), activity: '집회 & 새친구 프로그램' },
//     { startTime: new Date('2024-08-23T24:00:00').getTime(), endTime: new Date('2024-08-24T08:00:00').getTime(), activity: '세면 및 취침' },
//   ],
//   day2: [
//     { startTime: new Date('2024-08-24T08:00:00').getTime(), endTime: new Date('2024-08-24T09:00:00').getTime(), activity: '기상' },
//     { startTime: new Date('2024-08-24T09:00:00').getTime(), endTime: new Date('2024-08-24T10:00:00').getTime(), activity: '아침식사' },
//     { startTime: new Date('2024-08-24T10:00:00').getTime(), endTime: new Date('2024-08-24T12:00:00').getTime(), activity: '성경탐구' },
//     { startTime: new Date('2024-08-24T12:00:00').getTime(), endTime: new Date('2024-08-24T14:00:00').getTime(), activity: '점심식사' },
//     { startTime: new Date('2024-08-24T14:00:00').getTime(), endTime: new Date('2024-08-24T16:00:00').getTime(), activity: '특강 2 (구약 속 은혜의 모든 것) & 새친구 프로그램' },
//     { startTime: new Date('2024-08-24T16:00:00').getTime(), endTime: new Date('2024-08-24T17:00:00').getTime(), activity: '침례 / 단체사진' },
//     { startTime: new Date('2024-08-24T17:00:00').getTime(), endTime: new Date('2024-08-24T18:00:00').getTime(), activity: '소그룹 시간' },
//     { startTime: new Date('2024-08-24T18:00:00').getTime(), endTime: new Date('2024-08-24T20:00:00').getTime(), activity: '저녁식사' },
//     { startTime: new Date('2024-08-23T20:00:00').getTime(), endTime: new Date('2024-08-23T24:00:00').getTime(), activity: '집회 & 새친구 프로그램' },
//     { startTime: new Date('2024-08-24T24:00:00').getTime(), endTime: new Date('2024-08-25T08:00:00').getTime(), activity: '세면 및 취침' },
//   ],
//   day3: [
//     { startTime: new Date('2024-08-25T08:00:00').getTime(), endTime: new Date('2024-08-25T09:00:00').getTime(), activity: '기상' },
//     { startTime: new Date('2024-08-25T09:00:00').getTime(), endTime: new Date('2024-08-25T10:00:00').getTime(), activity: '아침식사' },
//     { startTime: new Date('2024-08-25T10:00:00').getTime(), endTime: new Date('2024-08-25T12:00:00').getTime(), activity: '폐회예배' },
//     { startTime: new Date('2024-08-25T12:00:00').getTime(), endTime: new Date('2024-08-25T13:00:00').getTime(), activity: '점심식사' },
//     { startTime: new Date('2024-08-25T13:00:00').getTime(), endTime: new Date('2024-08-25T24:00:00').getTime(), activity: '귀가' },
//   ],
// };
