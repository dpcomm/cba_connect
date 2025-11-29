import { LoginUseCase } from '@application/auth/LoginUseCase';
import { ApiAuthRepository } from '@infrastructure/auth/ApiAuthRepository';
import 'reflect-metadata';
import { container } from 'tsyringe';

// Register Repositories
container.register('AuthRepository', { useClass: ApiAuthRepository });

// Register UseCases
container.register(LoginUseCase, { useClass: LoginUseCase });

export { container };
