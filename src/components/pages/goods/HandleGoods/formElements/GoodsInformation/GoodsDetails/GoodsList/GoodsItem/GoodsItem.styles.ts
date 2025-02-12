export const styles = {
  container(color: string) {
    return {
      borderRadius: '2rem',
      border: `1px solid ${color}`,
      padding: '1rem',
      position: 'relative',
    };
  },
  removeButtonWrapper: {
    position: 'absolute',
    right: '0',
    top: '0',
  },
  removeButton: { fontSize: '1.25rem' },
  sectionWrapper: {
    display: 'flex',
    gap: '3rem',
    marginTop: '1rem',
  },
};
