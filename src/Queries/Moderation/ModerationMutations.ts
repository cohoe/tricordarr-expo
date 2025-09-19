import {ReportData} from '../../../Libraries/Structs/ControllerStructs';
import {ReportContentType} from '../../../Libraries/Enums/ReportContentType';
import {useTokenAuthMutation} from '../TokenAuthMutation';
import {useSwiftarrQueryClient} from '../../Context/Contexts/SwiftarrQueryClientContext.ts';

interface ModReportMutationProps {
  contentType: ReportContentType;
  contentID: string | number;
  reportData: ReportData;
}

export const useReportMutation = () => {
  const {apiPost} = useSwiftarrQueryClient();

  const queryHandler = async ({contentType, contentID, reportData}: ModReportMutationProps) => {
    return await apiPost<void, ReportData>(`/${contentType}/${contentID}/report`, reportData);
  };

  return useTokenAuthMutation(queryHandler);
};
