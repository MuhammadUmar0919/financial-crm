export const statusColors = (status) => {
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
  if (successStatus.includes(status)) return "success";
  if (warningStatus.includes(status)) return "warning";
  if (errorStatus.includes(status)) return "error";
  if (infoStatus.includes(status)) return "info";
  if (secondaryStatus.includes(status)) return "secondary";
  if (defaultStatus.includes(status)) return "default";

  // Hali aniqlanmagan status uchun default
  return "default";
};
