export const styles = {
  blockWrapper: { display: 'flex', gap: '3rem', marginBottom: '2rem' },
  arrow(disabled: boolean | undefined) {
    return {
      color: disabled ? '#909B9F !important' : 'common.black',
    };
  },
  divider: { marginBottom: '1rem' },
};
