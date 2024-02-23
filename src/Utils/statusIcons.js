export const statusIcons = (status) => {
    const lowerStatuse = status?.toLowerCase()
    // Success status icons
    const successIcons = {
        paid: 'mdi:check',
        active: 'mdi:check-circle',
        completed: 'mdi:check-all',
    };

    // Warning status icons
    const warningIcons = {
        pending: 'mdi:chart-pie',
    };

    // Error status icons
    const errorIcons = {
        banned: 'mdi:cancel',
        overdue: 'mdi:clock-alert', // 'mdi:information-outline'
        cancelled: 'mdi:cancel',
        'not-connect': 'mdi:disconnected',
    };

    // Info status icons
    const infoIcons = {
        published: 'mdi:file-document-edit',
        sent: 'mdi:email-send',
        meeting: 'mdi:calendar-clock',
        Downloaded: 'mdi:arrow-down',
    };

    // Secondary status icons
    const secondaryIcons = {
        sent: 'mdi:email-send',
        inactive: 'mdi:account-off',
        rejected: 'mdi:cancel',
    };

    // Default status icons
    const defaultIcons = {
        all: 'mdi:circle',
        draft: 'mdi:file-document-edit', // 'mdi:content-save-outline'
        'no status yet': 'mdi:circle-outline',
        refund: 'mdi:arrow-left',
    };

    // Check and return the corresponding icon for the status
    if (successIcons.hasOwnProperty(lowerStatuse)) return successIcons[lowerStatuse];
    if (warningIcons.hasOwnProperty(lowerStatuse)) return warningIcons[lowerStatuse];
    if (errorIcons.hasOwnProperty(lowerStatuse)) return errorIcons[lowerStatuse];
    if (infoIcons.hasOwnProperty(lowerStatuse)) return infoIcons[lowerStatuse];
    if (secondaryIcons.hasOwnProperty(lowerStatuse)) return secondaryIcons[lowerStatuse];
    if (defaultIcons.hasOwnProperty(lowerStatuse)) return defaultIcons[lowerStatuse];

    // If the status is not found, return a default icon
    return 'mdi:help-circle';
};