# 견적 질문 설정

견적 화면의 서비스별 질문은 `questions.ts`에서만 관리합니다. UI 컴포넌트에는 질문 문구나 선택지를 직접 추가하지 않습니다.

## 서비스 추가 절차

1. `src/domain/site.ts`의 `services`에 서비스를 추가합니다.
2. `questionsByService`에 같은 slug의 질문 배열을 추가합니다.
3. 모든 서비스에 공통으로 필요한 질문은 `commonEstimateQuestions`에 추가합니다.
4. `pnpm run build`로 타입과 전체 질문 흐름을 확인합니다.

`questionsByService`는 `Record<ServiceSlug, ...>`로 검사됩니다. 서비스만 추가하고 질문지를 빠뜨리거나 존재하지 않는 slug를 사용하면 TypeScript 빌드가 실패합니다.

## 질문 타입

- `single`: 하나만 선택
- `multiple`: 여러 개 선택
- `text`: 직접 입력

각 서비스 내부에서 질문 `id`는 중복되지 않게 유지합니다. 접수 시 `prompt: answer` 형식으로 상담 설명에 저장되므로 이미 운영 중인 질문의 `id`는 특별한 이유 없이 변경하지 않습니다.
