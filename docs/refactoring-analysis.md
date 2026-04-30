# CBA Connect 리팩토링 분석 문서

> 작성일: 2026-04-27  
> 목적: 코드베이스 전반 파악 및 리팩토링 방향 논의

---

## 작업 이력

### 2026-04-27

#### ✅ 완료

- **`EmptyState` 공통 컴포넌트 생성** (`src/shared/components/empty-state/EmptyState.tsx`)
  - 카풀 홈 (신청 내역) 스타일 기준으로 통일
  - 아이콘 없음, `message` prop만 받는 단순 구조
- **`CarpoolHomeScreen`** — 신청 내역 / 모집글 empty 2곳 적용, 기존 `emptyText` 스타일 제거
- **`CarpoolHistoryScreen`** — empty 적용, 기존 `emptyWrapper` / `emptyCard` / `emptyText` 스타일 제거
- **`NoticeListScreen`** — empty 적용, 기존 `emptyCard` / `emptyText` 스타일 제거
- **카풀 홈 아이콘 iOS 클리핑 수정** — avatar 원형 컨테이너 내 👤 이모지 `lineHeight: 28` 적용 (Mac 환경에서 확인 필요)

#### 🔜 보류 / 추후 확인

- `lecture`, `retreat` 화면 empty state 여부 → Mac 환경에서 화면 확인 후 적용
- 카풀 홈 아이콘 iOS 클리핑 → Mac + 시뮬레이터로 실제 렌더링 확인 필요

---

## 1. 프로젝트 개요

### 기술 스택

| 분류 | 기술 | 버전 |
|------|------|------|
| 프레임워크 | React Native + Expo | RN 0.81.5 / Expo 54 |
| 언어 | TypeScript | ~5.9.2 |
| 라우팅 | Expo Router | ~6.0.22 |
| 상태관리 | Zustand | ^5.0.9 |
| 의존성 주입 | TSyringe | ^4.10.0 |
| HTTP 클라이언트 | Axios | ^1.13.2 |
| 지도 | react-native-maps | 1.20.1 |
| 알림 | expo-notifications | ~0.32.15 |
| 보안 저장소 | expo-secure-store | ^15.0.7 |

---

## 2. 아키텍처 구조

### 폴더 구조

```
src/
├── domain/           # 도메인 모델 & 인터페이스 (25개 파일)
│   ├── auth/
│   ├── carpool/
│   ├── user/
│   ├── lecture/
│   ├── notice/
│   └── retreat/
│
├── application/      # UseCase (43개)
│   ├── auth/
│   ├── carpool/
│   ├── user/
│   └── lecture/
│
├── infrastructure/   # Repository 구현체 + DTO (19개 파일)
│   ├── auth/
│   ├── carpool/
│   ├── api/          # Axios 설정, 인터셉터
│   └── notification/
│
├── features/         # UI 레이어 (기능별)
│   ├── auth/         # 로그인, 회원가입, 계정 찾기
│   ├── carpool/      # 카풀 홈, 등록, 수정, 상세, 히스토리
│   ├── lecture/      # 강의 목록, 상세
│   ├── home/
│   ├── my-page/
│   ├── notice/
│   └── retreat/
│
└── shared/           # 공용 모듈
    ├── api/          # API 클라이언트
    ├── di/           # DI 컨테이너 (TSyringe)
    ├── components/   # 공용 UI 컴포넌트
    ├── stores/       # 전역 상태 (Zustand)
    ├── hooks/        # 공용 훅
    ├── utils/        # 유틸리티
    └── constants/    # 색상, 폰트, 레이아웃
```

### 레이어 의존성 흐름

```
[UI / features]
      ↓
[application / UseCase]
      ↓
[domain / Interface]
      ↑
[infrastructure / Repository 구현체]
      ↓
[외부 API]
```

---

## 3. 주요 패턴 현황

### 잘 구현된 패턴 ✅

#### DDD 레이어 분리
- Domain / Application / Infrastructure 명확하게 분리
- 비즈니스 로직이 UseCase에 캡슐화됨

