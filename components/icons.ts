// code for custom icon set copied from expo docs
// https://docs.expo.dev/guides/icons/#createiconsetfromicomoon

import createIconSetFromIcoMoon from '@expo/vector-icons/createIconSetFromIcoMoon';

const Icons = createIconSetFromIcoMoon(
  require('@/assets/icomoon/selection.json'),
  'IcoMoon',
  'icomoon.ttf'
);

export { Icons }