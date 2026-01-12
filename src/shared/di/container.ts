import { AutoLoginUseCase } from '@application/auth/AutoLoginUseCase';
import { LoginUseCase } from '@application/auth/LoginUseCase';
import { LogoutUseCase } from '@application/auth/LogoutUseCase';
import { RefreshUseCase } from '@application/auth/RefreshUseCase';
import { RegisterUseCase } from '@application/auth/RegisterUseCase';
import { RegisterExpoTokenUseCase } from '@application/notification/RegistExpoTokenUseCase';
import { CreateCarpoolUseCase, DeleteCarpoolUseCase, FindMyCarpoolsUseCase, GetAllCarpoolsUseCase, GetCarpoolByIdUseCase, GetCarpoolDetailUseCase, JoinCarpoolUseCase, LeaveCarpoolUseCase, UpdateCarpoolStatusUseCase, UpdateCarpoolUseCase } from '@application/carpool';
import { GetMeUseCase } from '@application/user/GetMeUseCase';
import { AuthRepository } from '@infrastructure/auth/AuthRepository';
import { ApiExpoPushTokenRepository } from '@infrastructure/notification/ApiExpoPushTokenRepository';
import { CarpoolRepository } from '@infrastructure/carpool/CarpoolRepository';
import { UserRepository } from '@infrastructure/user/UserRepository';
import 'reflect-metadata';
import { container } from 'tsyringe';

container.register('AuthRepository', { useClass: AuthRepository });
container.register('UserRepository', { useClass: UserRepository });
container.register('CarpoolRepository', { useClass: CarpoolRepository });

container.register('ExpoPushTokenRepository', { useClass: ApiExpoPushTokenRepository})

container.register(LoginUseCase, { useClass: LoginUseCase });
container.register(RegisterUseCase, { useClass: RegisterUseCase });
container.register(LogoutUseCase, { useClass: LogoutUseCase });
container.register(RefreshUseCase, { useClass: RefreshUseCase });
container.register(AutoLoginUseCase, { useClass: AutoLoginUseCase });
container.register(GetMeUseCase, { useClass: GetMeUseCase });
container.register(RegisterExpoTokenUseCase, { useClass: RegisterExpoTokenUseCase})

container.register(GetAllCarpoolsUseCase, { useClass: GetAllCarpoolsUseCase });
container.register(CreateCarpoolUseCase, { useClass: CreateCarpoolUseCase });
container.register(GetCarpoolByIdUseCase, { useClass: GetCarpoolByIdUseCase });
container.register(GetCarpoolDetailUseCase, { useClass: GetCarpoolDetailUseCase });
container.register(FindMyCarpoolsUseCase, { useClass: FindMyCarpoolsUseCase });
container.register(UpdateCarpoolUseCase, { useClass: UpdateCarpoolUseCase });
container.register(JoinCarpoolUseCase, { useClass: JoinCarpoolUseCase });
container.register(LeaveCarpoolUseCase, { useClass: LeaveCarpoolUseCase });
container.register(DeleteCarpoolUseCase, { useClass: DeleteCarpoolUseCase });
container.register(UpdateCarpoolStatusUseCase, { useClass: UpdateCarpoolStatusUseCase });

export { container };

