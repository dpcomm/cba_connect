# CBA Connect

CBA Connect 애플리케이션의 React Native (Expo) 프로젝트입니다.
이 프로젝트는 **도메인 주도 설계(DDD)** 아키텍처를 따릅니다.

## 아키텍처 가이드

### 1.도메인 주도 설계 (DDD) + Feature-based UI

비즈니스 로직은 **계층(Layer)**별로, UI는 **기능(Feature)**별로 관리합니다.

#### 왜 이렇게 하나요?
- **로직의 재사용성**: 도메인 로직(`domain`, `application`)은 UI와 분리되어 있어 테스트하고 재사용하기 좋습니다.
- **UI의 응집도**: 화면(`features`)은 관련된 컴포넌트, 훅, 스타일이 한곳에 모여있어 수정이 편합니다.

---

### 2. 디렉토리 구조

`src` 폴더는 크게 **로직(Logic)**과 **UI(Presentation)** 영역, 그리고 **공용(Shared)** 영역으로 나뉩니다.

#### � 로직 (Business Logic Layers)
비즈니스 규칙과 데이터 처리를 담당합니다. `src` 바로 아래에 위치합니다.

- **`src/domain`** (핵심 비즈니스)
  - **역할**: 앱의 핵심 데이터 모델(Entity)과 규칙을 정의합니다. 순수 TypeScript로 작성됩니다.
  - **구성**: `Entity` (예: `Auth`), `Repository Interface` (예: `AuthRepository`)

- **`src/application`** (유스케이스)
  - **역할**: 사용자의 요구사항(기능)을 구체적으로 구현합니다.
  - **구성**: `UseCase` (예: `LoginUseCase`) - 도메인 객체를 사용하여 작업을 조율합니다.

- **`src/infrastructure`** (외부 연동)
  - **역할**: 서버 API 호출, DB, 기기 기능 등 실제 구현을 담당합니다.
  - **구성**: `Repository Implementation` (예: `ApiAuthRepository`), `DTO` (서버 데이터 규격)

#### � UI (Presentation Layer)
- **`src/features`**
  - **역할**: 사용자에게 보여지는 화면과 화면별 로직을 담습니다.
  - **구조**: `기능별 폴더` (예: `auth`, `home`) 아래에 다음과 같이 구성합니다.
    - `screens/`: 페이지 단위 컴포넌트 (`LoginScreen.tsx`)
    - `components/`: 해당 기능 전용 컴포넌트 (`LoginForm.tsx`)
    - `hooks/`: ViewModel 및 로직 (`useLoginViewModel.ts`)
    - `utils/`: 해당 기능 전용 유틸리티 (`authValidator.ts`)
  - **예시**: `src/features/auth/screens/login/` 아래에 `LoginScreen.tsx`, `useLoginViewModel.ts`가 함께 위치합니다.

#### ⬜ 공용 (Shared)
- **`src/shared`**
  - **역할**: 앱 전반에서 쓰이는 공통 모듈입니다.
  - **구성**: `api` (공통 API 타입, 클라이언트), `di` (의존성 주입 설정), `components` (공용 UI), `stores` (전역 상태)

---

### 3. 의존성 주입 (Dependency Injection)

**TSyringe** 라이브러리를 사용하여 의존성을 관리합니다.

#### 사용 방법

1. **Repository 구현체에 `@injectable()` 붙이기**
   ```typescript
   @injectable()
   export class ApiAuthRepository implements AuthRepository { ... }
   ```

2. **UseCase에 `@injectable()` 및 `@inject()` 붙이기**
   ```typescript
   @injectable()
   export class LoginUseCase {
     constructor(@inject('AuthRepository') private repo: AuthRepository) {}
   }
   ```

3. **`src/shared/di/container.ts`에 등록하기**
   ```typescript
   container.register('AuthRepository', { useClass: ApiAuthRepository });
   container.register(LoginUseCase, { useClass: LoginUseCase });
   ```

4. **ViewModel에서 꺼내 쓰기**
   ```typescript
   const useCase = container.resolve(LoginUseCase);
   ```

---

### 4. 실전 개발 가이드 (Step-by-Step)

