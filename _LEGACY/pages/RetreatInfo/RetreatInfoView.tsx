import React from 'react';
import poster from '@assets/images/retreat_kingdomOfGod_poster.png';
import guidebook_0 from '@assets/images/retreat_kingdomOfGod_guidebook_0.png';
import guidebook_1 from '@assets/images/retreat_kingdomOfGod_guidebook_1.png';
import guidebook_2 from '@assets/images/retreat_kingdomOfGod_guidebook_2.png';
import guidebook_3 from '@assets/images/retreat_kingdomOfGod_guidebook_3.png';
import guidebook_4 from '@assets/images/retreat_kingdomOfGod_guidebook_4.png';
import guidebook_5 from '@assets/images/retreat_kingdomOfGod_guidebook_5.png';
import guidebook_6 from '@assets/images/retreat_kingdomOfGod_guidebook_6.png';
import guidebook_7 from '@assets/images/retreat_kingdomOfGod_guidebook_7.png';
import guidebook_8 from '@assets/images/retreat_kingdomOfGod_guidebook_8.png';
import guidebook_9 from '@assets/images/retreat_kingdomOfGod_guidebook_9.png';
import guidebook_10 from '@assets/images/retreat_kingdomOfGod_guidebook_10.png';
import { Container, Left, LogoImage, RetreatGuideBookTitle, TextContainer } from './RetreatInfo.styled';
// import usePageControll from '@hooks/usePageControll';
// import { useRecoilValue, useSetRecoilState } from 'recoil';
// import { applicationState, isLoadingState, userState } from '@modules/atoms';
// import useConfirm from '@hooks/useConfirm';
// import { requestApplicationByUserAndRetreatId } from '@apis/index';

const RetreatInfoView = () => {
// 	const { handlePage } = usePageControll();
// 	const user = useRecoilValue(userState);
// 	const set_application = useSetRecoilState(applicationState);
// 	const setIsLoading = useSetRecoilState(isLoadingState);

// 	const confirmRegister = useConfirm(
// 		"수련회 신청서가 이미 작성되었습니다. 신청서를 수정하겠습니까?",
// 		() => handlePage("retreat-application-info"),
// 		() => console.log("Cancled..")
// 	);

//   const handleApplicationPage = () => {
//     setIsLoading({ isLoading: true });
//     requestApplicationByUserAndRetreatId(user.userId, 2).then((res) => {
// 			set_application({
//         ...res.data.application
//       });
// 			setIsLoading({ isLoading: false });
// 			confirmRegister();
//     }).catch((err) => {
//       if (err.response.data.message === "Application not exist") handlePage('retreat-application');
//       setIsLoading({ isLoading: false });
//     });
//   };

  return (
		<Container>
			<Left></Left>
			{/* <Left onClick={handleApplicationPage}>
				<SvgIcon name={'next'} width={24} height={24} fill="#1F9EDD" />
				수련회 등록하기
			</Left> */}
			<TextContainer>
				<RetreatGuideBookTitle>POSTER</RetreatGuideBookTitle>
				<LogoImage src={poster} />
				<br></br>
				<RetreatGuideBookTitle>GUIDE BOOK</RetreatGuideBookTitle>
				<LogoImage src={guidebook_0} />
				<LogoImage src={guidebook_1} />
				<LogoImage src={guidebook_2} />
				<LogoImage src={guidebook_3} />
				<LogoImage src={guidebook_4} />
				<LogoImage src={guidebook_5} />
				<LogoImage src={guidebook_6} />
				<LogoImage src={guidebook_7} />
				<LogoImage src={guidebook_8} />
				<LogoImage src={guidebook_9} />
				<LogoImage src={guidebook_10} />
			</TextContainer>
		</Container>
  );
};

export default RetreatInfoView;
