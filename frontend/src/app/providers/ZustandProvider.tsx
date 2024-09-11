import React from 'react';
import { Provider } from 'zustand';

const ZustandProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => <Provider>{children}</Provider>;

export default ZustandProvider;
