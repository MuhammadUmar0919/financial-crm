export const statusColors = (status) => {
  const lowerStatuse = status?.toLowerCase()
  // Success statuslar
  const successStatus = [
    "paid",
    "active",
    // "meeting",
    "completed",
  ];

  // Warning statuslar
  const warningStatus = ["pending"];

  // Error statuslar
  const errorStatus = ["banned", "overdue", "cancelled", "not-connect"];

  // Info statuslar
  const infoStatus = ["published", "sent", "meeting", "Downloaded"];

  // Secondary statuslar
  const secondaryStatus = ["sent", "inactive", "rejected"];

  // Default status
  const defaultStatus = ["all", "draft", "no status yet", "refund"];

  // Statuslarni tekshirib va ulang
  if (successStatus.includes(lowerStatuse)) return "success";
  if (warningStatus.includes(lowerStatuse)) return "warning";
  if (errorStatus.includes(lowerStatuse)) return "error";
  if (infoStatus.includes(lowerStatuse)) return "info";
  if (secondaryStatus.includes(lowerStatuse)) return "secondary";
  if (defaultStatus.includes(lowerStatuse)) return "default";

  // Hali aniqlanmagan status uchun default
  return "default";
};
