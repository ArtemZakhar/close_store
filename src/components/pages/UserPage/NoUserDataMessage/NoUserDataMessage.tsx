import { thereAreNoUsers } from '@/helpers/showUserRole';
import { UserRole } from '@/types/users/userType';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

import InviteUser from '@/components/common/InviteUser';

import { styles } from './NoUserDataMessage.styles';

const NoUserDataMessage = ({
  canInviteUser,
  type,
}: {
  canInviteUser?: boolean;
  type: UserRole;
}) => {
  return (
    <Box sx={styles.container}>
      {canInviteUser && type ? (
        <Box sx={styles.modal}>
          <Box sx={styles.wrapper}>
            <Typography variant="h3">{`${thereAreNoUsers(type)} відсутні`}</Typography>

            <Typography variant="body1" sx={{ textAlign: 'center' }}>
              Відправте запрошення на приєднання
            </Typography>

            <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
              <InviteUser type={type} />
            </Box>
          </Box>
        </Box>
      ) : (
        <Box sx={styles.wrapper}>
          <Typography variant="h3">{`${thereAreNoUsers(type)} відсутні`}</Typography>
          <Typography variant="body1" sx={{ textAlign: 'center' }}>
            {`На цій сторінці будуть відображені ${thereAreNoUsers(type)?.toLocaleLowerCase()} після ${type === UserRole.buyer ? 'здійснення покупки' : 'приєднання'}`}
          </Typography>
        </Box>
      )}
    </Box>
  );
};

export default NoUserDataMessage;
