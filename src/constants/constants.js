require('dotenv').config();

export const email_constants = {
  contact_help_link: `${process.env.CLIENT_URL}/help`,
  security_policy_link: `${process.env.CLIENT_URL}/security-policy`,
  terms_of_service_link: `${process.env.CLIENT_URL}/terms-of-service`

}

export const payment_method_codes = {
  COD: 'cod',
  VN_PAY: 'vnpay',
  MOMO: 'momo',
}

export const logos = {
  company_logo: "https://images.unsplash.com/photo-1541185933-ef5d8ed016c2"
}

export const contact_information = {
  email: 'vkq265@gmail.com',
  phone: '0919309031',
  name: 'Vũ Khánh Quốc'
}

export const account_roles = {
  NO_ROLE: 'NO_ROLE',
  USER: 'USER',
  ADMIN: 'ADMIN',
  SUPER_ADMIN: 'SUPER_ADMIN',
  EMPLOYEE: 'EMPLOYEE'
}

export const order_status = {
  EMPTY: 'EMPTY',
  PENDING: 'PENDING',
  CANCELLED: 'CANCELLED',
  DELIVERING: 'DELIVERING',
  FINISHED: 'FINISHED',
  NONE: 'NONE'
}

export const cost_types = {
  PURCHASE: 'PURCHASE',
  SALARY: 'SALARY',
  MAINTENANCE: 'MAINTENANCE',
  OTHER: 'OTHER'
}