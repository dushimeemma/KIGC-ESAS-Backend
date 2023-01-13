import { Role } from '../../../models';

const role = async () => {
  const newRole = {
    name: 'SUPER_ADMIN',
    description: 'ESAS SUPER ADMIN USER',
    createdAt: new Date(),
    updatedAt: new Date(),
  };
  await Role.create(newRole);
  console.log('SUPER ADMIN ROLE CREATED');
};

role();
