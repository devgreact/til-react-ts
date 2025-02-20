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
