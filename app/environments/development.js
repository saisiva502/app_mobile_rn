'use strict';

import I18n from '../i18n/_i18n';

exports.ENV = 'development';
exports.I18n = I18n;

exports.QUICK_RECHARGE_URL = 'http://my.o3-telecom.com/rechargeUserAccount';

exports.DEFAULT_FONT = "BahijTheSansArabic-Bold";
exports.DEFAULT_LOCALE = "en";
exports.LTR_LOCALES = ["en"];
exports.KURDISH_LOCALES = ["ku", "kb"];
exports.LOCALIZE_NUMBERS = false;

exports.RLM = `‏‏`;
exports.LRM = `‎`;

exports.CITY_CODES = ["EBL", "DHK", "SRN", "ZKO", "BRD", "KFN"];
exports.EXCLUDED_CITIES = [];
exports.EXCLUDED_BEIS = [3, 9, 10, 29, 35, 36];

exports.O3_PARTNER_CODE = 'OZO-EBL';
exports.MAIN_MENU = require('../json/main_menu.json');
exports.LANGUAGES = require('../json/languages.json');
exports.PARTNERS = require('../json/partners.json');
exports.PACKAGES = require('../json/packages.json');
exports.SERVICES = require('../json/services.json');

exports.BASE_URL = 'http://mobe.o3-telecom.com/api/v1';
exports.API_KEY = 'f3b20db78f6069010ca45c7f3b55acb7';