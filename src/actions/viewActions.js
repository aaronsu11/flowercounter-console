export const viewVineyardTableAction = () => ({
  type: "viewVineyardTable",
  payload: {}
});

export const viewBlockTableAction = vineyard => ({
  type: "viewBlockTable",
  payload: vineyard
});

export const viewDatasetTableAction = block => ({
  type: "viewDatasetTable",
  payload: block
});

export const viewImageTableAction = dataset => ({
  type: "viewImageTable",
  payload: dataset
});
