import {ReportData} from '@tricordarr/Libraries/Structs/ControllerStructs';
import {ReportContentType} from '@tricordarr/Libraries/Enums/ReportContentType';
import {useTokenAuthMutation} from '@tricordarr/Queries/TokenAuthMutation';
import {useSwiftarrQueryClient} from '@tricordarr/Components/Context/Contexts/SwiftarrQueryClientContext';

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
