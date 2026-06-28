import { AutoLoginUseCase } from "@application/auth/AutoLoginUseCase";
import { CheckIdDuplicateUseCase } from "@application/auth/CheckIdDuplicateUseCase";
import { LoginUseCase } from "@application/auth/LoginUseCase";
import { LogoutUseCase } from "@application/auth/LogoutUseCase";
import { RefreshUseCase } from "@application/auth/RefreshUseCase";
import { RegisterUseCase } from "@application/auth/RegisterUseCase";
import { ResetPasswordUseCase } from "@application/auth/ResetPasswordUseCase";
import { SendEmailVerificationUseCase } from "@application/auth/SendEmailVerificationUseCase";
import { VerifyEmailCodeUseCase } from "@application/auth/VerifyEmailCodeUseCase";
import {
  CreateCarpoolUseCase,
  DeleteCarpoolUseCase,
  FindMyCarpoolsUseCase,
  GetAllCarpoolsUseCase,
  GetCarpoolByIdUseCase,
  GetCarpoolDetailUseCase,
  JoinCarpoolUseCase,
  LeaveCarpoolUseCase,
  UpdateCarpoolStatusUseCase,
  UpdateCarpoolUseCase,
} from "@application/carpool";
import { CheckConsentUseCase } from "@application/consent/CheckConsentUseCase";
import { SubmitConsentUseCase } from "@application/consent/SubmitConsentUseCase";
import { GetNoticesUseCase } from "@application/notice/GetNoticesUseCase";
import { GetNoticeUseCase } from "@application/notice/GetNoticeUseCase";
import { RegisterExpoTokenUseCase } from "@application/notification/RegistExpoTokenUseCase";
import { GetApplicationOptionsUseCase } from "@application/retreat/GetApplicationOptionsUseCase";
import { GetApplicationSurveyIdUseCase } from "@application/retreat/GetApplicationSurveyIdUseCase";
import { GetMyApplicationDetailUseCase } from "@application/retreat/GetMyApplicationDetailUseCase";
import { CancelApplicationUseCase } from "@application/retreat/CancelApplicationUseCase";
import { GetMyRetreatApplicationUseCase } from "@application/retreat/GetMyRetreatApplicationUseCase";
import { SubmitRetreatApplicationUseCase } from "@application/retreat/SubmitRetreatApplicationUseCase";
import { CheckVersionUseCase } from "@application/status/CheckVersionUseCase";
import { GetSystemConfigUseCase } from "@application/system/GetSystemConfigUseCase";
import { GetTermUseCase } from "@application/term/GetTermUseCase";
import { GetMeUseCase } from "@application/user/GetMeUseCase";
import { UpdateProfileUseCase } from "@application/user/UpdateProfileUseCase";
import { AuthRepository } from "@infrastructure/auth/AuthRepository";
import { CarpoolRepository } from "@infrastructure/carpool/CarpoolRepository";
import { ConsentRepository } from "@infrastructure/consent/ConsentRepository";
import { ApiLectureRepository } from "@infrastructure/lecture/ApiLectureRepository";
import { NoticeRepository } from "@infrastructure/notice/NoticeRepository";
import { ApiExpoPushTokenRepository } from "@infrastructure/notification/ApiExpoPushTokenRepository";
import { RetreatRepository } from "@infrastructure/retreat/RetreatRepository";
import { StatusRepository } from "@infrastructure/status/StatusRepository";
import { ApiTermRepository } from "@infrastructure/term/ApiTermRepository";
import { UserRepository } from "@infrastructure/user/UserRepository";
import "reflect-metadata";
import { container } from "tsyringe";

container.register("AuthRepository", { useClass: AuthRepository });
container.register("UserRepository", { useClass: UserRepository });
container.register("CarpoolRepository", { useClass: CarpoolRepository });
container.register("ConsentRepository", { useClass: ConsentRepository });
container.register("StatusRepository", { useClass: StatusRepository });
container.register("NoticeRepository", { useClass: NoticeRepository });
container.register("LectureRepository", { useClass: ApiLectureRepository });
container.register("TermRepository", { useClass: ApiTermRepository });
container.register("RetreatRepository", { useClass: RetreatRepository });
container.register("ExpoPushTokenRepository", {
  useClass: ApiExpoPushTokenRepository,
});

container.register(LoginUseCase, { useClass: LoginUseCase });
container.register(RegisterUseCase, { useClass: RegisterUseCase });
container.register(LogoutUseCase, { useClass: LogoutUseCase });
container.register(RefreshUseCase, { useClass: RefreshUseCase });
container.register(AutoLoginUseCase, { useClass: AutoLoginUseCase });
container.register(GetMeUseCase, { useClass: GetMeUseCase });
container.register(RegisterExpoTokenUseCase, {
  useClass: RegisterExpoTokenUseCase,
});
container.register(SendEmailVerificationUseCase, {
  useClass: SendEmailVerificationUseCase,
});
container.register(VerifyEmailCodeUseCase, {
  useClass: VerifyEmailCodeUseCase,
});
container.register(CheckIdDuplicateUseCase, {
  useClass: CheckIdDuplicateUseCase,
});
container.register(ResetPasswordUseCase, { useClass: ResetPasswordUseCase });
container.register(UpdateProfileUseCase, { useClass: UpdateProfileUseCase });
container.register(CheckConsentUseCase, { useClass: CheckConsentUseCase });
container.register(SubmitConsentUseCase, { useClass: SubmitConsentUseCase });
container.register(CheckVersionUseCase, { useClass: CheckVersionUseCase });
container.register(GetSystemConfigUseCase, {
  useClass: GetSystemConfigUseCase,
});

container.register(GetAllCarpoolsUseCase, { useClass: GetAllCarpoolsUseCase });
container.register(CreateCarpoolUseCase, { useClass: CreateCarpoolUseCase });
container.register(GetCarpoolByIdUseCase, { useClass: GetCarpoolByIdUseCase });
container.register(GetCarpoolDetailUseCase, {
  useClass: GetCarpoolDetailUseCase,
});
container.register(FindMyCarpoolsUseCase, { useClass: FindMyCarpoolsUseCase });
container.register(UpdateCarpoolUseCase, { useClass: UpdateCarpoolUseCase });
container.register(JoinCarpoolUseCase, { useClass: JoinCarpoolUseCase });
container.register(LeaveCarpoolUseCase, { useClass: LeaveCarpoolUseCase });
container.register(DeleteCarpoolUseCase, { useClass: DeleteCarpoolUseCase });
container.register(UpdateCarpoolStatusUseCase, {
  useClass: UpdateCarpoolStatusUseCase,
});

container.register(GetNoticesUseCase, { useClass: GetNoticesUseCase });
container.register(GetNoticeUseCase, { useClass: GetNoticeUseCase });
container.register(GetTermUseCase, { useClass: GetTermUseCase });
container.register(GetMyRetreatApplicationUseCase, {
  useClass: GetMyRetreatApplicationUseCase,
});

container.register(GetApplicationOptionsUseCase, {
  useClass: GetApplicationOptionsUseCase,
});
container.register(SubmitRetreatApplicationUseCase, {
  useClass: SubmitRetreatApplicationUseCase,
});
container.register(GetApplicationSurveyIdUseCase, {
  useClass: GetApplicationSurveyIdUseCase,
});
container.register(GetMyApplicationDetailUseCase, {
  useClass: GetMyApplicationDetailUseCase,
});
container.register(CancelApplicationUseCase, {
  useClass: CancelApplicationUseCase,
});
export { container };
