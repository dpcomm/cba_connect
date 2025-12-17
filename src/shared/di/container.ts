import { LoginUseCase } from '@application/auth/LoginUseCase';
import { LogoutUseCase } from '@application/auth/LogoutUseCase';
import { RefreshUseCase } from '@application/auth/RefreshUseCase';
import { RegisterUseCase } from '@application/auth/RegisterUseCase';
import { ApiAuthRepository } from '@infrastructure/auth/ApiAuthRepository';
import 'reflect-metadata';
import { container } from 'tsyringe';

container.register('AuthRepository', { useClass: ApiAuthRepository });

container.register(LoginUseCase, { useClass: LoginUseCase });
container.register(RegisterUseCase, { useClass: RegisterUseCase });
container.register(LogoutUseCase, { useClass: LogoutUseCase });
container.register(RefreshUseCase, { useClass: RefreshUseCase });

export { container };