#### 의존성 주입 (TSyringe)
- Repository를 인터페이스로 주입 → 테스트 용이
- `container.resolve(XxxUseCase)` 패턴 일관성 있게 사용

#### 토큰 자동 갱신 (Axios 인터셉터)
- 401 응답 시 refresh 토큰으로 자동 재발급
- 갱신 중 대기 큐 처리로 동시 요청 안전하게 처리
- SecureStore를 통한 암호화 저장

#### ViewModel 훅 패턴
- 각 화면마다 `useXxxViewModel.ts` 분리
- UI 컴포넌트는 상태/로직을 몰라도 됨

#### Funnel 패턴 (회원가입)
- 다단계 회원가입을 `useFunnel` 훅으로 깔끔하게 추상화

#### 화면 포커스 기반 새로고침
- `useFocusEffect`로 뒤로가기 후 자동으로 최신 데이터 반영

---

## 4. 개선이 필요한 부분

### 🔴 P1 — 즉시 개선 필요

#### 4-1. `any` 타입 남용 (35곳 이상)

**현황**

```typescript
// ❌ ViewModel
const [carpool, setCarpool] = useState<any | null>(null);
const [allPosts, setAllPosts] = useState<any[]>([]);

// ❌ 유틸 함수
function getCarpoolCardStatus(post: any): { ... }
function toArray<T = any>(res: unknown): T[] { ... }

// ❌ 동적 import
let MapView: any = null;
```

**문제점**
- IDE 자동완성, 타입 추론 불가
- 런타임 에러가 컴파일 단계에서 잡히지 않음
- 리팩토링 시 영향 범위 파악 어려움

**개선 방향**
```typescript
// ✅ 명시적 타입 정의
const [carpool, setCarpool] = useState<CarpoolDetail | null>(null);
const [allPosts, setAllPosts] = useState<CarpoolPost[]>([]);

function getCarpoolCardStatus(post: CarpoolPost): CardStatusInfo { ... }
```

---

#### 4-2. 에러 처리 일관성 부족

**현황**
- Repository마다 `normalizeError()` 각자 구현 → 중복 코드
- UseCase는 에러를 그냥 `throw` → 처리 레이어 불명확
- View에서 `catch (error: any)` → `error.message` 직접 접근

```typescript
// ❌ Repository마다 중복
private normalizeError(error: unknown): Error {
  if (statusCode === 400 && message === "User already exists")
    return new Error("이미 존재하는 사용자입니다.");
  // ... 10개 케이스
}

// ❌ View에서 직접 처리
catch (error: any) {
  alert(error.message || '알 수 없는 오류');
}
```

**개선 방향**
```typescript
// ✅ 공통 AppError 타입 정의
interface AppError extends Error {
  code: ErrorCode;
  userMessage: string;
  statusCode?: number;
}

// ✅ ErrorHandler 중앙화
class ErrorHandler {
  static normalize(error: unknown): AppError { ... }
  static toUserMessage(error: AppError): string { ... }
}
```

---

#### 4-3. `console.log` 미정리 (~35개)

**현황**
- `src/infrastructure/auth/AuthRepository.ts`
- `src/shared/api/interceptors.ts` (요청마다 로깅)
- 각 ViewModel 파일들

**문제점**
- 배포 환경에서 불필요한 로그 출력
- 민감한 토큰/사용자 정보 노출 가능성

**개선 방향**
```typescript
// ✅ __DEV__ 가드 또는 Logger 추상화
const logger = {
  debug: (msg: string, data?: unknown) => {
    if (__DEV__) console.log(msg, data);
  },
  error: (msg: string, err?: unknown) => {
    if (__DEV__) console.error(msg, err);
  },
};
```

---

### 🟡 P2 — 순차적으로 개선

#### 4-4. API 엔드포인트 하드코딩

**현황**
```typescript
// ❌ Repository 곳곳에 문자열로 산재
await apiClient.get(`${API_PREFIX}/carpool/participating/${id}`);
await apiClient.post(`${API_PREFIX}/carpool/available`);
await apiClient.delete(`${API_PREFIX}/carpool/${id}`);
```

