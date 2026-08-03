# 솔로몬 종합청소업체 디자인 방향

## 선택 방향

`신뢰할 수 있는 해결사`를 기반으로 한 현대적인 레드·차콜 브랜드.

기존 명함의 빨강과 검정은 브랜드 인지 자산으로 유지한다. 기존 명함의 높은 채도, 과도한 굵기, 좁은 간격, 노랑·파랑 보조색 혼용, 정보 과밀은 계승하지 않는다.

## 시각 성격

전문적이고, 정직하고, 신속하며, 안정적이어야 한다.

다음처럼 보이지 않아야 한다.

- 저가 전단지
- 긴급 출동 광고
- 공업용 장비 판매사
- 지나치게 무겁고 위협적인 특수청소 업체
- 가볍고 장식적인 생활 앱

## 컬러 토큰

```css
:root {
  --color-brand-primary: #d4362e;
  --color-brand-primary-hover: #b92a24;
  --color-brand-primary-soft: #fbe9e7;

  --color-brand-ink: #17191c;
  --color-brand-charcoal: #292d32;
  --color-brand-slate: #5f6872;

  --color-background: #f8f7f5;
  --color-surface: #ffffff;
  --color-surface-subtle: #f0f1f2;
  --color-border: #dde0e3;

  --color-text-primary: #17191c;
  --color-text-secondary: #4f565e;
  --color-text-muted: #777f87;

  --color-success: #167a5b;
  --color-warning: #b86a00;
  --color-danger: #c92a2a;
  --color-focus: #3867d6;
  --color-kakao: #fee500;
}
```

### 사용 비율

- 배경과 여백 70%
- 차콜·텍스트·구조 20%
- 브랜드 레드 10%

레드는 모든 영역을 칠하는 배경색이 아니라 핵심 CTA, 선택 상태, 숫자 강조, 짧은 브랜드 모티프에 사용한다.

카카오 노랑은 카카오톡 CTA에서만 사용한다. 브랜드 레드와 경쟁하지 않도록 한 화면에서 반복 사용하지 않는다.

## 임시 로고

- 아이콘을 새로 복제하지 않고 텍스트 워드마크로 시작
- `솔로몬`을 차콜의 굵은 글자
- `종합청소업체`를 작은 보조 텍스트 또는 레드 포인트
- 최종 로고 파일이 오면 `BrandLogo` 컴포넌트와 브랜드 설정 한 곳에서 교체
- 헤더, 푸터, 모바일 메뉴, 파비콘, OG 이미지가 동일한 브랜드 설정을 참조

## 타이포그래피

- 한글 기본: Pretendard Variable
- 제목: 700~800
- 본문: 400~500
- 버튼: 600~700
- 자간: 기본 0
- 긴 제목은 굵기와 크기로 강조하고 빨간 글자를 남발하지 않음

## 형태와 레이아웃

- 카드 반경: 8px
- 버튼 반경: 6~8px
- 과도한 캡슐형 UI 금지
- 테두리와 여백으로 그룹을 만들고 그림자는 최소화
- 작업사진은 모서리를 과도하게 둥글리지 않음
- 전후 사진은 동일 비율과 동일 크롭 규칙 사용

## 첫 화면

첫 화면에서 3초 안에 다음이 보여야 한다.

1. 전국 종합청소 서비스
2. 어떤 문제를 해결하는지
3. 무료견적 또는 전화/카카오 상담
4. 실제 작업사진 또는 명확한 작업사례 진입점

## 브랜드 교체 구조

```ts
type BrandConfig = {
  name: string
  shortName: string
  logo: {
    mode: "wordmark" | "image"
    lightSrc?: string
    darkSrc?: string
    alt: string
  }
  colors: {
    primary: string
    ink: string
  }
}
```

페이지에서 로고 파일이나 색상값을 직접 참조하지 않는다. 모든 화면은 브랜드 설정과 의미 기반 CSS 토큰만 사용한다.
