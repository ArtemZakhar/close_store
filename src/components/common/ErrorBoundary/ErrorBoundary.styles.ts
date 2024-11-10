export const styles = {
  container(height?: string) {
    return {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      height: height || '100%',
    }
  },
  button: { width: '12rem', marginTop: '1rem' }
}