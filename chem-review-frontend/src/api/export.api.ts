import { createHttpInstance } from "./http/api.config";

import type { predictedDrug } from "./prediction.api";

type exportTypes = "csv";

const exportFile = async (
  predictedDrugs: predictedDrug[],
  exportType: exportTypes
) => {
  try {
    const http = createHttpInstance();
    const { data } = await http.post(`/export/prediction`, { predictedDrugs }, {
      params: { type: exportType },
    });
    return data;
  } catch (error) {
    throw error;
  }
};

export { exportFile };
