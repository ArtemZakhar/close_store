export const styles = {
  blockWrapper: { marginBottom: '1rem' },
  arrow(disabled: boolean | undefined) {
    return {
      color: disabled ? '#909B9F !important' : 'common.black',
    };
  },
};
