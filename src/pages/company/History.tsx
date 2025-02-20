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
