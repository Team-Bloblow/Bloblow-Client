<h1 style="font-size: 2em; font-weight: bold; background: linear-gradient(90deg, #00684A, #009F55 50%, #00ED64); -webkit-text-fill-color: transparent; -webkit-background-clip: text; 
">Bloblow</h1>

<div align="center">
  <p>
    <b>블로그를 불러오다. 블로블로</b><br/>
    <b>특정 키워드에 대한 네이버 블로그 게시물 분석 서비스</b>
  </p>
  <a href="https://github.com/Team-Bloblow/Bloblow-Client">클라이언트 </a> | <a href="https://github.com/Team-Bloblow/Bloblow-Server">서버 </a> | <a href="https://github.com/Team-Bloblow/Bloblow-puppeteer">크롤링 서버 </a>
</div><br/>

# 1. Motivation

<details>
<summary><b>블로그 검색 결과에 대해 사용자가 일일이 게시물을 읽고 유용한 글을 선별하는 과정이 번거롭지 않을까?</b></summary>
<div markdown="1">

<br/>

주 타겟층인 `브랜드 마케터`는 바쁩니다. 우리가, 그리고 사용자가 Bloblow 웹 애플리케이션에 기대하는 바는, 네이버 블로그를 통해 볼 수 있는 국내 시장 및 소비자 선호도 등을 보다 효율적으로 이해하는 것입니다. Bloblow를 사용함에도 여전히 직접 게시물에 들어가 글을 모두 읽고 선별하는 과정을 가진다면, 우리가 의도한대로 서비스가 제 기능과 역할을 하지 못하는 것이라고 생각했습니다. 크롤링으로 수집한 게시물 본문 HTML 태그 및 코드를 활용해서, 사용자가 설정한 키워드를 올바르게 분석하고 여러 키워드들을 비교하는 시도를 해보았습니다. 특히 개별 게시물을 클릭하지 않고도, 가공된 핵심 정보를 list view 만으로 파악할 수 있는 UX가 바쁜 사용자의 문제를 해결할 수 있다고 판단했습니다.

</div>
</details>

<br/>

<details>
<summary><b>직접 네이버 블로그를 검색하는 것과 차별성을 두고 서비스 이용에 대한 만족도도 높이려면 어떻게 해야할까?</b></summary>
<div markdown="1">

<br/>

> 블로그 검색 결과를 2차 가공한 정보를 제공해서 사용자의 시간을 아껴주자.

### 1. 게시물/광고글/공감/댓글 수 추이, 키워드간 트렌드 비교

전반적인 소비자 반응을 파악할 수 있도록 시간에 따른 구체적인 지표를 제공합니다. 실제 업무에서 근거자료로 활용될 수 있기 때문에, 해당 지표는 수치로 증명 가능한 정보입니다. 차트 또한, 사용자가 업무 과정에서 작성할 리포트에 바로 첨부하여 사용할 수 있도록 UI를 구성하였습니다.

일별로 저장된 데이터를 어떻게 주간, 월간으로 차트를 보여줬나? (로직에 대한 부연설명 추가)

### 2. 설정한 키워드의 게시물에 대한 필터링 및 정렬

블로블로를 통해 공감 혹은 댓글이 많은 순으로 게시물을 정렬할 수 있습니다. 그리고 특정 단어가 포함되거나 제외되는 게시물들만 모아서 볼 수 있습니다. 또한, 광고 칩을 통해 게시물이 광고를 목적으로 작성된 게시물 임을 알 수 있습니다. 

### 3. 비교: 네이버 블로그 검색과 블로블로

네이버 블로그 검색은 일반 대중을 타겟으로 합니다. 블로블로(Bloblow)의 주요 타겟은 "브랜드 마케터"입니다. 따라서, 블로블로는 `자사 브랜드 및 경쟁사/유사 브랜드 모니터링`이라는 특정 목적으로 사용자가 서비스를 이용한다는 맥락이 가장 큰 차이점입니다.

<br/>

|   | 네이버 블로그 검색 | 블로블로 |
| - | ------------- | ------ |
| **탐색 목적**| 니즈를 충족하는 게시물을 1개라도 발견하면 대체로 문제가 해결됩니다. | 전반적인 동향이 궁금합니다. 포스팅 되는 게시물의 수, 경쟁 브랜드가 언급되는 수 트렌드를 수치로 확인하고 비교할 수 있기를 기대합니다. |
| **탐색 과정**| 개인적인 이유, 계기로 검색을 이용합니다. 시간이 걸리더라도 합리적 결정이 중요하며 급하지 않습니다. 맛집이나 제품을 찾고 있다면, 구매후기를 꼼꼼히 살피며 여러 옵션을 비교합니다. | 내 회사 업무와 관련되며 개인적인 검색 보다 책임이 무겁고 기한이 정해져있습니다. 제품/마케팅 액션 아이템을 결과물로 도출할만한 인사이트를 발견할 수 있어야 합니다. 숫자로도 증명 가능해야 합니다. |

</div>
</details>

<br/>

- 프로덕트에 대한 소비자들의 게시물과 선호도 및 반응으로 활용 가능한 여러 지표 등을 확인할 수 있는 서비스
- 구독하는 키워드에 대해 네이버 블로그 API로 블로그를 선별 후, 크롤링(crawling) 및 스크래핑(scraping)을 통하여 사용자에게 필요한 데이터를 유용한 포맷으로 제공
- 기존에 대중들의 목소리와 반응을 살펴야 했던 직군의 불편함 해소의 목적
  - 프로덕트에 대한 블로그 게시물 및 경쟁사 블로그 게시물을 직접 지표화 하여 비교해야 했음
  - 해당 블로그 게시물이 광고글인지를 구분하기 위해 본문 전체 확인

# 2. Feature / Preview

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
