/* eslint-disable @typescript-eslint/no-unused-vars */
import { useTranslation } from 'react-i18next';
import { useContext } from 'react';
import { Context } from '../../../../../context/provider';

/* eslint-disable-next-line */
export interface TestsProps {}

export function Tests(props: TestsProps) {
  const { t } = useTranslation();

  const { access_token, setRole, setAdmin } = useContext(Context);

  return <div className="col-12 grid grid-nogutter">In progress...</div>;
}

export default Tests;
