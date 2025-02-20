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
