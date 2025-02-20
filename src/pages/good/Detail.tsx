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
