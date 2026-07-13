import { Permission } from './permission.enum';

const USER_PERMISSIONS = [
  Permission.CREATE_CART,
  Permission.MANAGE_CART,
  Permission.CREATE_ORDER,
  Permission.MANAGE_ORDER,
  Permission.CREATE_PAYMENT,
  Permission.CREATE_SHIPPING,
  Permission.MANAGE_PROFILE,
];

export const ROLE_PERMISSIONS = {
  USER: USER_PERMISSIONS,

  MERCHANT: [
    ...USER_PERMISSIONS,
    Permission.MANAGE_MERCHANT,
    Permission.CREATE_PRODUCT,
    Permission.MANAGE_PRODUCT,
  ],

  ADMIN: Object.values(Permission).filter(
    (perm) =>
      ![
        Permission.CREATE_CART,
        Permission.CREATE_PRODUCT,
        Permission.CREATE_ORDER,
        Permission.CREATE_SHIPPING,
        Permission.MANAGE_ORDER,
      ].includes(perm),
  ),

  // ADMIN: [],
};
