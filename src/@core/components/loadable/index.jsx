import { Suspense } from 'react';

// project imports
import Loader, { CircularLoader } from '../loader';

// ==============================|| LOADABLE - LAZY LOADING ||============================== //

const Loadable = (Component) => (props) =>
    (
        <Suspense fallback={<CircularLoader />}>
            <Component {...props} />
        </Suspense>
    );

export default Loadable;
