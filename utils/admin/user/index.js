import { config } from 'dotenv';
import { User, Role } from '../../../models';
import bcrypt from 'bcryptjs';

config();

const superAdmin = async () => {
  const password = process.env.SUPER_ADMIN_PASSWORD;

  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(password, salt);
  const role = 'SUPER_ADMIN';
  const getRole = await Role.findOne({ where: { name: role } });
  if (!getRole) {
    console.log('YOU CAN CREATE ADMIN ROLE FIRST. hint: `npm run admin:role`');
    return;
  }
  const admin = {
    name: 'SUPER ADMIN',
    email: 'dushimeemma@aol.com',
    password: hash,
    role: getRole.id,
    createdAt: new Date(),
    updatedAt: new Date(),
  };
  await User.create(admin);
  console.log('SUPER ADMIN CREATED');
};

superAdmin();
