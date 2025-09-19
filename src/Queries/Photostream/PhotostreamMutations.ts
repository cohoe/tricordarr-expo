import {useSwiftarrQueryClient} from '@tricordarr/Components/Context/Contexts/SwiftarrQueryClientContext';
import {useTokenAuthMutation} from '@tricordarr/Queries/TokenAuthMutation';
import {PhotostreamUploadData} from '@tricordarr/Libraries/Structs/ControllerStructs';

interface PhotostreamImageMutationProps {
  imageUploadData: PhotostreamUploadData;
}

export const usePhotostreamImageUploadMutation = () => {
  const {apiPost} = useSwiftarrQueryClient();

  const queryHandler = async ({imageUploadData}: PhotostreamImageMutationProps) => {
    return await apiPost<void, PhotostreamUploadData>('/photostream/upload', imageUploadData);
  };

  return useTokenAuthMutation(queryHandler);
};

// There is no delete handler. Per cfry 2024/08/27:
// Mods can delete photos, and letting users delete their photos increases
// the chance people will try posting bad photos and quickly deleting them
// before they can be reported.
