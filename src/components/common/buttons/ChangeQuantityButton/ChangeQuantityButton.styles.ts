export const styles = {
  button(color: string) {
    return {
      '&.MuiButton-root.Mui-disabled': {
        color: `${color}`,
      },
    };
  },
};
