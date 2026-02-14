import RowHead from './RowHead';

type TableListProps = {};

const list = [
  'Order ID',
  'Customer',
  'Date',
  'Items',
  'Total',
  'Status',
  'Actions',
];

const TableList = ({}: TableListProps) => {
  return list.map((n) => <RowHead rowname={n} />);
};

export default TableList;
