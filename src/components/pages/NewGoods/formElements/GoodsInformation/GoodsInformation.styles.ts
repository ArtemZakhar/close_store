export const styles = {
  container(color: string) {
    return {
      border: `1px solid ${color}`,
      borderRadius: '2rem',
      padding: '1rem 2rem',
      display: 'flex',
      flexDirection: 'column',
      gap: '1rem',
      marginBottom: '1rem',
    };
  },
  sectionWrapper: {
    display: 'flex',
    gap: '3rem',
    minHeight: '7rem',
  },
};
