/**
 *
 * Asynchronously loads the component for MenuBar
 *
 */

import loadable from 'loadable-components';

export default loadable(() => import('./index'));
