# 이벤트의 기본 이해

## onClick

```tsx
const Hi = (): JSX.Element => {
  return (
    <div>
      <button onClick={() => console.log("안녕")}>버튼</button>
      <form>
        <button type="button" onClick={() => console.log("반가워")}></button>
      </form>
    </div>
  );
};

export default Hi;
```

- 이벤트 확인

```ts
const Hi = (): JSX.Element => {
  const divClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    console.log("클릭", e);
  };
  const btClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    console.log("클릭", e);
  };
  const formBtClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    console.log("클릭", e);
  };

  return (
    <div>
      <div onClick={e => divClick(e)}>클릭</div>
      <button onClick={e => btClick(e)}>버튼</button>
      <form>
        <button type="button" onClick={e => formBtClick(e)}></button>
      </form>
    </div>
  );
};

export default Hi;
```

- 축약형

```tsx
import { MouseEvent } from "react";

const Hi = (): JSX.Element => {
  const divClick = (e: MouseEvent<HTMLDivElement>) => {
    console.log("클릭", e);
  };
  const btClick = (e: MouseEvent<HTMLButtonElement>) => {
    console.log("클릭", e);
  };
  const formBtClick = (e: MouseEvent<HTMLButtonElement>) => {
    console.log("클릭", e);
  };

  return (
    <div>
      <div onClick={e => divClick(e)}>클릭</div>
      <button onClick={e => btClick(e)}>버튼</button>
      <form>
        <button type="button" onClick={e => formBtClick(e)}></button>
      </form>
    </div>
  );
};

export default Hi;
```

## onChange

```tsx
const Hi = (): JSX.Element => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.value);
  };
  return (
    <div>
      <form>
        <input type="text" onChange={e => handleChange(e)} />
      </form>
    </div>
  );
};

export default Hi;
```

- 축약형

```tsx
import { ChangeEvent } from "react";

const Hi = (): JSX.Element => {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.value);
  };
  const handleChangeCheck = (e: ChangeEvent<HTMLInputElement>) => {
    console.log(e);
  };
  return (
    <div>
      <form>
        <input type="text" onChange={e => handleChange(e)} />
        <input type="checkbox" onChange={e => handleChangeCheck(e)} />
      </form>
    </div>
  );
};

export default Hi;
```

## onSubmit

```tsx
const Hi = (): JSX.Element => {
  const handleSumit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };
  return (
    <div>
      <form onSubmit={e => handleSumit(e)}></form>
    </div>
  );
};

export default Hi;
```

- 축약형

```tsx
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
```
