import React, {PropsWithChildren, useState} from 'react';
import {SnackbarContext} from '@tricordarr/Components/Context/Contexts/SnackbarContext';
import {SnackbarPayload} from '../../../Libraries/Types';

export const SnackbarProvider = ({children}: PropsWithChildren) => {
  const [snackbarPayload, setSnackbarPayload] = useState<SnackbarPayload>();
  return <SnackbarContext.Provider value={{snackbarPayload, setSnackbarPayload}}>{children}</SnackbarContext.Provider>;
};
