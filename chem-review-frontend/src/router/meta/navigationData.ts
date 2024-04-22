export type tabData = {
  id: number;
  text: string;
  link: string;
  tag: string;
};

const tabs: tabData[] = [
  {
    id: 1,
    text: "Калькулятор",
    link: "/calculate",
    tag: "calculate",
  },
];

export { tabs };
