import { ReportData } from '@tricordarr/libraries/Structs/ControllerStructs';
import { ReportContentType } from '@tricordarr/libraries/Enums/ReportContentType';
import { useTokenAuthMutation } from '@tricordarr/components/Queries/TokenAuthMutation';
import { useSwiftarrQueryClient } from '@tricordarr/components/Context/Contexts/SwiftarrQueryClientContext';

interface ModReportMutationProps {
  contentType: ReportContentType;
  contentID: string | number;
  reportData: ReportData;
}

export const useReportMutation = () => {
  const { apiPost } = useSwiftarrQueryClient();

  const queryHandler = async ({ contentType, contentID, reportData }: ModReportMutationProps) => {
    return await apiPost<void, ReportData>(`/${contentType}/${contentID}/report`, reportData);
  };

  return useTokenAuthMutation(queryHandler);
};
