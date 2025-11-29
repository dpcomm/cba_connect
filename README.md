# CBA Connect

CBA Connect 애플리케이션의 React Native (Expo) 프로젝트입니다.
이 프로젝트는 도메인 주도 설계(DDD) 아키텍처를 따릅니다.

## 아키텍처 가이드

### 1. 핵심 철학: 도메인 주도 설계 (DDD)

우리는 **"기능의 종류"**가 아닌 **"업무 영역(도메인)"**을 기준으로 코드를 관리합니다.

#### 왜 이렇게 하나요?
- **응집도 향상**: '로그인' 관련 코드를 고칠 때 `auth` 폴더만 보면 됩니다. 화면, 로직, API가 한곳에 모여있어 유지보수가 쉽습니다.
- **예측 가능성**: 새로운 기능을 추가할 때 어디에 파일을 만들어야 할지 명확합니다.

---

### 2. 디렉토리 구조

`src` 아래의 4가지 계층(Layer)으로 나뉩니다.

#### 📂 `src/domain` (비즈니스 로직)
- **역할**: 앱의 핵심 데이터 구조와 규칙을 정의합니다. (순수 TypeScript)
- **규칙**: 외부 라이브러리(React, Axios 등)에 의존하지 않습니다.
- **구성**:
  - `Entity`: 데이터 모델 (예: `Auth`, `User`)
  - `Repository Interface`: 데이터 저장소의 껍데기 (구현은 Infrastructure에서 함)

#### 📂 `src/application` (유스케이스)
- **역할**: 사용자의 요구사항(기능)을 구현합니다.
- **규칙**: 도메인 객체를 가져와서 작업을 수행합니다.
- **구성**:
  - `UseCase`: 구체적인 기능 하나 (예: `LoginUseCase`, `RegisterRetreatUseCase`)
  - **Tip**: 서로 다른 도메인이 섞여야 할 때(예: 수련회 신청 시 유저 정보 필요), 여기서 여러 리포지토리를 불러와 조합합니다.

#### 📂 `src/infrastructure` (외부 연동)
- **역할**: 실제 서버 API 호출, DB 저장, 기기 기능 사용 등을 담당합니다.
- **규칙**: `domain`에서 정의한 `Repository Interface`를 실제로 구현합니다.
- **구성**:
  - `ApiRepository`: Axios 등을 사용한 구현체
  - `dto.ts`: **API 통신용 데이터 타입** (서버 스펙과 1:1 매칭)

#### 📂 `src/presentation` (UI)
- **역할**: 화면을 그리고 사용자와 상호작용합니다.
- **규칙**: 비즈니스 로직을 직접 처리하지 않고 `ViewModel`이나 `UseCase`에 위임합니다.
- **구성**:
  - `Screen`: 페이지 단위 컴포넌트
  - `ViewModel`: 화면의 상태와 로직을 관리하는 커스텀 훅 (Navigation 처리도 여기서!)
  - `Components`: 재사용 가능한 UI 조각

---

### 3. 의존성 주입 (Dependency Injection)

우리는 **TSyringe** 라이브러리를 사용하여 의존성을 관리합니다.

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

3. **`src/shared/container.ts`에 등록하기**
   ```typescript
   container.register('AuthRepository', { useClass: ApiAuthRepository });
   container.register(LoginUseCase, { useClass: LoginUseCase });
   ```

4. **ViewModel에서 꺼내 쓰기**
   ```typescript
   const useCase = container.resolve(LoginUseCase);
   ```

---

### 4. 자주 묻는 질문 (FAQ) & 개발 팁

#### Q1. 회원가입이나 비밀번호 찾기 페이지는 어디에 두나요?
**A. `src/presentation/auth` 폴더에 둡니다.**
- '회원가입', '비밀번호 재설정'은 넓은 의미에서 **'인증(Auth)'** 도메인에 속합니다.
- 따라서 `LoginScreen`과 같은 폴더에 위치시키는 것이 관리에 용이합니다.

#### Q2. 화면 이동(Navigation)은 어떻게 구현하나요?
**A. `ViewModel`에서 처리하는 것을 권장합니다.**
- 뷰(View)는 그리기만 하고, 로직은 뷰모델(ViewModel)이 담당합니다.
- 예시:
  ```typescript
  // useLoginViewModel.ts
  const navigateToRegister = () => router.push('/auth/register');
  ```

#### Q3. `infrastructure/auth/dto.ts`와 `application/dto`의 차이는?
**A. 용도가 다릅니다.**
- **Infrastructure DTO (`infrastructure/{domain}/dto.ts`)**: **[필수]** 서버 API와 통신하기 위한 규격입니다. 서버 응답 JSON 형태를 그대로 따릅니다.
- **Application DTO (`application/dto`)**: **[선택]** 화면에서 유스케이스로 데이터를 넘길 때 사용하는 규격입니다. 입력값이 매우 많을 때만 사용하고, 보통은 파라미터로 직접 넘깁니다.

