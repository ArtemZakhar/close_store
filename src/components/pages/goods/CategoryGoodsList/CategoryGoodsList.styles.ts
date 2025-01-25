export const styles = {
  container: (color: string) => ({
    marginTop: '2rem',
    backgroundColor: 'common.white',
    paddingBlock: '1.5rem',
    borderRadius: '1.5rem',
    border: `1px solid ${color}`,
  }),
  titlesWrapper: (color: string) => ({
    display: 'flex',
    padding: '0 2rem 1rem',
    borderBottom: `1px solid ${color}`,
  }),
  goodsWrapper: { paddingInline: '1rem' },
};
