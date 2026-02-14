import { TableHead } from '../ui/table';

type RowHeadProps = {
  rowname: string;
};

const RowHead = ({ rowname }: RowHeadProps) => {
  return <TableHead>{rowname}</TableHead>;
};

export default RowHead;
