
const navigation = (token) => {
  return [
    {
      type: 'group',
      action: 'read',
      title: 'Dashboards',
      badgeContent: 'new',
      badgeColor: 'error',
      subject: 'dashboards',
      icon: 'mdi:home-outline',
      children: [
        {
          path: '/',
          title: 'CRM',
          type: 'item',
          action: 'read',
          subject: 'dashboards',
        },
        {
          type: 'item',
          action: 'read',
          title: 'Analytics',
          path: '/analytics',
          subject: 'dashboards',
        },
        {
          type: 'item',
          action: 'read',
          title: 'eCommerce',
          path: '/ecommerce',
          subject: 'dashboards',
        }
      ]
    },
    {
      type: 'item',
      action: 'read',
      title: 'Invoice',
      path: '/invoice',
      subject: 'invoice',
      icon: "mdi:invoice-outline"
    },
    {
      type: 'item',
      action: 'read',
      title: 'Service',
      path: '/services',
      subject: 'service',
      icon: "carbon:dns-services"
    },
    {
      type: 'item',
      action: 'read',
      title: 'Clients',
      path: '/clients',
      subject: 'clients',
      icon: 'mdi:account-multiple-outline',
    },
    {
      type: 'item',
      action: 'read',
      title: 'Employees',
      path: '/employees',
      subject: 'employees',
      icon: 'mdi:account-tie-outline',
    },
    {
      type: 'item',
      action: 'read',
      title: 'Admins',
      path: '/admins',
      subject: 'admins',
      icon: 'mdi:account-tie-hat-outline',
    },
    // {
    //   type: 'group',
    //   action: 'read',
    //   subject: 'access-control',
    //   title: 'Roles & Permissions',
    //   icon: 'mdi:shield-account-variant-outline',
    //   children: [
    //     {
    //       type: 'item',
    //       title: 'Roles',
    //       path: '/access-control/roles',
    //       icon: 'clarity:employee-group-line',
    //     },
    //     {
    //       type: 'item',
    //       title: 'Permissions',
    //       icon: 'mdi:account-group-outline',
    //       path: '/access-control/permissions',
    //     }
    //   ]
    // },
    {
      type: 'group',
      action: 'read',
      title: 'Public settings',
      subject: 'public-settings',
      icon: 'mdi:application-settings-outline',
      children: [
        {
          type: 'item',
          action: 'read',
          title: 'Theme',
          subject: 'public-settings',
          path: '/public-settings/themes',
          icon: 'mdi:cookie-settings-outline',
        },
        {
          type: 'item',
          action: 'read',
          title: 'Payment Mode',
          subject: 'public-settings',
          path: '/public-settings/payment-mode',
          icon: 'mdi:credit-card-settings-outline',
        },
        {
          type: 'item',
          action: 'read',
          title: 'Taxes',
          icon: 'mdi:sale-outline',
          subject: 'public-settings',
          // icon: 'mdi:file-percent-outline'
          path: '/public-settings/taxes',
        },
        {
          type: 'item',
          action: 'read',
          title: 'Status',
          subject: 'public-settings',
          icon: 'fluent-mdl2:sync-status',
          path: '/public-settings/statuses',
        },
      ]
    },
    // {
    //   title: 'Auth Pages',
    //   icon: 'mdi:lock-outline',
    //   action: 'read',
    //   subject: 'auth-pages',
    //   children: [
    //     {
    //       title: 'Login',
    //       icon: "mdi:login",
    //       children: [
    //         {
    //           openInNewTab: true,
    //           title: 'Login v1',
    //           path: '/auth/login-v1'
    //         },
    //         {
    //           openInNewTab: true,
    //           title: 'Login v2',
    //           path: '/auth/login-v2'
    //         },
    //         {
    //           openInNewTab: true,
    //           title: 'Login With AppBar',
    //           path: '/auth/login-with-appbar'
    //         }
    //       ]
    //     },
    //     {
    //       title: 'Register',
    //       icon: "mdi:account-plus-outline",
    //       children: [
    //         {
    //           openInNewTab: true,
    //           title: 'Register v1',
    //           path: '/auth/register-v1'
    //         },
    //         {
    //           openInNewTab: true,
    //           title: 'Register v2',
    //           path: '/auth/register-v2'
    //         },
    //         {
    //           openInNewTab: true,
    //           title: 'Register Multi-Steps',
    //           path: '/auth/register-multi-steps'
    //         }
    //       ]
    //     },
    //     {
    //       title: 'Verify Email',
    //       icon: "mdi:email-check-outline",
    //       children: [
    //         {
    //           openInNewTab: true,
    //           title: 'Verify Email v1',
    //           path: '/auth/verify-email-v1'
    //         },
    //         {
    //           openInNewTab: true,
    //           title: 'Verify Email v2',
    //           path: '/auth/verify-email-v2'
    //         }
    //       ]
    //     },
    //     {
    //       title: 'Forgot Password',
    //       icon: "mdi:lock-question",
    //       children: [
    //         {
    //           openInNewTab: true,
    //           title: 'Forgot Password v1',
    //           path: '/auth/forgot-password-v1'
    //         },
    //         {
    //           openInNewTab: true,
    //           title: 'Forgot Password v2',
    //           path: '/auth/forgot-password-v2'
    //         }
    //       ]
    //     },
    //     {
    //       title: 'Reset Password',
    //       icon: "mdi:lock-reset",
    //       children: [
    //         {
    //           openInNewTab: true,
    //           title: 'Reset Password v1',
    //           path: '/auth/reset-password-v1'
    //         },
    //         {
    //           openInNewTab: true,
    //           title: 'Reset Password v2',
    //           path: '/auth/reset-password-v2'
    //         }
    //       ]
    //     },
    //     {
    //       title: 'Two Steps',
    //       icon: "mdi:two-factor-authentication",
    //       children: [
    //         {
    //           openInNewTab: true,
    //           title: 'Two Steps v1',
    //           path: '/auth/two-steps-v1'
    //         },
    //         {
    //           openInNewTab: true,
    //           title: 'Two Steps v2',
    //           path: '/auth/two-steps-v2'
    //         }
    //       ]
    //     }
    //   ]
    // },
    // {
    //   sectionTitle: 'Misc',
    //   action: 'read',
    //   subject: 'acl-page',
    // },
    // {
    //   path: '/acl',
    //   action: 'read',
    //   subject: 'acl-page',
    //   icon: 'mdi:shield-outline',
    //   title: 'Access Control'
    // },
  ]
}

export default navigation;