**개선 방향**
```typescript
// ✅ 엔드포인트 상수 파일 분리
const CARPOOL_API = {
  available: () => `${API_PREFIX}/carpool/available`,
  participating: (id: number) => `${API_PREFIX}/carpool/participating/${id}`,
  detail: (id: number) => `${API_PREFIX}/carpool/${id}`,
} as const;

await apiClient.get(CARPOOL_API.participating(id));
```

---

#### 4-5. DTO ↔ 도메인 매핑 중복

**현황**
- 각 Repository마다 `mapToXxx()` 메서드를 직접 구현
- 필드 구조 변경 시 여러 파일 수정 필요

**개선 방향**
```typescript
// ✅ Mapper 클래스 분리
class CarpoolMapper {
  static toDomain(dto: CarpoolResponseDto): CarpoolDetail { ... }
  static toCreateDto(data: CreateCarpoolData): CarpoolCreateRequestDto { ... }
}
```

---

#### 4-6. Repository 인터페이스 비대 (ISP 위반)

**현황**
```typescript
// ❌ ICarpoolRepository에 12개 메서드
export interface ICarpoolRepository {
  getAvailableCarpools(userId?: number): Promise<CarpoolDetail[]>;
  getParticipatingCarpools(userId: number): Promise<CarpoolDetail[]>;
  getAllCarpools(): Promise<Carpool[]>;
  createCarpool(data: CreateCarpoolData): Promise<Carpool>;
  getCarpoolById(id: number): Promise<Carpool>;
  getCarpoolDetail(id: number): Promise<CarpoolDetail>;
  findMyCarpools(userId: number): Promise<CarpoolDetail[]>;
  updateCarpool(id: number, data: UpdateCarpoolData): Promise<Carpool>;
  joinCarpool(userId: number, roomId: number): Promise<boolean>;
  leaveCarpool(userId: number, roomId: number): Promise<boolean>;
  deleteCarpool(id: number): Promise<boolean>;
  updateCarpoolStatus(roomId: number, status: CarpoolStatus): Promise<Carpool>;
}
```

**개선 방향**
```typescript
// ✅ 인터페이스 분리 (SOLID - ISP)
interface ICarpoolQueryRepository {
  getAvailable(userId?: number): Promise<CarpoolDetail[]>;
  getParticipating(userId: number): Promise<CarpoolDetail[]>;
  getById(id: number): Promise<CarpoolDetail>;
  findMine(userId: number): Promise<CarpoolDetail[]>;
}

interface ICarpoolCommandRepository {
  create(data: CreateCarpoolData): Promise<Carpool>;
  update(id: number, data: UpdateCarpoolData): Promise<Carpool>;
  delete(id: number): Promise<boolean>;
  join(userId: number, roomId: number): Promise<boolean>;
  leave(userId: number, roomId: number): Promise<boolean>;
  updateStatus(roomId: number, status: CarpoolStatus): Promise<Carpool>;
}
```

---

#### 4-7. 날짜 처리 수동 구현

**현황**
- `formatDateWithDay`, `toUtcISOStringFromKst` 등 수동 구현
- 타임존 변환 로직이 복잡하고 버그 가능성 높음

**개선 방향**
- `dayjs` 또는 `date-fns` 도입 검토
```typescript
// ✅ dayjs 예시
import dayjs from 'dayjs';
import 'dayjs/locale/ko';

const formatted = dayjs(date).locale('ko').format('YYYY-MM-DD(ddd)');
const utc = dayjs.tz(localDate, 'Asia/Seoul').utc().toISOString();
```

---

#### 4-8. Route 타입 안정성 부족

**현황**
```typescript
// ❌ as any 단언
router.push(`/lecture/${id}` as any);
router.replace('/' as any);
```

**개선 방향**
```typescript
// ✅ 타입 안전 라우팅 유틸
const Routes = {
  lecture: (id: number) => `/lecture/${id}` as const,
  carpool: (id: number) => `/carpool/${id}` as const,
  home: () => '/home' as const,
} as const;

router.push(Routes.lecture(id));
```

