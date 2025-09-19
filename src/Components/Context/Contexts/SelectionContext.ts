import {createContext, Dispatch, SetStateAction, useContext} from 'react';
import {ForumListData} from '@tricordarr/Libraries/Structs/ControllerStructs';
import {ForumListDataSelectionActionsType} from '@tricordarr/Components/Reducers/Forum/ForumListDataSelectionReducer';

export interface SelectionContextType {
  // selectedItems: TItem[];
  // setSelectedItems: Dispatch<SetStateAction<TItem[]>>;
  selectedForums: ForumListData[];
  dispatchSelectedForums: Dispatch<ForumListDataSelectionActionsType>;
  enableSelection: boolean;
  setEnableSelection: Dispatch<SetStateAction<boolean>>;
}

export const SelectionContext = createContext(<SelectionContextType>{});

export const useSelection = () => useContext(SelectionContext);
