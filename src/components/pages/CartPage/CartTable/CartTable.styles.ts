export const styles = {
  footer: {
    display: 'flex',
    justifyContent: 'flex-end',
    paddingBlock: '1rem',
  },
  headerItem(condition: boolean) {
    return {
      position: 'relative',
      display: condition ? 'table-cell' : 'none',
    };
  },
};
