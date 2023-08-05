// public_id format:
// victorphotos/floripa/2
const getOrderIdFromPublicId = (public_id: string) =>
  Number(public_id.split("/")[2].replace("_2", ""));

export default getOrderIdFromPublicId;