**"로그인(Login)"** 기능을 예시로, 전체 흐름을 설명합니다.

#### Step 1: Domain (비즈니스 로직 정의)
가장 먼저 "데이터"와 "인터페이스"를 정의합니다.

**파일**: `src/domain/auth/Auth.ts`
```typescript
export class Auth {
  constructor(
    public readonly accessToken: string,
    public readonly refreshToken: string,
    public readonly user: {
      id: number;
      name: string;
      // ... 기타 유저 정보
    }
  ) {}
}
```

**파일**: `src/domain/auth/AuthRepository.ts`
```typescript
export interface IAuthRepository {
  login(id: string, pw: string): Promise<Auth>;
}
```

#### Step 2: Application (유스케이스 구현)
**"1 Feature = 1 UseCase"** 원칙에 따라, 기능 단위로 파일을 나눕니다.

- `src/application/auth/LoginUseCase.ts`
- `src/application/auth/RegisterUseCase.ts`
- `src/application/auth/LogoutUseCase.ts`

**파일**: `src/application/auth/LoginUseCase.ts`
```typescript
@injectable()
export class LoginUseCase {
  constructor(@inject('AuthRepository') private repo: IAuthRepository) {}

  async execute(id: string, pw: string): Promise<Auth> {
    return this.repo.login(id, pw);
  }
}
```

#### Step 3: Infrastructure (API 연동)
서버와 실제 통신하는 코드를 작성합니다. `axios`의 내장 기능을 활용하여 에러 처리를 간소화합니다.

**파일**: `src/shared/api/types.ts` (공통)
```typescript
export interface ApiResponse<T> {
  success: boolean;
  data: T;
  // ...
}
```

**파일**: `src/infrastructure/auth/dto.ts` (DTO 정의)
```typescript
export interface AuthResponseDto {
  access_token: string;
  refresh_token: string;
  user: { ... };
}
```

**파일**: `src/infrastructure/auth/AuthRepository.ts`
```typescript
@injectable()
export class AuthRepository implements IAuthRepository {
  async login(id: string, pw: string): Promise<Auth> {
    try {
      const res = await apiClient.post<ApiResponse<AuthResponseDto>>('/api/auth/login', { ... });
      const { data } = res.data;
      return this.mapToAuth(data); // 매퍼 메서드 활용
    } catch (e) {
      throw this.normalizeError(e);
    }
  }

  private normalizeError(error: unknown) {
    if (isAxiosError(error)) {
      // Axios 에러 처리
    }
    // ...
  }
}
```

##### DTO 작성 가이드

| 네이밍 | 예시 | 설명 |
|---|---|---|
| `[기능]RequestDto` | `LoginRequestDto` | 앱 → 서버 요청 데이터 |
| `[기능]ResponseDto` | `AuthResponseDto` | 서버 → 앱 응답 데이터 |

**작성 원칙:**
1. **서버 스펙 그대로**: `snake_case` 유지 (예: `access_token`)
2. **중복 시 재사용**: `UserResponseDto`를 `AuthResponseDto`에서 import
3. **변환은 Repository에서**: `mapToAuth()` 같은 private 메서드로 DTO → Domain 변환



#### Step 4: Presentation (UI & ViewModel)
화면과 로직을 연결합니다. ViewModel은 화면 파일 옆에 두는 것(`Co-location`)을 권장합니다.

**파일**: `src/features/auth/screens/login/useLoginViewModel.ts`
```typescript
export function useLoginViewModel() {
  const loginUseCase = container.resolve(LoginUseCase); // DI 해결

  const login = async () => {
    try {
      const auth = await loginUseCase.execute(id, pw);
      // 성공 처리
    } catch (e) {
      // 에러 처리
    }
  };

  return { login, ... };
}
```

**파일**: `src/features/auth/screens/login/LoginScreen.tsx`
```tsx
export default function LoginScreen() {
  const { login } = useLoginViewModel();
  return <Button onPress={login}>로그인</Button>;
}
```

---

## Get started

1. Install dependencies
   ```bash
   npm install
   ```

2. Start the app
   ```bash
   npm run start
   ```