---

### 5. 실전 개발 가이드 (Step-by-Step)

"기도제목 작성하기(Create PrayTalk)" 기능을 예시로, 코드를 어떻게 작성해야 하는지 단계별로 설명합니다.

#### Step 1: Domain (비즈니스 로직 정의)
가장 먼저 "무엇"을 할 것인지 정의합니다.

**파일**: `src/domain/community/PrayTalk.ts` (Entity)
```typescript
export class PrayTalk {
  constructor(
    public readonly id: string,
    public readonly content: string,
    public readonly authorId: string,
    public readonly createdAt: Date
  ) {}

  // 비즈니스 로직 예시: 내용 유효성 검사
  static validate(content: string) {
    if (content.length < 5) throw new Error("내용은 5자 이상이어야 합니다.");
  }
}
```

**파일**: `src/domain/community/CommunityRepository.ts` (Interface)
```typescript
import { PrayTalk } from './PrayTalk';

export interface CommunityRepository {
  create(content: string, authorId: string): Promise<PrayTalk>;
}
```

#### Step 2: Application (유스케이스 구현)
사용자의 요구사항을 코드로 옮깁니다.

**파일**: `src/application/community/CreatePrayTalkUseCase.ts`
```typescript
import { CommunityRepository } from '@domain/community/CommunityRepository';
import { PrayTalk } from '@domain/community/PrayTalk';
import { injectable, inject } from 'tsyringe';

@injectable()
export class CreatePrayTalkUseCase {
  constructor(@inject('CommunityRepository') private readonly repository: CommunityRepository) {}

  async execute(content: string, authorId: string): Promise<PrayTalk> {
    // 1. 도메인 로직 검증
    PrayTalk.validate(content);

    // 2. 저장소 호출
    return await this.repository.create(content, authorId);
  }
}
```

#### Step 3: Infrastructure (실제 구현)
서버 API와 통신하는 코드를 작성합니다. 이때 **DTO**를 정의하여 타입 안정성을 확보합니다.

**파일**: `src/infrastructure/community/dto.ts`
```typescript
export interface CreatePrayTalkRequestDto {
  content: string;
  authorId: string;
}

export interface CreatePrayTalkResponseDto {
  id: string;
  content: string;
  authorId: string;
  createdAt: string;
}

export interface ApiResponse<T> {
  message?: string;
  data: T;
}
```

**파일**: `src/infrastructure/community/ApiCommunityRepository.ts`
```typescript
import { CommunityRepository } from '@domain/community/CommunityRepository';
import { PrayTalk } from '@domain/community/PrayTalk';
import { CreatePrayTalkRequestDto, CreatePrayTalkResponseDto, ApiResponse } from './dto';
import axios from 'axios';
import { injectable } from 'tsyringe';

@injectable()
export class ApiCommunityRepository implements CommunityRepository {
  async create(content: string, authorId: string): Promise<PrayTalk> {
    const requestBody: CreatePrayTalkRequestDto = { content, authorId };
    
    // 제네릭을 사용하여 응답 타입 명시
    const response = await axios.post<ApiResponse<CreatePrayTalkResponseDto>>('/api/pray-talks', requestBody);
    
    const data = response.data.data;
    return new PrayTalk(data.id, data.content, data.authorId, new Date(data.createdAt));
  }
}
```

#### Step 4: Presentation (UI 연결)
화면에서 사용할 훅(ViewModel)을 만듭니다.

**파일**: `src/presentation/community/usePrayTalkViewModel.ts`
```typescript
import { useState } from 'react';
import { CreatePrayTalkUseCase } from '@application/community/CreatePrayTalkUseCase';
import { container } from '@shared/container';

export function usePrayTalkViewModel() {
  const [isLoading, setIsLoading] = useState(false);
  // DI 컨테이너에서 유스케이스 주입받기
  const createUseCase = container.resolve(CreatePrayTalkUseCase);

  const create = async (content: string, authorId: string) => {
    try {
      setIsLoading(true);
      await createUseCase.execute(content, authorId);
      alert("기도제목이 등록되었습니다.");
    } catch (error) {
      alert(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return { create, isLoading };
}
```

#### Step 5: View (컴포넌트)
마지막으로 UI 컴포넌트에서 훅을 사용합니다.

```tsx
import { usePrayTalkViewModel } from '@presentation/community/usePrayTalkViewModel';

export function PrayTalkInput() {
  const { create, isLoading } = usePrayTalkViewModel();
  // ... UI 구현 ...
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
   npx expo start
   ```

In the output, you'll find options to open the app in a

- [development build](https://docs.expo.dev/develop/development-builds/introduction/)
- [Android emulator](https://docs.expo.dev/workflow/android-studio-emulator/)
- [iOS simulator](https://docs.expo.dev/workflow/ios-simulator/)
- [Expo Go](https://expo.dev/go), a limited sandbox for trying out app development with Expo
