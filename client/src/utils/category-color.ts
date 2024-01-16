export const badgeButton = [
  {
    name: "Uncategorized",
    colorClass: "badge-abu",
  },
  {
    name: "Personal",
    colorClass: "badge-biru",
  },
  {
    name: "Work",
    colorClass: "badge-pink",
  },
  {
    name: "Shopping",
    colorClass: "badge-hijau-muda",
  },
  {
    name: "Health",
    colorClass: "badge-biru-muda",
  },
  {
    name: "Education",
    colorClass: "badge-hijau",
  },
  {
    name: "Social",
    colorClass: "badge-kuning",
  },
  {
    name: "Finance",
    colorClass: "badge-merah-muda",
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
