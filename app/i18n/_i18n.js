import I18n from 'react-native-i18n';

import en from './en';
import ar from './ar';
import kb from './kb';
import ku from './ku';

I18n.fallbacks = true;

I18n.translations = {
  en: en,
  ar: ar,
  kb: kb,
  ku: ku,
};

export default I18n; 