# router

- 설치

```bash
npm install react-router-dom
npm i @types/react-router-dom
```

- App.tsx

```tsx
import { BrowserRouter, Route, Routes } from "react-router-dom";

function App(): JSX.Element {
  return (
    <BrowserRouter>
      <div className="wrap">
        <header>상단메뉴</header>
        <Routes>
          <Route path="/" element={<h1>Home</h1>}></Route>
        </Routes>
        <footer>하단</footer>
      </div>
    </BrowserRouter>
  );
}

export default App;
```

- App.tsx 현재 코드

```tsx
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Index";
import Company from "./pages/company/Index";
import Ceo from "./pages/company/Ceo";
import History from "./pages/company/History";
import Partner from "./pages/company/Partner";
import Location from "./pages/company/Location";
import Good from "./pages/good/Good";
import OCRUploader from "./pages/company/Test";

// 협력사 타입
export interface PartnerType {
  name: string;
  link: string;
}

function App(): JSX.Element {
  const partnerList: PartnerType[] = [
    { name: "삼성", link: "http://" },
    { name: "LG", link: "http://" },
    { name: "그린컴퓨터", link: "http://" },
  ];
  return (
    <BrowserRouter>
      <div className="wrap">
        <header>상단메뉴</header>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/company">
            <Route index element={<Company />} />
            <Route path="ceo" element={<Ceo />} />
            <Route
              path="history"
              element={<History title="좋은회사" year={1990} />}
            />
            <Route
              path="partner"
              element={<Partner partnerList={partnerList} />}
            />
            <Route path="location" element={<Location />} />
          </Route>
          <Route path="/good" element={<Good />} />
        </Routes>
        <footer>하단</footer>
      </div>
    </BrowserRouter>
  );
}

export default App;
```

- /src/pages/Index.tsx

```tsx
const Index = (): JSX.Element => {
  return <h1>홈페이지</h1>;
};

export default Index;
```

- /src/pages/company/Index.tsx

```tsx
const Index = (): JSX.Element => {
  return <div>회사소개</div>;
};

export default Index;
```

- /src/pages/company/Ceo.tsx
- http://localhost:5173/company/ceo?name=Kim&age=30

```tsx
import { useLocation, useSearchParams } from "react-router-dom";

const Ceo = (): JSX.Element => {
  // 현재 URI 의 주소 및 패스 알아내기
  const location = useLocation();
  console.log(location.pathname);
  //?name=Hong&age=20
  console.log(location.search);
  console.log(location.state?.fromUrl);

  // 쿼리스티링에서 값을 추출하기
  const [searchParams] = useSearchParams();
  // console.log(searchParams);
  const name = searchParams.get("name");
  const age = searchParams.get("age");

  return (
    <div>
      Ceo {name}님 소개 : {age} 살
    </div>
  );
};

export default Ceo;
```

- /src/pages/company/History.tsx

```tsx
interface HistoryProps {
  children?: React.ReactNode;
  title: string;
  year: number;
}

const History = ({ title, year }: HistoryProps): JSX.Element => {
  return (
    <div>
      History {title} {year}
    </div>
  );
};

export default History;
```

- /src/pages/company/Partner.tsx

```tsx
import { PartnerType } from "../../App";

interface PartnerProps {
  children?: React.ReactNode;
  partnerList: PartnerType[];
}

const Partner: React.FC<PartnerProps> = ({ partnerList }) => {
  return (
    <div>
      <h1>Partner</h1>
      <ul>
        {partnerList.map((item, index) => (
          <li key={index}>
            {item.name} {item.link}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Partner;
```

- /src/pages/company/Location.tsx

```tsx
const Location = (): JSX.Element => {
  return <div>Location</div>;
};

export default Location;
```

- /src/pages/good/Good.tsx

```tsx
import {
  createSearchParams,
  Link,
  Outlet,
  useNavigate,
} from "react-router-dom";

// 전송쿼리 타입
interface QueryData {
  name: string;
  age: string;
}
// 숨겨진 데이터 타입
interface HiddenInfo {
  memo: string;
  good: string;
  favorite: string;
}

const Good = (): JSX.Element => {
  // 라우터 주소를 전달해서 이동시키기
  const navigate = useNavigate();

  // 1. 많은 분들이 아래처럼 주소 및 쿼리 스트링을 만듭니다.
  const normalUrl = () => {
    const url = `/company/ceo?name=hong&age=30`;
    navigate(url);
  };

  // 2. 문법을 좋아하시는 분들은 아래처럼 해보세요.
  const secialUrl = () => {
    // 전송할 데이터
    const ageVal = 20;
    const queryData: QueryData = {
      name: "Hong",
      age: `${ageVal}`,
    };
    // 데이터를 직렬화(글자로 만듦)한다.
    const queryStr = createSearchParams({ ...queryData }).toString();
    // 몰래 보내는 정보도 담을 수 있어요.
    const fromUrl: HiddenInfo = {
      memo: "제품 페이지에서 왔어요.",
      good: "제품 1을 보고 있었지요.",
      favorite: "제품 1에 많은 관심을 가진 방문객이에요",
    };

    navigate(
      {
        pathname: "/company/ceo",
        search: queryStr,
      },
      { state: fromUrl },
    );
  };

  return (
    <div>
      <h1>제품소개</h1>

      <div>
        <button onClick={normalUrl} style={{ border: "2px solid black" }}>
          navigate 로 이동하기
        </button>
      </div>

      <div>
        <button onClick={secialUrl} style={{ border: "2px solid black" }}>
          추천하는 이동하기
        </button>
      </div>
      <div>
        <Link to={"/good/1"}>제품 1번</Link>&nbsp;/&nbsp;
        <Link to={"/good/delete/1"}>삭제</Link>&nbsp;/&nbsp;
        <Link to={"/good/modify/1"}>수정</Link>
      </div>
      <div style={{ border: "3px solid red" }}>
        <h2>레이아웃 유지하고 화면 출력</h2>
        <Outlet />
      </div>
    </div>
  );
};

export default Good;
```

