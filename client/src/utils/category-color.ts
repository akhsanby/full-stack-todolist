export const badgeButton = [
  {
    name: "Uncategorized",
    colorClass: "badge badge-neutral",
  },
  {
    name: "Personal",
    colorClass: "badge badge-primary",
  },
  {
    name: "Work",
    colorClass: "badge badge-secondary",
  },
  {
    name: "Shopping",
    colorClass: "badge badge-accent",
  },
  {
    name: "Health",
    colorClass: "badge badge-info",
  },
  {
    name: "Education",
    colorClass: "badge badge-success",
  },
  {
    name: "Social",
    colorClass: "badge badge-warning",
  },
  {
    name: "Finance",
    colorClass: "badge badge-error",
  },
];

export const setColor = (badgeButtonName: string) => {
  const resultBtn = badgeButton.find((btn) => {
    if (btn.name === badgeButtonName) {
      return btn;
    }
  });
  return resultBtn?.colorClass;
};
