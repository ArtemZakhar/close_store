export const styles = {
  modalCloseButton: {
    position: 'absolute',
    top: '2.5rem',
    right: '2.5rem',
    padding: '0',
    minWidth: '0',
  },
  modalMessageWrapper: { margin: '1rem auto 0', width: '28.25rem' },
  modalTitle(subTitle: string | undefined) {
    return { mt: subTitle ? '3.5rem' : '5.5rem', lineHeight: '2.625rem' };
  },
  modalButtonWrapper: {
    display: 'flex',
    gap: '1rem',
    width: '100%',
  },
  modalButtonBack: { width: '50%', my: '1.5rem', margin: 0 },
};