---

#### 4-9. Empty State (데이터 없음) 컴포넌트 미공통화

**현황**

빈 상태 UI가 화면마다 각자 구현되어 있고, 스타일도 제각각임

| 화면 | 컨테이너 스타일 | 텍스트 variant | 배경색 |
|------|----------------|----------------|--------|
| `CarpoolHomeScreen` (신청 내역) | `applicationCard` — border 있음, padding s | `text2` | `Color.secondary.main` |
| `CarpoolHomeScreen` (모집글) | `postCard` — shadow 있음, radius m | `text3` | `Color.secondary.main` |
| `CarpoolHistoryScreen` | `emptyCard` — shadow 있음, radius l, padding xl | `text2` | `Color.secondary.hover` |
| `NoticeListScreen` | `emptyCard` — border 있음, radius l, padding s | `text2` | `Color.secondary.main` |

```tsx
// ❌ CarpoolHomeScreen — 신청 내역 empty
<View style={styles.applicationCard}>
  <ThemedText variant="text2" style={styles.emptyText}>
    카풀 신청한 내역이 없습니다.
  </ThemedText>
</View>

// ❌ CarpoolHistoryScreen — 이력 empty (스타일 다름)
<View style={styles.emptyCard}>
  <ThemedText variant="text2" style={styles.emptyText}>
    카풀 이용한 이력이 없습니다.
  </ThemedText>
</View>

// ❌ NoticeListScreen — 공지 empty (또 다른 스타일)
<View style={styles.emptyCard}>
  <ThemedText variant="text2" style={styles.emptyText}>
    공지사항이 없습니다.
  </ThemedText>
</View>
```

**문제점**
- 동일한 목적의 UI가 화면마다 다르게 보임 (UX 일관성 저하)
- 빈 상태 디자인 변경 시 모든 화면 개별 수정 필요
- 각 화면 `styles.ts`에 `emptyCard`, `emptyText` 등 중복 스타일 정의

**개선 방향**

카풀 홈 (신청 내역) 스타일 기준으로 `src/shared/components/empty-state/` 에 공통 컴포넌트 생성

- `backgroundColor`: `Color.secondary.main`
- `borderWidth: 1`, `borderColor`: `Color.secondary.hover`
- `borderRadius`: `Layout.radius.l`
- 텍스트: `variant="text2"`, `color: Color.text.sub`, `textAlign: center`
- 그림자 없음

```tsx
// ✅ EmptyState.tsx
interface EmptyStateProps {
  message: string;
}

export function EmptyState({ message }: EmptyStateProps) {
  return (
    <View style={styles.container}>
      <ThemedText variant="text2" style={styles.message}>{message}</ThemedText>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Color.secondary.main,
    borderRadius: Layout.radius.l,
    borderWidth: 1,
    borderColor: Color.secondary.hover,
    paddingHorizontal: Layout.spacing.m,
    paddingVertical: Layout.spacing.s,
    alignItems: 'center',
  },
  message: {
    color: Color.text.sub,
    textAlign: 'center',
  },
});
```

```tsx
// ✅ 사용 예시
{carpools.length === 0 && (
  <EmptyState message="카풀 신청한 내역이 없습니다." />
)}

{notices.length === 0 && (
  <EmptyState message="공지사항이 없습니다." />
)}
```

**적용 완료 화면** (2026-04-27)
- `CarpoolHomeScreen` (2곳) ✅
- `CarpoolHistoryScreen` ✅
- `NoticeListScreen` ✅
- `lecture`, `retreat` — EmptySate 표현할 화면 없는 것으로 파악됨, 필요하면 추후 적용예정

---

### 🟢 P3 — 장기적 개선

#### 4-10. 푸시 알림 로직 분산

**현황**
- `InitializeNotification.ts`, `ExpoPushTokenProvider.ts`, `ExpoNotificationHandler.ts`, `ConfigureExpoChannels.ts` 각각 분리

