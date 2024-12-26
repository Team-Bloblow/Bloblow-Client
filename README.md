<h1 style="font-size: 2em; font-weight: bold; background: linear-gradient(90deg, #00684A, #009F55 50%, #00ED64); -webkit-text-fill-color: transparent; -webkit-background-clip: text; 
">Bloblow</h1>

<div align="center">
  <p>
    <b>블로그를 불러오다. 블로블로</b><br/>
    <b>특정 키워드 및 키워드 그룹에 대한 네이버 블로그 게시물 분석 서비스</b>
  </p>
  <a href="https://github.com/Team-Bloblow/Bloblow-Client">클라이언트 </a> | <a href="https://github.com/Team-Bloblow/Bloblow-Server">서버 </a> | <a href="https://github.com/Team-Bloblow/Bloblow-puppeteer">크롤링 서버 </a>
</div>

## 1. 개요

### Bloblow란?

> **특정 키워드에 대한 네이버 블로그 게시물 분석**

- 프로덕트에 대한 네이버 블로거들의 게시물과 여러 지표 등을 확인할 수 있는 서비스
- 구독하는 키워드에 대해 네이버 블로그 API로 당일 블로그를 선별 후, 필요한 데이터를 모두 크롤링하여 사용자에게 유용한 포맷으로 정보 제공
- 기존에 프로덕트에 대한 대중들의 목소리와 반응을 살펴야 했던 직군의 불편한 점
  - 프로덕트에 대한 블로그 게시물 및 경쟁사 블로그 게시물을 직접 돌아다니며 지표 등을 비교해야 했음
  - 해당 블로그 게시물이 광고글인지 아닌지 본문 전체 확인

### 기술 스택

**Front End**

- React
- chart.js
- vite

**React Used**

- React-query
- zustand
- tailwindcss
- react-router-dom

**Back End**

- Node.js
- express
- mongodb
- mongoose

**Crawling Used**

- Puppeteer

**Etc**

- Firebase-authentication

(기술 스택 관계도 다이어그램 넣을 예정)

### 팀 소개

<table>
  <tbody>
    <tr>
      <td align="center">
        <a href="https://github.com/SsongQ-92" target="_blank">
          <img width=200px src="https://avatars.githubusercontent.com/u/122101706?v=4" alt=""/>
        </a>
      </td>
      <td align="center">
        <a href="https://github.com/jin-ttao" target="_blank">
          <img width=200px src="https://avatars.githubusercontent.com/u/133551021?v=4" alt=""/>
        </a>
      </td>
      <td align="center">
        <a href="https://github.com/only-pine" target="_blank">
          <img width=200px src="https://avatars.githubusercontent.com/u/65760535?v=4" alt=""/>
        </a>
      </td>
    </tr>
    <tr>
      <td align="center">
        <a href="https://github.com/SsongQ-92" target="_blank">
          <sub><b>송규경</b></sub><br />
        </a>
      </td>
      <td align="center">
        <a href="https://github.com/jin-ttao" target="_blank">
          <sub><b>송진태</b></sub><br />
        </a>
      </td>
      <td align="center">
        <a href="https://github.com/only-pine" target="_blank">
          <sub><b>장한솔</b></sub><br />
        </a>
      </td>
    </tr>
  </tbody>
</table>

## 2. 프로젝트 특징

### 기능

- 키워드를 하나의 공통 그룹으로 묶어 각각의 데이터 지표에 대해 차트로 비교
- 게시물 리스트를 최신순, 공감순, 댓글수순으로 정렬
- 특정 단어가 포함된 게시물을 불러오거나 제외하는 필터링 적용
- 광고 게시물과 광고가 아닌 게시물 구분

### Front-end

- (회원가입, 로그인)
  - firebase authentication의 구글 OAuth로 로그인 진행
- 그룹 이름 수정 기능
  - React Query를 활용한 `Optimistic Updates`로 실시간 반영의 UX 제공
  - (코드)
- (등등)

### Back-end

- (API 명세)
- (데이터베이스 구조 다이어그램(Entity Relationship Diagram))

## 3. 개발 과정

### 겪은 문제

- (겪었던 문제 및 시도, 해결 과정)
- (또는 해결 중이라면 쉽게 해결하지 못한 이유, 해결되지 않는 이유에 대한 가정)
- (또는 해결하지 못하여 택한 다른 방법 등)

### 피드백 반영 및 개선 과정

- (전체적 UI)
  - (프로젝트 타겟층과 컨셉을 고려하여 전문성이 묻어나는 디자인으로 색감과 레이아웃 수정)

### 아쉬운 점

- (개발 측면)
- (서비스 측면)

## 4. 회고

### 성과

- (배포 후 Google Analytics 등을 연결하여 실제 유저들의 반응 등 작성)

### 향후 확장 계획

- (추후 추가 구현할 기능)
- (리팩토링 또는 최적화 예정 기능 등)

### 인사이트

- (기술적으로 배운점 등)
- (협업과정에서 배운점 등)

## 5. 협업 룰

### Git Rule

- (타입과 메시지 구조)

### Branch Rule

- 과정
  - dev 의 최신 commit에서 각자 작업 브랜치 생성
  - 작업 수행 후 commit하여 dev branch에 pull request
- (브랜치명)

### 회의록

### WIKI
