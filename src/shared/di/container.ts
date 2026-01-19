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
import { RegisterExpoTokenUseCase } from "@application/notification/RegistExpoTokenUseCase";
import { CheckVersionUseCase } from "@application/status/CheckVersionUseCase";
import { GetMeUseCase } from "@application/user/GetMeUseCase";
import { UpdateProfileUseCase } from "@application/user/UpdateProfileUseCase";
import { AuthRepository } from "@infrastructure/auth/AuthRepository";
import { CarpoolRepository } from "@infrastructure/carpool/CarpoolRepository";
import { ConsentRepository } from "@infrastructure/consent/ConsentRepository";
import { ApiExpoPushTokenRepository } from "@infrastructure/notification/ApiExpoPushTokenRepository";
import { StatusRepository } from "@infrastructure/status/StatusRepository";
import { UserRepository } from "@infrastructure/user/UserRepository";
import "reflect-metadata";
import { container } from "tsyringe";

container.register("AuthRepository", { useClass: AuthRepository });
container.register("UserRepository", { useClass: UserRepository });
container.register("CarpoolRepository", { useClass: CarpoolRepository });
container.register("ConsentRepository", { useClass: ConsentRepository });
container.register("StatusRepository", { useClass: StatusRepository });

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

export { container };
