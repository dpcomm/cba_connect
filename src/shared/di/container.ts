import { AutoLoginUseCase } from '@application/auth/AutoLoginUseCase';
import { LoginUseCase } from '@application/auth/LoginUseCase';
import { LogoutUseCase } from '@application/auth/LogoutUseCase';
import { RefreshUseCase } from '@application/auth/RefreshUseCase';
import { RegisterUseCase } from '@application/auth/RegisterUseCase';
import { GetMeUseCase } from '@application/user/GetMeUseCase';
import { AuthRepository } from '@infrastructure/auth/AuthRepository';
import { UserRepository } from '@infrastructure/user/UserRepository';
import 'reflect-metadata';
import { container } from 'tsyringe';

container.register('AuthRepository', { useClass: AuthRepository });
container.register('UserRepository', { useClass: UserRepository });

container.register(LoginUseCase, { useClass: LoginUseCase });
container.register(RegisterUseCase, { useClass: RegisterUseCase });
container.register(LogoutUseCase, { useClass: LogoutUseCase });
container.register(RefreshUseCase, { useClass: RefreshUseCase });
container.register(AutoLoginUseCase, { useClass: AutoLoginUseCase });
container.register(GetMeUseCase, { useClass: GetMeUseCase });

export { container };
