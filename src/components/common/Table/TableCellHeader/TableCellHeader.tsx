import TableCell from '@mui/material/TableCell';

import { styles } from './TableCellHeader.styles';

const TableCellHeader = ({
  children,
  border,
  width,
  align,
  whiteSpace,
}: {
  children: React.ReactNode;
  border?: boolean;
  width?: string;
  align?: 'left' | 'right' | 'center' | 'justify' | 'inherit' | undefined;
  whiteSpace?: boolean;
}) => {
  return (
    <TableCell
      sx={{
        ...styles.headerRow,
        borderRight: border ? '1px solid #E1E1E1' : '',
        whiteSpace: whiteSpace ? 'noWrap' : 'initial',
        width: width,
      }}
      align={align}
    >
      {children}
    </TableCell>
  );
};

export default TableCellHeader;
