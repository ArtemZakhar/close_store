import TableCell, { TableCellProps } from '@mui/material/TableCell';

import { styles } from './TableCellHeader.styles';

type TableCellHeaderProps = TableCellProps & {
  children: React.ReactNode;
  border?: boolean;
  width?: string;
  align?: 'left' | 'right' | 'center' | 'justify' | 'inherit' | undefined;
  whiteSpace?: boolean;
};

const TableCellHeader = ({
  children,
  border,
  width,
  align,
  whiteSpace,
  sx,
}: TableCellHeaderProps) => {
  return (
    <TableCell
      sx={{
        ...styles.headerRow,
        borderRight: border ? '1px solid #E1E1E1' : '',
        whiteSpace: whiteSpace ? 'noWrap' : 'initial',
        width: width,
        ...sx,
      }}
      align={align}
    >
      {children}
    </TableCell>
  );
};

export default TableCellHeader;
