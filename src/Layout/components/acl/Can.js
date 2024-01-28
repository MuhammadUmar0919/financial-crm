// react import
import { createContext } from 'react';
// @casl import
import { createContextualCan } from '@casl/react';

export const AbilityContext = createContext(undefined)

export default createContextualCan(AbilityContext.Consumer)
