import Prism from 'prismjs';
import createPrismPlugin from 'draft-js-prism';
import 'prismjs/themes/prism.css';

const prismPlugin = createPrismPlugin({
  prism: Prism,
});

export default prismPlugin;
