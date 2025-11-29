# Domain Shared

이 폴더는 여러 도메인에서 공통적으로 사용되는 도메인 로직을 포함합니다.

## 포함될 수 있는 것들
- **Value Objects**: `Email`, `PhoneNumber` 등 여러 엔티티에서 재사용 가능한 값 객체.
- **Base Entities**: 모든 엔티티가 상속받는 기본 클래스 (예: `BaseEntity`).
- **Domain Events**: 도메인 이벤트 정의.
- **Errors**: 도메인 계층에서 발생하는 공통 에러 정의.
