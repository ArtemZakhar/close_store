export const styles = {
  container: {
    width: '100%',
    display: 'flex',

    justifyContent: 'flex-end',
  },
  modalContainer: {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    borderRadius: 1,
    boxShadow: 24,
    p: 4,
  },
  modalCloseButton: {
    position: 'absolute',
    top: '2.4rem',
    right: '2.5rem',
    padding: '0',
    minWidth: '0',
  },
};
