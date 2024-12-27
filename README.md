<h1 style="font-size: 2em; font-weight: bold; background: linear-gradient(90deg, #00684A, #009F55 50%, #00ED64); -webkit-text-fill-color: transparent; -webkit-background-clip: text;
">Bloblow</h1>

<div align="center">
  <p>
    <b>블로그를 불러오다. 블로블로</b><br/>
    <b>특정 키워드에 대한 네이버 블로그 게시물 분석 서비스</b>
  </p>
  <a href="https://github.com/Team-Bloblow/Bloblow-Client">클라이언트 </a> | <a href="https://github.com/Team-Bloblow/Bloblow-Server">서버 </a> | <a href="https://github.com/Team-Bloblow/Bloblow-puppeteer">크롤링 서버 </a>
</div>

<br/>

<div align="center">
  <img width="70%" src="/public/assets/docs-preview-home.png" alt="preview-home"/>
</div>

<br/>

목차

1. [Motivation](https://github.com/Team-Bloblow/Bloblow-Client/tree/dev?tab=readme-ov-file#1-motivation)
2. [Feature / Preview](https://github.com/Team-Bloblow/Bloblow-Client/tree/dev?tab=readme-ov-file#2-feature--preview)
3. [Development](https://github.com/Team-Bloblow/Bloblow-Client/tree/dev?tab=readme-ov-file#3-development)
4. [User Experience](https://github.com/Team-Bloblow/Bloblow-Client/tree/dev?tab=readme-ov-file#4-user-experience)
5. [Optimization](https://github.com/Team-Bloblow/Bloblow-Client/tree/dev?tab=readme-ov-file#5-optimization)
6. [Feedback / Improvement](https://github.com/Team-Bloblow/Bloblow-Client/tree/dev?tab=readme-ov-file#6-feedback--improvement)
7. [Tech Stack](https://github.com/Team-Bloblow/Bloblow-Client/tree/dev?tab=readme-ov-file#7-tech-stack)
8. [Team Work / Collabration Rule](https://github.com/Team-Bloblow/Bloblow-Client/tree/dev?tab=readme-ov-file#8-team-Work--collabration-rule)
9. [Project Review](https://github.com/Team-Bloblow/Bloblow-Client/tree/dev?tab=readme-ov-file#9-team-Work-collabration-rule)

<br>
<br>

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

> [방향성] <br> 블로그 검색 결과를 2차 가공한 정보를 제공해서 사용자의 시간을 아껴주자.

### 1. 게시물/광고글/공감/댓글 수 추이, 키워드간 트렌드 비교

전반적인 소비자 반응을 파악할 수 있도록 시간에 따른 구체적인 지표를 제공합니다. 실제 업무에서 근거자료로 활용될 수 있기 때문에, 해당 지표는 수치로 증명 가능한 정보입니다. 차트 또한, 사용자가 업무 과정에서 작성할 리포트에 바로 첨부하여 사용할 수 있도록 UI를 구성하였습니다.

### 2. 설정한 키워드의 게시물에 대한 필터링 및 정렬

블로블로를 통해 공감 혹은 댓글이 많은 순으로 게시물을 정렬할 수 있습니다. 그리고 특정 단어가 포함되거나 제외되는 게시물들만 모아서 볼 수 있습니다. 또한, 광고 칩을 통해 게시물이 광고를 목적으로 작성된 게시물 임을 알 수 있습니다.

### 3. 비교: 네이버 블로그 검색과 블로블로

네이버 블로그 검색은 일반 대중을 타겟으로 합니다. 블로블로(Bloblow)의 주요 타겟은 "브랜드 마케터"입니다. 따라서, 블로블로는 `자사 브랜드 및 경쟁사/유사 브랜드 모니터링`이라는 특정 목적으로 사용자가 서비스를 이용한다는 맥락이 가장 큰 차이점입니다.

<br/>

|               | 네이버 블로그 검색                                                                                                                                                               | 블로블로                                                                                                                                                                                         |
| ------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| **탐색 목적** | 정확하고 원하던 게시물 1개라도 발견하면 대체로 니즈, 문제가 해결됩니다.                                                                                                          | 전반적인 동향이 궁금합니다. 포스팅 되는 게시물의 수, 경쟁 브랜드가 언급되는 수 트렌드를 수치로 확인하고 비교할 수 있기를 기대합니다.                                                             |
| **탐색 과정** | 개인적인 이유, 계기로 검색을 이용합니다. 시간이 걸리더라도 합리적 결정이 중요하며 급하지 않습니다. 맛집이나 제품을 찾고 있다면, 구매후기를 꼼꼼히 살피며 여러 옵션을 비교합니다. | 내 회사 업무와 관련되며 개인적인 검색 보다 책임이 무겁고 기한이 정해져있습니다. 제품/마케팅 액션 아이템을 결과물로 도출할만한 인사이트를 발견할 수 있어야 합니다. 숫자로도 증명 가능해야 합니다. |

</div>
</details>

<br/>

<br/>

# 2. Feature / Preview

### 기능

- 키워드 구독
  - 키워드를 하나의 그룹으로 묶어 각각의 데이터 지표와 통계 차트를 제공합니다.
- 게시물 조회 (정렬/필터)
  - 구독한 키워드의 블로그 게시물 리스트를 최신순, 공감순, 댓글 수 순으로 정렬할 수 있습니다.
  - 게시물 중 광고글을 분류하거나, 특정 단어가 포함된 게시물을 불러오거나 제외할 수 있습니다.

<br>

### 미리보기

키워드 대시보드

<div align="center">
  <img width="100%" src="/public/assets/docs-preview-keyword-chart.png" alt="preview-keyword-chart"/>
</div>

그룹 대시보드 / 키워드 게시물 목록

<div align="left" width="50%">
  <img src="/public/assets/docs-preview-group.png" alt="preview-group"/>
</div>
<div align="right" width="50%">
  <img src="/public/assets/docs-preview-post-list.png" alt="preview-post-list"/>
</div>

<br>

# 3. Development

## 네이버 블로그 게시물을 어떻게 가져올 수 있을까?

저희는 블로그 게시물 본문을 통해 키워드 언급 여부 뿐만 아니라 게시물의 다른 정보들도 활용하여 사용자에게 인사이트를 제공하는 것을 서비스의 주된 목적으로 설정했습니다.

게시물 본문을 확보하기 위해 네이버 검색 API를 사용하려 했으나 API를 통해선 본문 전체가 아닌 본문 내에서 키워드가 언급된 특정 부분만 전달해준다는 것을 파악하게 되었습니다. 그렇기 때문에 크롤링을 사용하여 본문 뿐만 아니라 댓글 수, 공감 수 등과 같은 부가 정보도 함께 파악하여 활용하기로 했습니다.

puppeteer를 사용하여 API를 통해 전달받은 게시물의 링크로 게시물 본문을 크롤링하는 방법으로 구현했습니다. 하지만 본문 전체를 크롤링하기 위해 본문 전체를 감싸고 있는 선택자의 innerText를 파악하려했으나 null이 반환되는 문제가 발생했습니다.

- 컨텐츠가 완전히 로딩되기 전에 선택자의 innerText 파악하는 것.
- 선택자 스펠링을 틀린 것.

문제 상황에 대해 위와 같은 가정을 하였고, 컨텐츠의 로딩이 완료된 후에 선택자의 innerText를 파악하거나 선택자 스펠링을 다시 확인해봤으나 결과는 동일했습니다. API로 전달받은 블로그 게시물 링크를 통해 게시물의 HTML을 다시 파악해보니, 아래 첨부 이미지처럼 게시물 자체가 iframe 태그를 통해 표시되고 있단 것을 파악하게 되었습니다.

<div align="center">
  <img width="100%" src="/public/assets/3-1-1.png" alt=""/>
</div>

iframe 태그의 src 속성 값으로 게시물의 새로운 URL이 할당되어 있고, 네이버 블로그 주소 뒤에 해당 URL을 붙이면 동일한 게시물이 표시되며, 아래와 같이 iframe에 감싸여 있지 않은 구조인 것 또한 확인했습니다.

<div align="center">
  <img width="100%" src="/public/assets/3-1-2.png" alt=""/>
</div>

초기 로직에서 아래와 같은 로직으로 수정하였습니다.

1. 네이버 검색 API를 통해 블로그 게시물의 링크 파악
2. puppeteer를 통해 해당 게시물 링크로 이동
3. 해당 게시물 내 iframe의 src 속성의 URL 파악
4. 파악한 URL로 이동
5. 해당 페이지에서 게시물의 본문 파악

저희는 본문 뿐만 아니라 댓글과 공감 수와 같은 부가 정보 또한 추출하여 사용자에게 더 많은 인사이트를 제공드리려고 합니다.

## 서버 상태는 어떻게 관리할 수 있을까? 우리는 왜 React Query를 도입했는가?

팀 프로젝트를 시작하며, 우리는 코드를 효율적이고 통일된 방식으로 작성하고, 유저에게 자연스러운 UI를 노출시키는 방법을 고민했습니다. 이러한 고민은 서버와의 비동기 통신(HTTP 통신)에서도 마찬가지였습니다. 구체적으로는 크롤링 및 스크래핑 작업에서의 로딩 상태, 성공 여부, 실패 여부를 어떻게 일관성 있게 관리할지, 그룹 생성 후 그룹 리스트 데이터를 어떻게 서버와 자연스럽게 동기화할지 등이 있었습니다.

- React Query 사용 전의 API 요청 상태 관리

```tsx
const [isLoading, setIsLoading] = useState(false);
const [isSuccess, setIsSuccess] = useState(false);
const [isError, setIsError] = useState(false);
const [data, setData] = useState(null);
const [error, setError] = useState(null);

const fetchData = async (...args) => {
  setIsLoading(true);
  setIsSuccess(false);
  setIsError(false);
  setData(null);
  setError(null);

  try {
    const response = await apiFunction(...args);

    if (response.ok) {
      const result = await response.json();

      setData(result);
      setIsSuccess(true);
    } else {
      const errorMessage = await response.text();

      throw new Error(`Error ${response.status}: ${errorMessage}`);
    }
  } catch (error) {
    setIsError(true);
    setError(error.message);
  } finally {
    setIsLoading(false);
  }
};
```

- 페이지(라우트)가 로드될 시, 바로 보여주고 싶은 데이터가 있는 경우

```tsx
useEffect(() => {
  const fetchData = async () => {
    try {
      const response = await apiFunction();

      if (response.ok) {
        const parsedResponse = await response.json();
        setData(parsedResponse); // setter 실행으로 리렌더링 트리거
      } else {
        console.error(`Error: ${response.status}`);
      }
    } catch (error) {
      console.error(`Fetch error: ${error.message}`);
    }
  };

  fetchData();
}, []);
```

- DB mutation 이후, 서버 데이터 동기화의 경우

```tsx
const handleButtonClick = async (mutationPayload) => {
  try {
    const response = await fetch("/api/mutate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(mutationPayload),
    });

    if (response.ok) {
      fetchData(); // Mutation 성공 후 서버 데이터 동기화
    } else {
      console.error(`Mutation error: ${response.status}`);
    }
  } catch (error) {
    console.error(`Mutation error: ${error.message}`);
  }
};
```

React Query를 도입하지 않았다면, 위와 같이 API 요청 핸들링을 위해 직접 커스텀 훅을 작성하거나, 매번 새로운 서버 상태(Server State)를 수동으로 관리해야 했을 것입니다. 이러한 방식은 비슷한 로직의 반복으로 코드 중복을 야기할 수 있습니다. 또한, 여러 상태의 초기화 및 에러 처리, 로딩 상태 관리 등의 작업은 꽤 번거롭습니다. 페이지가 로드되거나 특정 컴포넌트가 마운트 될 때, 유저에게 즉각적으로 보여주고 싶은 데이터가 있다면, useEffect를 사용해 데이터를 불러와야 합니다. 그리고 특정 mutation 요청이 완료된 직후 서버 데이터를 다시 가지고 오려면 위와 같이 조건에 따른 추가적인 로직을 작성해야만 합니다.

React Query를 도입함으로써 우리는 중복된 코드와 상태를 줄이며 서버 상태를 관리할 수 있었습니다. 특히, 데이터베이스에서의 Create/Update/Delete와 같은 mutation 작업 후에도 간단히 최신 데이터를 동기화(fetching)하거나, 에러 처리하는 코드를 작성할 수 있었습니다.

- 요청 상태 관리 간소화 (실제 코드)

```tsx
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const asyncGetUserGroup = async (userUid) => {
  const fetchInfo = {
    url: `${API_BASE_URL}/groups/${userUid}`,
    params: "",
  };

  const response = await fetchHandler(fetchInfo);

  return response;
};

const UserGroupCardList = () => {
  const setUserGroupList = useBoundStore((state) => state.setUserGroupList);
  const userUid = useBoundStore((state) => state.userInfo.uid);
  const hasUserUid = !!userUid;

  **const { data: userGroupList, isError } = useQuery({
    queryKey: ["userGroupList", userUid],
    queryFn: () => asyncGetUserGroup(userUid),
    enabled: hasUserUid,
  });**

  if (isError || userGroupList?.message?.includes("Error occured")) {
    return (
      <div className="flex flex-center w-full h-full">
        에러가 발생하였습니다. 잠시 후 다시 시도해주시기 바랍니다.
      </div>
    );
  }

  if (userGroupList?.groupListLength === 0) {
    return <div className="flex flex-center w-full h-full">생성한 그룹이 없습니다</div>;
  }

  if (hasUserUid && userGroupList?.groupListResult?.length > 0) {
    setUserGroupList(userGroupList?.groupListResult);
  }

  return (
```

- 간단한 Mutation 핸들링 (실제 코드)

```tsx
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const asyncPostKeyword = async (keywordInfo) => {
  const fetchInfo = {
    url: `${API_BASE_URL}/keyword`,
    method: "POST",
    params: "",
    body: keywordInfo,
  };

  const response = await fetchHandler(fetchInfo);

  return response;
};

const CreateKeywordModal = ({ createType, selectedGroupId, selectedGroupName }) => {

	/* ... */

  **const queryClient = useQueryClient();**

  const createKeywordMutation = useMutation({
    mutationFn: (keywordInfo) => asyncPostKeyword(keywordInfo),
  });

  const handleKeywordSubmit = (e) => {
    e.preventDefault();

    /* ... */

    **createKeywordMutation.mutate(keywordInfo, {
      onSuccess: (data) => {**
        if (data?.message?.includes("Error occured")) {
          addModal(MODAL_TYPE.ERROR);
          return;
        }

        ****closeModal(MODAL_TYPE.CREATE_KEYWORD);
        addModal(MODAL_TYPE.CREATE_KEYWORD_SUCCESS);
        **queryClient.invalidateQueries({ queryKey: ["userGroupList", data.ownerUid] });
      },
      onError: () => {**
        addModal(MODAL_TYPE.ERROR);
      **},
    });
  };**

  const isPending = createKeywordMutation.**isPending**;
```

뿐만 아니라, 다음과 같은 React Query의 강점들이 프로젝트에 큰 도움이 되었습니다.

- **자동화된 데이터 캐싱**: 동일한 데이터를 반복적으로 요청하지 않도록 설정된 시간(staleTime) 동안 캐싱을 활용해 네트워크 요청을 줄일 수 있었습니다.
- **Optimistic Updates**: Mutation 작업 시, UI를 즉각적으로 업데이트하여 사용자 경험(UX)을 개선할 수 있었습니다.
- **비동기 작업의 통합 관리**: 데이터 fetching, 캐싱, 동기화, 에러 처리와 같은 비동기 작업을 React Query의 통일된 인터페이스로 쉽게 관리할 수 있었습니다.

결국, React Query는 서버 상태 관리를 단순화하고, 데이터 가져오기(fetching), 캐싱(caching), 동기화(synchronization), 그리고 업데이트(update) 작업을 효율적으로 처리할 수 있는 강력한 도구입니다. 이를 통해 비동기 상태 관리의 복잡성을 줄이고, 비즈니스 로직과 사용자 경험 개선에 집중할 수 있었습니다.

<br>

## 모달을 root DOM node에서 분리하여 렌더링 시킬 수 있는 방법은 없을까?

모달은 많은 웹 애플리케이션에서 흔히 볼 수 있는 기능입니다. 현재 페이지에서 벗어나지 않고도 컨텍스트를 분리하여 사용자를 집중 시킴으로써 정보를 표시하거나 입력을 수집할 수 있는 간단한 방법이기 때문입니다. 따라서, 당연하게도 저희 프로젝트에도 UI/UX를 위하여 모달을 사용하였습니다.

프로젝트 진행 중에 모달을 DOM 내부의 기존 `#root` 노드에서 렌더링하면서 다소 염려가 되는 점이 있었고, 그 염려스러운 부분들을 해소할 수 있었던 과정에 대해서 설명하고자 합니다.

```tsx
// index.html

<!doctype html>
<html lang="ko">
  <head>
    <!-- ... -->
  </head>
  <body>
    <div id="root"></div>
  </body>
</html>

// main.jsx

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>
);

```

<br>

### root DOM node 내부에서 모달 렌더링 시 발생 가능한 문제점

1. **스타일링 충돌**

   - 아래 예시 코드에서 모달은 root DOM node 내부의 Profile 컴포넌트의 자식이기 때문에 Profile 컴포넌트에 적용되는 모든 CSS가 모달에 영향을 줄 수 있습니다. 따라서 모달을 독립적으로 스타일링하기 어려울 수 있습니다.

   ```tsx
   // 예시 코드

   function Dashboard() {
     return (
       <div>
         <h1>Dashboard</h1>
         <Profile />
       </div>
     );
   }

   function Profile() {
     return (
       <div>
         <h2>Profile</h2>
         <button>View More</button>
         <Modal />
       </div>
     );
   }
   ```

2. **포지셔닝**
   - 모달은 일반적으로 다른 콘텐츠 위에 표시되도록 absolute position 또는 fixed position으로 배치됩니다. 그러나 만약 모달의 부모 요소에 CSS position이 설정되어 있는 경우(정적이 아닌 경우) 모달은 전체 페이지가 아닌 해당 요소에 의한 상대적인 위치로 지정될 수 있습니다.

### 문제 해결: react-dom의 `createPortal` API와 독립적인 `#modal` root 도입

```tsx
// index.html

<!doctype html>
<html lang="ko">
  <head>
    <!-- ... -->
  </head>
  <body>
    <div id="root"></div>
    <div id="modal"></div>
  </body>
</html>

// Portal.jsx

import { createPortal } from "react-dom";

import PropTypes from "prop-types";

const Portal = ({ children, currentRef }) => {
  const modalDivElement = document.getElementById("modal");

  return currentRef ? createPortal(children, currentRef) : createPortal(children, modalDivElement);
};

export default Portal;

Portal.propTypes = {
  children: PropTypes.node.isRequired,
  currentRef: PropTypes.node,
};

```

1. **독립적인 DOM 계층에서 렌더링**
   - `index.html`에 `<div id="modal"></div>`를 추가하여, 모달이 기존 `#root` DOM 구조와 분리된 독립적인 계층에서 렌더링되도록 했습니다.
   - `createPortal`을 사용해 React의 컴포넌트 트리와는 독립적으로 DOM 트리 상의 `#modal` 노드에 모달을 렌더링하도록 구현했습니다. 따라서, Modal 컴포넌트를 DOM의 어느 곳에나 배치 가능합니다. React 컴포넌트 트리에서는 Modal 컴포넌트가 배치된 곳에 위치하지만 실제 DOM 트리에서는 그렇지 않게 됩니다.
2. **스타일링 충돌 방지**
   - 모달이 부모 DOM의 스타일 속성 영향을 받지 않으므로, `position`, `z-index` (쌓임 맥락)와 같은 속성으로 인한 CSS 충돌 문제로부터 자유롭습니다.
   - 항상 화면 최상단에 모달이 표시되도록 보장할 수 있게 되었습니다.
3. **포지셔닝**
   - 모달은 DOM에서 body의 direct child이기 때문에 전체 페이지에 대해 상대적인 위치를 지정할 수 있습니다.

> 모달이 실제 DOM에서는 특정 컴포넌트의 자식이 아니더라도 모달 내의 이벤트는 React 컴포넌트 트리의 부모 컴포넌트까지 버블링 되므로 유의해야 합니다. 이는 React 이벤트 시스템의 특징이며 포털을 사용할 때 주의해야 할 사항입니다.
>
> - `createPortal`로 렌더링된 컴포넌트는 실제 DOM 트리에서는 다른 계층에 렌더링되지만, React의 컴포넌트 트리 상에서는 여전히 부모 컴포넌트와 연결되어 있습니다.
> - 따라서, 모달에서 발생한 이벤트는 React 트리의 부모 컴포넌트로 전파됩니다.

### 결과적으로 얻은 효과

- **유지보수성 증가**: 모달을 독립적으로 관리하면서 관련 로직과 스타일을 한 곳에 집중시킬 수 있게 되어 코드의 가독성과 유지보수성이 크게 향상되었습니다.

---

### Reference

https://ko.react.dev/reference/react-dom/createPortal
https://medium.com/@KiranMohan27/simplifying-modals-in-react-with-portals-4c528eb32139

<br>

## 모달을 전역적으로 어떻게 관리하면 좋을까?

모든 모달을 개별적인 상태로 관리하기에는 모달의 종류가 많아짐에 따라 상태도 늘어나기에, 확장성이 없다고 느껴졌습니다. 그리고, 여러 모달을 동시에 열어야 하는 상황에서는 개별 `boolean` 값으로 관리하는 방식이 비효율적이라고 생각되었습니다. 따라서 아래와 같이 모달의 타입이 배열 안에 있고 없음을 따져서 렌더링 되도록 구현하였습니다. 아래의 방법이 모달 위에 모달을 띄우는 다중 모달 관리에도 용이하다고 생각했습니다.

```tsx
//modalSlice.js

const createModalSlice = (set) => ({
  openModalTypeList: [],
  addModal: (modalType) =>
    set((state) => ({ ...state, openModalTypeList: [...state.openModalTypeList, modalType] })),
  closeModal: (modalType) =>
    set((state) => ({
      ...state,
      openModalTypeList: state.openModalTypeList.filter((name) => name !== modalType),
    })),
  clearOpenModalTypeList: () => set((state) => ({ ...state, openModalTypeList: [] })),
});

export default createModalSlice;
```

```tsx
// MyPageSidebar.jsx
import { ERROR_MESSAGE, MODAL_TYPE } from "../../config/constants";
import useBoundStore from "../../store/client/useBoundStore";
import CreateKeywordModal from "../Modal/CreateKeywordModal";
import CreateKeywordSuccessModal from "../Modal/CreateKeywordSuccessModal";
import ErrorModal from "../Modal/ErrorModal";
import Button from "../UI/Button";

const MyPageSidebar = () => {
  const addModal = useBoundStore((state) => state.addModal);
  const openModalTypeList = useBoundStore((state) => state.openModalTypeList);

  const handleCreateKeywordButton = () => {
    addModal(MODAL_TYPE.CREATE_KEYWORD.DEFAULT);
  };

  return (
    <aside className="flex gap-20 w-full px-30 lg:px-0 lg:w-fit lg:flex-col">
      <div className="flex lg:flex-col items-center gap-25 w-full lg:w-220 h-100 lg:h-320 px-30 lg:px-30 py-10 lg:py-20 rounded-[8px] bg-white border-2 border-slate-200/80 flex-grow lg:flex-grow-0 shadow-sm"></div>
      <Button
        styles="w-300 lg:w-full px-10 lg:px-20 lg:py-18 text-21 text-gray-900/80 font-bold border-2 border-slate-200/80 rounded-[8px] shadow-sm hover:shadow-md hover:bg-emerald-200/10 hover:border-emerald-900/30"
        onClick={handleCreateKeywordButton}
      >
        키워드 만들기
      </Button>
      {openModalTypeList.includes(MODAL_TYPE.CREATE_KEYWORD.DEFAULT) && (
        <CreateKeywordModal createType={MODAL_TYPE.CREATE_KEYWORD.MY_PAGE} />
      )}
      {openModalTypeList[openModalTypeList.length - 1] === MODAL_TYPE.CREATE_KEYWORD_SUCCESS && (
        <CreateKeywordSuccessModal />
      )}
      {openModalTypeList[openModalTypeList.length - 1] === MODAL_TYPE.ERROR && (
        <ErrorModal errorMessage={ERROR_MESSAGE.CREATE_KEYWORD_ERROR} />
      )}
    </aside>
  );
};

export default MyPageSidebar;
```

# 4. User Experience

## 구독을 시작했을 때 언제 등록된 게시물부터 보여주는 것이 좋을까?

저희는 아이디어 단계에서 특정 키워드에 대해 언급된 모든 블로그 게시물에 대하여 모니터링이 가능한 서비스로 구상했기 때문에, 기획 단계에서 구독을 시작한 후 뿐만 아니라 구독 이전의 게시물에 대해서도 모니터링이 할 수 있도록 구체화했습니다.

네이버 검색 API의 응답을 통해 블로그 게시물을 등록한 날짜(postdate)을 전달받기 때문에 특정 날짜까지 등록된 게시물들을 조회하여 개발을 진행하고자 했습니다.

```jsx
{
    "lastBuildDate": "Tue, 24 Dec 2024 15:20:22 +0900",
    "total": 10595970,
    "start": 1,
    "display": 10,
    "items": [
        {
            "title": "동탄호수공원  베이커리 카페 다정베이커리는 <b>아메리카노</b> 행사중",
            "link": "https://blog.naver.com/ohbaraba/223674693587",
            "description": "동탄호수공원 베이커리 카페 다정베이커리는 <b>아메리카노</b> 행사중 이 자리에 애견동반 초록초록한... 구입시 <b>아메리카노</b> 무료 쿠폰 준다는거 보고 갔음 12/19일 까지였던 듯!!! 동탄호수공원 베이커리 카페... ",
            "bloggername": "오박이네 ^0^",
            "bloggerlink": "blog.naver.com/ohbaraba",
            "postdate": "20241130"
        }
    ]
}
```

그러나 아래 첨부 이미지에서 볼 수 있듯이, 네이버 검색 API에서 제공해주는 파라미터 중 게시물을 등록한 날짜를 설정할 수 있는 파라미터가 없다는 문제에 직면하게 되었습니다.

<div align="center">
  <img width="100%" src="/public/assets/4-1-1.png" alt=""/>
</div>

네이버 검색 API를 통해 전달받은 블로그 게시물 링크(`link`)을 사용하여 해당 게시물 본문을 크롤링하는 과정을 구독한 당일에 게시된 게시물 뿐만 아니라 구독 이전의 특정 날짜까지 등록된 게시물까지 모두 반복해야 한다는 것 뿐만 아니라 크롤링의 속도가 저희 생각보다 오래 걸린다는 문제에도 직면하게 되었습니다.

이와 같은 문제로 팀원들 간에 여러 의견들이 다음과 같이 나뉘었습니다.

1. 오랜 시간이 소요되더라도 사용자에게 많은 컨텐츠를 보여주기 위해 구독 이전일 게시물도 함께 보여주자.
2. 더 많은 컨텐츠를 보여주기 위해 사용자가 오랜 시간을 대기해야 하는 것보다는 구독 시작한 날 등록된 게시물만 보여주자.

어떤 선택이 사용자를 위한 것인지 팀원들과 의논한 끝에, 구독한 날로부터 당일에 등록한 게시물에 대해서만 크롤링하는 것으로 결정하였습니다. 저희 서비스의 주요한 주제는 당일에 등록된 게시물을 당일에 크롤링하는 것이므로 당일에 등록되지 않은 게시물을 크롤링하는 것은 기획 의도와 맞지 않는다고 판단하여 이와 같은 결정을 내리게 되었습니다.

<br>

## 크롤링 과정에서 광고성 글을 1차 선별하여, 광고성 게시물인지 목록에서 미리 알 수 있게 하자.

**Bloblow 블로그 게시물 목록에서 게시물에 달린 '광고' 뱃지와 필터링 기능을 활용해 광고성 글을 구분할 수 있습니다.** 마케터는 광고성 글 보다, 실제 소비자의 VoC([Voice of Customer](https://en.wikipedia.org/wiki/Voice_of_the_customer))를 확인하고 싶은 니즈가 강할 것입니다. 실제 소비자 반응을 토대로 다음 제품 혹은 마케팅 계획을 합리적으로 세울 수 있기 때문입니다. 이를 고려해서 게시물을 들어가서 보지 않더라도 게시물 목록에서 광고성 글을 구분할 수 있도록 했습니다.

**`array` 타입으로 정의해둔 광고성 문구들 중 1개 이상의 text를 게시글 본문에서 포함한다면, 해당 글을 광고성 글로 분류하였습니다.** 프로젝트 초기 PoC 중 발견한 패턴은, 브랜드에 대한 블로그 게시물 중에는 광고성 글이 많다는 것이었습니다. 동시에, 이러한 글의 말미에는 광고 글이라는 사실을 게시물 독자들이 쉽게 인지할 수 있도록 하는 문구를 기재하고 있다는 것입니다. 관련 규정을 확인해보니 [공정거래위원회 추천·보증 등에 관한 표시·광고 심사지침](https://www.ftc.go.kr/www/selectReportUserView.do?key=10&rpttype=1&report_data_no=10886)에 따라 최근 까지 엄격히 관리되고 있었습니다. **이에 해당 문구들을 신뢰할만한 선별 기준이라 판단하고, 이를 광고성 글 분류 로직에 녹여보자는 아이디어가 나왔습니다.**

```jsx
// 광고성 게시물로 분류할 수 있는 주요 키워드
const validateAdKeyword = [
  "소정의 원고료",
  "소정의 수수료",
  "수수료를 지급받아",
  "원고료를 지급받아",
];

// ...
const isAd = await Promise.resolve(
  validateAdKeyword.some((adKeyword) => content.includes(adKeyword))
);
```

**게시물 마다 문구 표기방법이 각양각색이었고, 제한된 일정과 중요도를 고려하여 '광고성 문구를 텍스트로 포함하는지' 여부로 광고성 글 판별 로직을 구현했습니다.** 일반적인 문구인 "이 글은 소정의 원고료를 받고 작성한 글입니다" 외에도 글 마다 문구의 표현과 사용한 단어들이 달랐습니다. (관련 정리된 문서 참고) 이에 초기에 `string` 타입으로 정의한 광고성 키워드를 `array` 타입으로 변경하여 블로그 게시물 작성자들이 주로 사용하는 여러 문구들을 명시했습니다. `string` 타입으로 특정 광고성 문구를 하나 만을 기준으로 검사하기에 블로그와 게시물 마다 상황이 다양했기 때문입니다. **`array` 타입으로 관리함으로써 문구가 다양하게 사용되는 상황에 대응하고, 추후 새롭게 발견되는 문구가 있다면 유연하게 추가할 수 있는 구조를 초기부터 구현하고자 했습니다.** (\*참고: 프로젝트를 목적을 학습에도 두고 있어, 광고성 글 분류 로직에 AI 모델을 활용하는 옵션은 고려하지 않았습니다.)

추가로 까다로웠던 점은 텍스트로 표기하지 않고, 해당 문구를 포함한 이미지로 대체한 게시물의 케이스 입니다. **이에 작업의 의존성을 기준으로, 텍스트 검사 로직을 먼저 구현하기로 결정했습니다. 이미지 검사 로직 또한, 이미지를 텍스틀로 변환하는 과정이 추가될 뿐 결국 변환된 텍스트를 검사하는 로직을 활용하는 것입니다.** 텍스트 검사 로직을 핵심으로 구현 후, 추후 이미지로 포함한 글에 대한 처리를 대응하기로 했습니다. (이미지를 텍스트로 변환시 활용할 기술은 Google Vision API, tesseract.js를 검토하였습니다. 리서치 결과 tesseract.js가 한글을 제대로 변환하지 못하는 케이스가 발견되어 추후 Google Vision API를 활용하여 기능을 업데이트할 예정입니다.)

<br>

## 정렬/필터: 사용자 탐색 경험을 어떻게 개선할 수 있을까?

가장 먼저 구현한 기능은 정렬 및 필터 기능입니다. 사용자는 블로그 게시물들을 정렬하거나, 특정 키워드로 필터링 할 수 있는 기능입니다.

동작 프로세스를 간략히 요약하자면, 먼저 전제가 되는 것은 크롤링으로 수집한 블로그 게시물 본문 HTML 태그들은 DB에 `string`으로 저장되어 있다는 상황입니다. 그리고 사용자가 특정 정렬, 필터 조건을 선택 또는 입력하면 해당 조건 목록을 parameter로 해서 서버에 요청을 보냅니다. 서버는 조건에 맞게 필터링 및 정렬된 게시물 목록 중 10개와 함께 `nextCursorId`(다음 요청의 파라미터로 활용될 정보로, 현재 응답 내 마지막 게시물 목록의 id를 의미함), `hasNext`(조건에 맞는 잔여 게시물이 없음을 클라이언트에게 알려줘서 불필요한 추가 요청을 하지 않도록 함) 변수를 첫 응답으로 보냅니다.

### 사용자에게 정렬/필터가 적용된 정확한 게시물 목록 전달을 위해 Cursor Pagination을 활용했습니다.

- 리렌더링 범위를 정확히 파악한 후, 로컬 상태를 활용해 불필요한 리렌더링 범위를 줄였습니다.
- 계산 가능한 값을 상태로 선언하지 않고 [DRY(Don’t Repeat Yourself) 원칙](https://react.dev/learn/thinking-in-react#step-3-find-the-minimal-but-complete-representation-of-ui-state)을 준수하고자 노력했습니다.
- 리렌더링을 포함하여, 현재 작성하는 코드의 영향 범위를 정확히 인지하는 것의 중요성을 배웠습니다.

세부내용

- 게시물 목록 데이터가 많기 때문에, 사용자 viewport 범위 내에 모든 목록을 불러오기에 한계가 있었습니다. 이에 게시물 목록의 페이지네이션을 구현하기로 결정했습니다.
- 이를 위해 정렬 및 필터가 적용된 상태에서, 일종의 'cursor' 역할의 값을 정의해서 서버가 마지막 응답으로 반환한 row에 대한 값을 확인할 수 있도록 했습니다. 이를 통해 해당 요청에 대한 응답으로, 몇 번째 row 부터 주면 되는지 서버가 연산할 수 있게 합니다. 이전 응답으로 보낸 마지막 게시물의 `id`를 의미하는 `nextCursorId`를 cursor로 활용했습니다.
- 게시물 목록 첫 요청시 클라이언트가 받은 게시물이 없기 때문에 cursorId는 빈 문자열(`""`)로 보내고, 서버로부터 `nextCursorId`가 포함된 응답을 받은 후 부터는 해당 값을 cursor 파라미터로 요청을 보내게 됩니다. 그리고 서버는 더이상 응답으로 보낼 게시물이 없을 때 까지 이를 반복하게 되는데, `hasNext`를 함께 담아서 잔여 게시물이 더 없을 때 추가 요청하지 않도록 했습니다.

<br>

### 컴포넌트 리렌더링에도 의도를 담아야 한다는 것을, 필요한 최소한의 상태를 관리해보며 배웠습니다.

- 리렌더링 범위를 정확히 파악한 후, 로컬 상태를 활용해 불필요한 리렌더링 범위를 줄였습니다.
- 계산 가능한 값을 상태로 선언하지 않고 [DRY(Don’t Repeat Yourself) 원칙](https://react.dev/learn/thinking-in-react#step-3-find-the-minimal-but-complete-representation-of-ui-state)을 준수하고자 노력했습니다.
- 리렌더링을 포함하여, 현재 작성하는 코드의 영향 범위를 정확히 인지하는 것의 중요성을 배웠습니다.

세부내용

- 게시물 목록을 렌더링 하는 `PostCardList` 컴포넌트가 `PostCardFilter`를 자식 컴포넌트로 렌더링 합니다. 자식 컴포넌트 `PostCardFilter`는 게시물 정렬 및 필터 입력 UI를 렌더링하는데, 필터가 적용된 게시물 목록은 부모 컴포넌트 `PostCardList` 에서 렌더링 됩니다. 때문에 상태 끌어올리기로 두 컴포넌트간 상태 `filterList`(현재 검색 결과에 적용된 필터 목록 값을 기억하는 상태)가 공유되는 구조를 구현했습니다.
- 이 때 `PostCardFilter` 컴포넌트에서 사용자 입력으로 인해 특정 정렬/필터 `input` 의 value가 바뀔 때, props로 전달 받은 `filterList`를 직접 업데이트하지 않도록 했습니다. `filterList`를 직접 업데이트 하게 되면 부모 컴포넌트 까지 리렌더링 되는데 이는 불필요하다고 판단했기 때문입니다. 대신 로컬 상태 `tempFilterList`를 별도로 선언하여 사용자가 입력 중인 input value를 기억하도록 했습니다.
- 이는 정렬/필터 조건 입력과 조건에 따른 게시물 요청을 분리했기 때문에 가능했습니다. 이렇게 로직을 분리함으로써, 사용자가 조건 입력을 완료했다는 뜻으로 '적용 버튼'을 클릭하면 필터 input value를 부모 컴포넌트 상태로 업데이트하여 실제 fetch를 진행하도록 구현했습니다.
- 그외 `keywordFilterCount`(현재 필터로 적용된 키워드의 개수), `selectedKeywordTypeInDropDownKR`()와 같이 기존에 선언한 상태로 계산 가능한 값은 상태로 선언하지 않고 [DRY(Don’t Repeat Yourself) 원칙](https://react.dev/learn/thinking-in-react#step-3-find-the-minimal-but-complete-representation-of-ui-state)을 준수하며 state를 구조화 하고자 했습니다.
- 리렌더링을 포함하여, 현재 작성하는 코드의 영향 범위를 정확히 인지하는 것의 중요성을 배울 수 있었습니다. 기존 컴포넌트 및 상태 구조에 얽매여 사고하지 않고, 현상의 원인을 분석하고 원점으로 돌아가 구조적으로 해결해본 값진 경험이었습니다. 특히 기한이 정해진 상황에서 기존 구조를 바꾸는 것을 쉽게 의사결정하지 못 했습니다. 이 결정이 변수가 되어 일정 관리에 변수가 될 수 있다는 걱정이 있었는데, 이렇게 구조적으로 가능한 빨리 해결하고 가는 것이 장기적으로 올바르고 빠른 해결방향임을 체득할 수 있었습니다.

<br>

## 네이버 블로그 API의 응답 중 content와 title 내부의 &amp 은 무엇이며 어떻게 필터링할까?

## Naver Blog API 응답에서 HTML Entities 처리하기

**Naver Blog API**를 사용하면서, 응답에 특수문자(예: `&amp;`나 `&lt;` )가 포함되어 해당 응답의 title과 description을 활용하는 PostCard 컴포넌트에 잘못된 텍스트가 표시되는 문제를 발견했습니다. 이를 조사한 결과, 이 특수문자들이 공통적으로 `&`로 시작하거나 HTML 태그와 비슷한 형태를 가지고 있었고, 이것이 **HTML Entities**라는 것을 알게 되었습니다.

### HTML Entities란 무엇인가?

HTML Entities는 HTML에서 예약되거나 특수한 의미를 가지는 문자를 안전하게 표현하기 위해 사용됩니다. 예를 들어:

- `<`는 `&lt;`로 표현됩니다.
- `>`는 `&gt;`로 표현됩니다.
- `&`는 `&amp;`로 표현됩니다.

HTML Entities는 다음과 같은 이유로 사용됩니다.

1. **HTML 구조 보호:** `<`나 `>`와 같은 문자가 HTML 태그로 잘못 해석되는 것을 방지합니다.
2. **보안:** HTML Entities는 악성 코드 삽입(XSS 공격)을 방지하는 데 도움을 줍니다.
3. **호환성:** 특수문자를 다양한 환경에서 일관되게 표현할 수 있도록 보장합니다.

### HTML Entities가 API 응답에 포함된 이유

네이버 블로그 API 응답에 HTML Entities가 포함된 이유는 다음과 같습니다:

1. **HTML 구조 보존:** 일부 응답에는 `<b>`와 같은 HTML 태그가 포함될 수 있으므로 이를 엔티티로 인코딩하여 안전하게 전달합니다.
2. **보안 강화:** 특수문자를 엔코딩하여 실행 가능한 HTML이나 JavaScript로 해석되지 않도록 방지합니다.
3. **표준화:** 여러 플랫폼에서 데이터 표현을 일관되게 유지하기 위해 자동으로 엔티티로 변환했을 가능성이 높습니다.

### 해결책: HTML Entities 디코딩 유틸 함수

사용자가 깨끗한 텍스트를 볼 수 있도록 HTML Entities를 디코딩하는 유틸리티 함수를 작성했습니다. 이 함수는 일반적인 HTML Entities를 디코딩하고, `<b>`와 같은 불필요한 태그를 제거합니다.

```jsx
const sanitizeHtmlEntity = (string) => {
  if (typeof string !== "string") {
    return "";
  }

  return string
    .replaceAll("<b>", "")
    .replaceAll("</b>", "")
    .replaceAll("&amp;", "&")
    .replaceAll("&lt;", "<")
    .replaceAll("&gt;", ">")
    .replaceAll("&nbsp;", " ")
    .replaceAll("&quot;", `"`)
    .replaceAll("&#035;", "#")
    .replaceAll("&#039;", `'`)
    .replaceAll("&sim;", "~");
};

export default sanitizeHtmlEntity;
```

1. **타입 확인:** 입력 값이 문자열인지 확인합니다. 문자열이 아니면 빈 문자열을 반환합니다.
2. **엔티티 디코딩:** `&amp;`, `&lt;`, `&gt;` 등 주요 HTML Entities를 실제 문자로 변환합니다.
3. **태그 제거:** `<b>`와 같은 불필요한 HTML 태그를 제거합니다.
4. **최종 출력:** 깨끗하고 안전한 텍스트를 반환합니다.

---

### Reference

https://developer.mozilla.org/ko/docs/Glossary/Entity

<br>

# 5. Optimization

## 여러 개의 블로그 게시물들을 크롤링하는 시간을 얼마나 줄일 수 있을까?

저희는 네이버 검색 API를 통해 사용자가 구독한 키워드가 언급된 블로그 게시물들을 먼저 파악한 후, 해당 게시물 링크로 이동하여 본문 내용을 크롤링해야 했습니다.

네이버 검색 API의 검색 결과 최대 개수인 100개를 한 번에 크롤링을 시도했을 때 약 3분 49초가 소요되어 사용자가 크롤링한 결과를 확인하기 위해선 오랜 시간을 기다려야 하는 문제에 직면하게 되었습니다.

**1-1. 게시물 수를 줄여 요청하기**

소요 시간을 줄이기 위해 네이버 검색 API의 검색 결과 개수를 다르게 한 후 크롤링을 시도해본 결과,

- 100개 게시물을 검색한 후 크롤링하는 데 소요되는 시간 : 약 3분 49초 소요(약 229초 소요)
- 10개 게시물을 검색한 후 크롤링하는 데 소요되는 시간 : 약 24초 소요

게시물 개수를 다르게 하여도 유의미한 속도 차이가 발생하지 않는다는 것을 확인할 수 있었습니다.

**1-2. 병렬로 크롤링하기**

기존 직렬로 진행했던 방식을 병렬로 진행할 수 있도록 `Promise.all`을 사용하여 네이버 검색 API의 검색 결과 개수를 다르게 한 후 크롤링을 시도해본 결과,

- 10개 게시물을 검색한 후 `Promise.all`을 사용하여 크롤링하는 데 소요되는 시간 : 약 12초
- 15개 게시물을 검색한 후 `Promise.all`을 사용하여 크롤링하는 데 소요되는 시간 : 약 23초
- 20개 게시물을 검색한 후 `Promise.all`을 사용하여 크롤링하는 데 소요되는 시간 : 약 34초

이러한 결과가 도출되었으며, 게시물 수가 5개 증가함에 따라 시간은 약 11초가 증가한다는 것을 파악할 수 있었습니다. 크롤링 속도를 줄이기 위한 방법으로 블로그 게시물 10개씩 요청하여 크롤링을 진행하는 방식을 택하였습니다.

**1-3. Promise.all과 Promise.allSettled**

`Promise.all`로 크롤링 테스트를 진행하던 중, 네이버 검색 API를 통해 전달받은 검색 결과 내 외부 블로그 게시물이 포함되어 있어 크롤링이 완료되지 못한 문제가 발생하였습니다.

크롤링 시작하기 전에 네이버 블로그가 아닌 경우는 제외시키는 예외 처리만 추가할 수 있었지만, 예상하지 못한 문제들이 발생할 수 상황을 고려해야 했습니다.

따라서, 요청한 10개의 게시물 크롤링 요청 도중 하나의 크롤링에서 오류가 발생하면 모든 크롤링 작업이 멈추게 되는 `Promise.all`을 택하기 보단 개별 크롤링 작업에 대한 결과가 포함되어 반환되는 `Promise.allSettled`를 택하였습니다.

<br>

## DB 업데이트, UI 반영의 자연스러운 전환을 고민했습니다. 총 4가지 옵션 중 Optimistic Update 방식을 채택해 자연스러운 동기화로 보이는 UX로 개선했습니다.

## 협업을 위한 로직 재사용성과 관심사 분리를 위해 커스텀 훅을 만들어볼까?

팀 프로젝트 진행 중, 컴포넌트 내부의 점점 늘어나는 로직으로 인한 코드 복잡성을 직면하면서 협업의 효율성을 생각하지 않을 수 없었습니다. 여러 컴포넌트에서 동일하거나 유사한 로직을 반복적으로 구현하면서 코드가 중복된다는 것이 직접적으로 느껴졌고, 이는 유지보수성을 떨어뜨렸습니다. 실제로 중복이 일어나지 않았더라도, 해당 로직을 추후에 나 뿐만이 아닌 다른 팀원들이 재사용 할 수 있을 것이라 생각이 들기도 했습니다.

각 함수형 컴포넌트에 UI 뿐 아니라 여러 로직이 혼재되어 있어 코드의 가독성이 낮아지는 것을 발견했습니다. 이로 인해, 다른 팀원이 코드를 읽으며 이해하는 시간이 증가될 것이라 생각이 되었습니다. 물론 PR 리뷰 시간도 마찬가지입니다. 또, 특정 로직을 수정하거나 확장하려면 여러 파일을 개별적으로 모두 수정해야 하는 상황이 발생했습니다.

우리는 이러한 문제를 해결하기 위해 **로직의 재사용성과 관심사의 분리**를 목표로 설정했습니다. React의 철학인 **컴포지션(Composition)** 패턴에 따라 비즈니스 로직을 UI 컴포넌트에서 분리하고, 이를 캡슐화한 재사용 가능한 형태로 관리하기 위해 커스텀 훅(Custom Hook)을 적극 사용하기로 했습니다. 즉, 커스텀 훅으로 특정 로직과 상태를 캡슐화하여 어떻게 내부의 복잡한 로직이 구성되어 있는지는 숨기고, 외부로는 무엇을 할 수 있는지만 보여줌으로써 코드 복잡성을 감소시키고 로직의 재사용성을 증가시킴으로써 협업의 효율을 높입니다.

- 코드 중복 제거: 여러 컴포넌트에서 동일한 로직을 반복하지 않고, 하나의 훅으로 관리할 수 있었습니다.
- 관심사의 분리: UI 렌더링은 컴포넌트가 담당하고, 비즈니스 로직은 커스텀 훅으로 분리하여 컴포넌트의 역할과 코드의 가독성을 명확히 할 수 있었습니다.
- 협업 효율성 향상: 로직이 중앙에서 관리되면서 팀원들 간 코드 일관성을 유지할 수 있었고, 새로운 기능 추가나 기존 로직 수정 시 훅만 수정하면 되어 유지보수 작업이 훨씬 간소화되었습니다.

1. **모달 마운트 시 실행되는 커스텀 훅**(모달 layer 아래 root Element의 스크롤 방지 로직)

   - 단순하게 `overflow: hidden`을 설정한 로직과는 다르게 `position: fixed`와 동시에 `overflow-y: scroll`로 기존 스크롤을 유지해 Layout shift 방지
   - 모달이 언마운트될 경우, 클로저를 활용한 scrollY 변수로 스크롤 위치 복원

   ```tsx
   // useScrollDisable.js
   import { useEffect } from "react";

   const useScrollDisable = () => {
     useEffect(() => {
       const scrollY = window.scrollY;
       const hasScroll =
         document.documentElement.scrollHeight > document.documentElement.clientHeight;

       document.body.style.cssText = `
         position: fixed;
         top: -${scrollY}px;
         left: 0;
         right: 0;
         ${hasScroll && "overflow-y: scroll;"}
       `;

       return () => {
         document.body.style.cssText = "";
         window.scrollTo(0, scrollY);
       };
     }, []);
   };

   export default useScrollDisable;
   ```

1. **무한스크롤 관련 api 요청 및 pageParam 로직을 위한 커스텀 훅**(React query의 useInfiniteQuery 사용)

   ```tsx
   // useInfiniteData.js
   import useObserver from "./useObserver";
   import { useInfiniteQuery } from "@tanstack/react-query";

   const useInfiniteData = ({
     queryKey,
     queryFn,
     options,
     initialPageParam,
     getNextPageParam,
     ref,
     root,
   }) => {
     const { data, status, fetchNextPage, isPending, isError, ...rest } = useInfiniteQuery({
       queryKey,
       queryFn: ({ pageParam }) => queryFn(pageParam, options),
       initialPageParam,
       getNextPageParam,
       staleTime: 10 * 1000,
     });

     const onIntersect = (entries) => {
       if (isPending) return;
       if (!data?.pages[data?.pages.length - 1].hasNext) return;

       entries.forEach((entry) => {
         if (entry.isIntersecting) {
           fetchNextPage();
         }
       });
     };

     useObserver({ target: ref, root, threshold: 0.5, onIntersect });

     return { data, status, fetchNextPage, isPending, isError, ...rest };
   };

   export default useInfiniteData;
   ```

   ```tsx
   // PostCardList.jsx

   const PostCardList = ({ keywordId, filterList, setFilterList, resetFilterList }) => {
     const observeRef = useRef(null);
     const observeRootRef = useRef(null);

     const infiniteDataArgument = {
       queryKey: ["posts", keywordId, filterList],
       queryFn: asyncGetPosts,
       options: {
         keywordId,
         order: filterList.order,
         includedKeyword: filterList.includedKeyword,
         excludedKeyword: filterList.excludedKeyword,
         isAd: filterList.isAd,
         limit: 5,
       },
       initialPageParam: "",
       getNextPageParam: (lastPage) => (lastPage.hasNext ? lastPage.nextCursorId : undefined),
       ref: observeRef,
       root: observeRootRef.current,
     };

     const { data: postResponse, isPending, isError } = useInfiniteData(infiniteDataArgument);
   ```

1. **무한스크롤 관련 Intersection Observer 로직을 위한 커스텀 훅**(Intersection Observer API)

   - 외부로부터 target, IntersectionObserver 생성자 옵션, 콜백함수를 받음
   - IntersectionObserver 생성자의 옵션에 기본값 할당

   ```tsx
   import { useEffect } from "react";

   const useObserver = ({
     target,
     root = null,
     rootMargin = "0px 0px 0px 0px",
     threshold = 1.0,
     onIntersect,
   }) => {
     useEffect(() => {
       let observer;

       if (target && target.current) {
         observer = new IntersectionObserver(
           (entries, observer) => {
             onIntersect(entries, observer);
           },
           {
             root,
             rootMargin,
             threshold,
           }
         );

         observer.observe(target.current);
       }

       return () => {
         if (observer) {
           observer.disconnect();
         }
       };
     }, [target, root, rootMargin, threshold, onIntersect]);
   };

   export default useObserver;
   ```

> **Composition Pattern: React는 강력한 합성 모델을 가지고 있으며, 상속 대신 합성을 사용하여 컴포넌트 간에 코드를 재사용! ⇒ 관심사의 분리, 재사용성 증가**
>
> - 컴포넌트를 쪼개서 작은 단위로 관리: 단일 책임 원칙(Single Responsibility Principle)
> - Props를 통한 데이터 전달: 컴포넌트 간 결합도를 낮추고 재사용성을 높임
> - Children을 이용한 컴포넌트 확장: 부모 컴포넌트의 자식 컴포넌트 제어으로 재사용성 높임
> - memo와 같은 고차 컴포넌트
>
> **Container-Presentation 패턴: Composition Pattern과 같은 맥락. UI와 데이터 처리/관리 컴포넌트의 분리 ⇒ Hook으로 대체(로직 추상화와 재사용, UI와 로직의 유연한 조합)**
>
> https://ko.legacy.reactjs.org/docs/composition-vs-inheritance.html >https://www.patterns.dev/react/presentational-container-pattern/ >https://medium.com/@console_log/presentational-container-component-pattern%EA%B3%BC-react-b0f65032ced3

<br>
<br>

# 6. Feedback / Improvement

## 전체 UI 수정

(WIP)

## 차트를 일단위 뿐만 아니라 주 단위, 월 단위로도 볼 수 있게 하면 어떨까?

(WIP)

<br>
<br>

# 7. Tech Stack

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

<div align="center">
  <img width="90%" src="/public/assets/bloblow_tech_stack.png" alt="블로블로 기술 스택"/>
</div>

<br>

# 8. Team Work / Collabration Rule

## 팀 내 시행 착오 공유로 학습 및 구현 속도를 높여보자

(WIP)

## 코드 리뷰를 효과적으로 하려는 고민

(WIP)

## Git 협업

(WIP)

<br>

# 9. Project Review

## 팀 회고

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

## 향후 확장 계획

(WIP)

### 추후 추가 구현할 기능

(WIP)

### 리팩토링 또는 최적화 예정 기능

(WIP)

## 느낀 점 / 인사이트

(WIP)