**개선 방향**
```typescript
// ✅ NotificationService로 통합
class NotificationService {
  async initialize(): Promise<void> { ... }
  async registerToken(userId: number): Promise<void> { ... }
  async handleForeground(notification: Notification): Promise<void> { ... }
}
```

#### 4-11. 메모리 누수 가능성

**현황**
- 일부 `useFocusEffect`에 cleanup 함수 없음
- 비동기 작업 취소 미처리

**개선 방향**
- AbortController 도입 검토
- cleanup 함수 일관성 있게 추가

---

## 5. 종합 평가

| 항목 | 현재 등급 | 목표 등급 |
|------|-----------|-----------|
| 아키텍처 구조 | A | A |
| 타입 안정성 | C+ | B+ |
| 에러 처리 | C | B+ |
| API 설계 | B+ | A |
| 상태 관리 | B | B+ |
| 코드 정갈함 | C | B+ |
| 테스트 가능성 | A | A |

---

## 6. 리팩토링 우선순위 (제안)

| 순서 | 작업 | 예상 범위 |
|------|------|-----------|
| 1 | `any` 타입 제거 및 명시적 타입 정의 | `features/`, `shared/` 전반 |
| 2 | 에러 처리 중앙화 (`AppError`, `ErrorHandler`) | `infrastructure/`, `features/` |
| 3 | `console.log` 정리 및 Logger 도입 | 전체 |
| 4 | API 엔드포인트 상수화 | `infrastructure/` |
| 5 | DTO Mapper 분리 | `infrastructure/` |
| 6 | `EmptyState` 공통 컴포넌트 도입 ✅ | `shared/components/`, `features/` 전반 |
| 7 | Repository 인터페이스 분리 | `domain/`, `infrastructure/` |
| 8 | 날짜 유틸리티 라이브러리 도입 | `shared/utils/` |
| 9 | Route 타입 유틸 도입 | `shared/` |

---

## 7. 논의가 필요한 사항

- [ ] 1번 `any` 타입 제거 시, 도메인 모델 구조 변경이 수반될 수 있음 → 범위 협의 필요
- [ ] 에러 처리 방식 변경 시 기존 alert 기반 UX 개선 여부 검토
- [ ] `dayjs` / `date-fns` 중 라이브러리 선택
- [x] `EmptyState` 컴포넌트 스타일 기준 → 카풀 홈 (신청 내역) 스타일로 통일, 아이콘 없음
- [ ] `lecture`, `my-page`, `retreat` 등 나머지 화면에 empty state가 있는지 전수 확인 필요
- [ ] Repository 인터페이스 분리 시 DI 컨테이너 등록 방식 변경 필요
- [ ] 리팩토링 작업을 기능 개발과 병행할지, 별도 스프린트로 분리할지

---

---

## 8. 아키텍처 방향 논의 (2026-04-30)

> 현재 구조를 유지할지, 다른 아키텍처로 전환할지에 대한 논의 내용을 정리합니다.

---

### 고려한 아키텍처

#### A. 현재 구조 유지 (DDD / Clean Architecture)

```
src/
  domain/          # Entity, Repository 인터페이스
  application/     # UseCase
  infrastructure/  # Repository 구현체, DTO
  features/        # UI (screens, components, hooks)
  shared/          # 공용 모듈, DI 컨테이너
```

| 장점 | 단점 |
|---|---|
| 레이어 분리가 명확해 복잡한 비즈니스 로직 수용에 강함 | 단순 API 호출에도 파일 4~5개 필요 (과도한 보일러플레이트) |
| TSyringe DI로 Repository 교체·테스트 용이 | 백엔드 스펙 변경 시 수정 파일이 많음 |
| 팀에 백엔드 경험자가 있을 때 빠르게 이해 가능 | 초창기 앱에서는 구조 복잡도 대비 이득이 크지 않음 |

---

#### B. FSD (Feature-Sliced Design)

**정통 FSD 구조:**
```
src/
  pages/           # 화면 단위
  widgets/         # 복합 UI 블록
  features/        # 사용자 액션 단위 (auth-login, carpool-create 등)
  entities/        # 비즈니스 엔티티 (model/, api/)
  shared/          # 공용 모듈
```

