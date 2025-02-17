import { FormEvent } from "react";

const Hi = (): JSX.Element => {
  const handleSumit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };
  return (
    <div>
      <form onSubmit={e => handleSumit(e)}></form>
    </div>
  );
};

export default Hi;
