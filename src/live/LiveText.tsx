import { useQuery } from "@tanstack/react-query";
import stoatiDecode from "../tools/decodeFullCode";
import getElement from "../tools/getElement";
import { findTextAttribute } from "../tools/dataGetter";

const LiveText = ({ code }: { code: string }) => {
  const { data } = useQuery({
    queryKey: ["Text", code],
    queryFn: async () => {
      const { templateCode, templateAttributeCode } = stoatiDecode(code);

      const data = await getElement(templateCode);

      const name = findTextAttribute(data[0].data, templateAttributeCode);

      return name;
    },
  });

  return data;
};
export default LiveText;
