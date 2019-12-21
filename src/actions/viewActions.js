export const viewVineyardTableAction = () => ({
  type: "viewVineyardTable",
  payload: {}
});

export const viewBlockTableAction = vineyard => ({
  type: "viewBlockTable",
  payload: vineyard
});