- App.tsx

```tsx
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Index";
import Company from "./pages/company/Index";
import Ceo from "./pages/company/Ceo";
import History from "./pages/company/History";
import Partner from "./pages/company/Partner";
import Location from "./pages/company/Location";
import Good from "./pages/good/Good";
import OCRUploader from "./pages/company/Test";
import Detail from "./pages/good/Detail";

// 협력사 타입
export interface PartnerType {
  name: string;
  link: string;
}

function App(): JSX.Element {
  const partnerList: PartnerType[] = [
    { name: "삼성", link: "http://" },
    { name: "LG", link: "http://" },
    { name: "그린컴퓨터", link: "http://" },
  ];
  return (
    <BrowserRouter>
      <div className="wrap">
        <header>상단메뉴</header>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/company">
            <Route index element={<Company />} />
            <Route path="ceo" element={<Ceo />} />
            <Route
              path="history"
              element={<History title="좋은회사" year={1990} />}
            />
            <Route
              path="partner"
              element={<Partner partnerList={partnerList} />}
            />
            <Route path="location" element={<Location />} />
          </Route>
          {/* -- 상품 정보 */}
          <Route path="/good" element={<Good />}>
            <Route path=":id" element={<Detail title={"좋은회사"} />} />
            <Route path="delete/:id" element={<h1>제품 삭제 페이지</h1>} />
            <Route path="modify/:id" element={<h1>제품 수정 페이지</h1>} />
          </Route>
          {/* -- 상품 정보 */}
        </Routes>
        <footer>하단</footer>
      </div>
    </BrowserRouter>
  );
}

export default App;
```

- /src/pages/good/Detail.tsx

```tsx
import { useParams } from "react-router-dom";

interface DetailProps {
  children?: React.ReactNode;
  title: string;
}
// const Detail = ({ title }: DetailProps): JSX.Element => {
//     return <div>Detail</div>;
//   };
// const Detail: React.FC<DetailProps> = ({ title }: DetailProps): JSX.Element => {
//   return <div>Detail</div>;
// };
const Detail: React.FC<DetailProps> = ({ title }) => {
  // http://localhost:5173/good/1
  // 만약 쿼리형태라면 useSearchParams 를 쓴다.
  const { id } = useParams();

  return (
    <div>
      {title}의 상세 {id}번 제품 정보
    </div>
  );
};

export default Detail;
```

- /src/componetns/Header.tsx

```tsx
import { Link } from "react-router-dom";

interface HeaderProps {
  children?: React.ReactNode;
}
// const Header: React.FC<HeaderProps> = ({ children }) => {
//   return (
//     <div>
//       Header
//       <div>{children}</div>
//     </div>
//   );
// };

const Header = ({ children }: HeaderProps): JSX.Element => {
  return (
    <div>
      Header
      <div style={{ display: "flex" }}>
        <ul style={{ flex: 1, display: "flex" }}>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/good">Good</Link>
          </li>
        </ul>
        {children}
      </div>
    </div>
  );
};

export default Header;
```

- NavLink 활용예
- header.css

```css
.active-link {
  color: red;
  font-weight: bold;
}
```

```ts
import { NavLink } from "react-router-dom";
// import { Link } from "react-router-dom";

import "./header.css";

interface HeaderProps {
  children?: React.ReactNode;
}
// const Header: React.FC<HeaderProps> = ({ children }) => {
//   return (
//     <div>
//       Header
//       <div>{children}</div>
//     </div>
//   );
// };

const Header = ({ children }: HeaderProps): JSX.Element => {
  return (
    <div>
      Header
      <div style={{ display: "flex" }}>
        <ul style={{ flex: 1, display: "flex" }}>
          <li>
            <NavLink
              className={({ isActive }) => (isActive ? "active-link" : "")}
              to="/"
            >
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
              className={({ isActive }) => (isActive ? "active-link" : "")}
              to="/good"
            >
              Good
            </NavLink>
          </li>
        </ul>
        {children}
      </div>
    </div>
  );
};

export default Header;

```
