import { TableHead, TableRow } from '../ui/table';
import AdminTableRow from './AdminTableRow';

type AdminTableRowListProps = {};

const list = ['image', 'name', 'category', 'brand', 'price', 'stock', 'rating'];
const AdminTableRowList = ({}: AdminTableRowListProps) => {
  return (
    <TableRow>
      {list.map((s) => (
        <AdminTableRow rowname={s} />
      ))}
      <TableHead className="text-right">Actions</TableHead>
    </TableRow>
  );
};

export default AdminTableRowList;