| 장점 | 단점 |
|---|---|
| 프론트엔드 커뮤니티에서 인지도 높은 컨벤션 | React Native + Expo Router 환경과 충돌 (`app/` vs `pages/`) |
| 기능별 코드 응집도 높음 | UseCase 개념이 없어 복잡한 비즈니스 로직 수용이 어려움 |
| | TSyringe DI 패턴과 구조적으로 맞지 않음 |
| | 사실상 전면 재작성 수준의 마이그레이션 비용 |

> **결론:** React Native 앱에 정통 FSD를 강제 적용하는 건 이득보다 비용이 크다.

---

#### C. Zustand + React Query

```
src/
  features/
    auth/
      api.ts        # API 함수 (Repository + DTO 통합)
      queries.ts    # React Query 훅 (useQuery, useMutation)
      LoginScreen.tsx
      useLogin.ts   # ViewModel (대폭 단순화)
    carpool/
    ...
  shared/
    api/            # axios client
    stores/         # Zustand (클라이언트 상태만)
```

**핵심 개념:**
- **React Query** — 서버 상태 (API 호출, 캐싱, 로딩/에러 자동 처리)
- **Zustand** — 클라이언트 상태 (로그인 유저 등 UI 전역 상태)

**현재 구조와 비교:**

| 현재 | Zustand + React Query |
|---|---|
| `IAuthRepository` (인터페이스) | 제거 |
| `AuthRepository` (구현체) + `dto.ts` | `features/auth/api.ts` 하나로 통합 |
| `LoginUseCase` | `useMutation` 훅으로 대체 |
| `container.ts` DI 등록 | 제거 |
| ViewModel에서 수동 로딩/에러 state | `isPending`, `isError` 자동 제공 |

| 장점 | 단점 |
|---|---|
| 파일 수 절반 이하로 감소 | Repository 인터페이스가 없어 단위 테스트 어려워짐 |
| 로딩/에러/캐싱 자동 처리 | TSyringe 제거로 DI 이점 상실 |
| 백엔드 스펙 변경 시 `api.ts` 하나만 수정 | |
| 초창기 빠른 기능 개발에 유리 | |
| 데이터 캐싱으로 불필요한 API 재호출 제거 | |

---

### 아키텍처별 적합한 상황

| 구조 | 적합한 상황 |
|---|---|
| DDD / Clean Architecture | 복잡한 도메인 규칙, 대규모 팀, 장기 유지보수 |
| FSD | 웹 프론트엔드, 대형 팀, 페이지 단위 분업 |
| Zustand + React Query | 초창기 앱, 잦은 스펙 변경, 데이터 패칭 중심 앱 |

---

### 이 앱의 특성

- **초창기 앱** — 백엔드 스펙이 아직 유동적
- **기능 성격** — 카풀, 공지, 강의, 수련회 등 복잡한 도메인 규칙보다 **데이터 패칭 중심**
- **복잡도 방향** — 비즈니스 로직보다 UI/데이터 패칭이 복잡해질 가능성이 높음

---

### 추천 방향

**Zustand + React Query 전환을 권장합니다.**

현재 UseCase 대부분이 Repository를 단순 통과하는 수준이라, DDD 구조의 복잡도가 이득을 정당화하지 못합니다. 이 앱의 복잡도는 도메인 규칙보다 데이터 패칭 쪽에 있을 가능성이 높고, React Query는 이 부분에서 현재 구조보다 명확히 우위입니다.

단, **전환 시점은 백엔드 스펙이 어느 정도 안정된 이후**가 적절합니다. 지금 당장 마이그레이션하면 진행 중인 기능 개발이 지연될 수 있습니다.

**현실적인 단계:**
1. 백엔드와 API 스펙 논의 완료
2. 핵심 기능 1~2개를 Zustand + React Query로 먼저 전환해보며 팀 적응
3. 이후 점진적으로 나머지 도메인 전환

---

*이 문서는 논의 과정에서 지속적으로 업데이트됩니다.*
