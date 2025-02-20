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
