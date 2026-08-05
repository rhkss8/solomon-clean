# 솔로몬 종합청소업체

전국 청소·폐기물 서비스, 가격안내, 작업사례, 블로그 후기와 무료견적을 제공하는 회사 홈페이지입니다.

## 다른 컴퓨터에서 시작

```bash
git clone https://github.com/rhkss8/solomon-clean.git
cd solomon-clean
nvm install
nvm use
corepack enable
pnpm install --frozen-lockfile
cp .env.example .env
zsh scripts/install-project-codex.zsh
pnpm dev
```

그다음 상태를 확인합니다.

```bash
./tars doctor
./tars status
./tars next
```

Codex에는 다음과 같이 요청합니다.

```text
TARS 기준으로 현재 상태를 확인하고 다음 todo를 이어서 진행해줘.
```

## 명령

```bash
pnpm dev
pnpm typecheck
pnpm lint
pnpm test
pnpm build
./tars handoff
```

## 환경변수

실제 키와 연락처는 `.env`에만 저장하고 커밋하지 않습니다. 새 컴퓨터에서는 `.env.example`을 복사한 후 로컬 값을 입력합니다. 개발 서버는 `http://localhost:3002`에서 실행됩니다.

## 작업 종료와 이동

다른 컴퓨터로 옮기기 전에:

```bash
./tars handoff
git status
git add .
git commit -m "feat: 작업 내용"
git push
```

다른 컴퓨터에서는 `git pull` 후 `./tars doctor`, `./tars next` 순서로 이어갑니다.

## 현재 구현 범위

홈, 서비스 전체/상세, 가격안내, 후기, 작업사례, 회사소개, 무료견적,
정책 페이지와 SEO 기반(sitemap, robots, JSON-LD)이 구성되어 있습니다.
전화·이메일·카카오 ID는 중앙 설정에 반영되어 있습니다. 카카오 상담방 URL,
운영 도메인과 이메일 발송 키는 `.env` 및 호스팅 환경변수로 연결합니다. 다음 작업 우선순위는
[`docs/mvp-todo.md`](./docs/mvp-todo.md)에 기록합니다.

현재 서버 패키지는 Vercel Marketplace Postgres의 `POSTGRES_URL`과 비공개 Vercel Blob의 `BLOB_READ_WRITE_TOKEN`을 사용합니다. 실제 배포는
사용자가 Vercel에서 진행하므로 Vercel용 데이터베이스·파일 저장소 연결 여부를 배포 전에
확인해야 합니다. 운영 도메인, 이메일 발송 키와 법적 고지는 출시 전 External Launch
Inputs를 모두 확정한 뒤 활성화합니다.
