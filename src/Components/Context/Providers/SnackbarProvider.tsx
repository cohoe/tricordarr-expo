import React, { PropsWithChildren, useState } from 'react';
import { SnackbarContext } from '@tricordarr/components/Context/Contexts/SnackbarContext';
import { SnackbarPayload } from '@tricordarr/libraries/Types/index';

export const SnackbarProvider = ({ children }: PropsWithChildren) => {
  const [snackbarPayload, setSnackbarPayload] = useState<SnackbarPayload>();
  return <SnackbarContext.Provider value={{ snackbarPayload, setSnackbarPayload }}>{children}</SnackbarContext.Provider>;
};
