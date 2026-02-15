import { capitalize } from '@/utils/capitalize';
import { TableHead } from '../ui/table';

type AdminTableRowProps = {
  rowname: string;
};

const AdminTableRow = (props: AdminTableRowProps) => {
  const capitalizeRowname = capitalize(props.rowname);
  return <TableHead>{capitalizeRowname}</TableHead>;
};

export default AdminTableRow;
