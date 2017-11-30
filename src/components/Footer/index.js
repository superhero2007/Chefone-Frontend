// @flow

import React from 'react';
import { Link } from 'react-router';

import { fixedCSSModules } from '../../utils';
import styles from './index.module.less';

// const PRIVACY = 'Datenschutz'
const HELP = 'Hilfe';
const CONTACT = 'Kontakt';
// const LEGAL = 'Impressum';
const ABOUT = 'Über CHEF.ONE';
const JOBS = 'Jobs'; // const GIFT_CARD = 'Geschenkgutschein'
const REFUND_POLICY = 'Erstattungsrichtlinien';
const DATA_PROTECTION = 'Datenschutz';
const TERM_OF_SERVICE = 'Geschäftsbedingungen';
const STAY_IN_TOUCH = 'Folge uns ';
const COPYRIGHT = '© 2017 CHEF.ONE Alle Rechte vorbehalten.';

import iconFacebookSvg from '../../../static/icons/icon_facebook.svg';
import iconTwitterSvg from '../../../static/icons/icon_twitter.svg';
import iconInstagramSvg from '../../../static/icons/icon_instagram.svg';
import iconPinterestSvg from '../../../static/icons/pinterest-social-visual-website-logotype.svg';

{
  /* <a href="#">Company</a>
<a href="/privacy" target="_self">{PRIVACY}</a>
<Link to="/legal-disclosure">{LEGAL}</Link> */
}
export default fixedCSSModules(styles, {
  allowMultiple: true,
})(() => (
  <footer>
    <div className="container">
      <div className="row">
        <div className="col-md-3 col-sm-6 col-xs-6">
          <h2>CHEF.ONE</h2>
          <Link to="/about">{ABOUT}</Link>
          <a
            href="https://chefone.zendesk.com/hc/de/articles/115003782313-Allgemeine-Gesch%C3%A4ftsbedingungen"
            target="_blank"
          >
            Geschäftsbedingungen
          </a>
          <a href="https://blog.chef.one" target="_blank">
            Blog
          </a>
          <Link to="/jobs">{JOBS}</Link>
          {/* <a href="" target="_blank">Jobs</a> */}
          {/* <a href="" target="_blank">{GIFT_CARD}</a> */}
        </div>
        <div className="col-md-3 col-sm-6 col-xs-6">
          <h2>Support</h2>
          <a
            target="_blank"
            href="https://chefone.zendesk.com/hc/de/articles/115001257489-CHEF-ONEs-Erstattungsrichtlinien"
          >
            {REFUND_POLICY}
          </a>
          <a href="/privacy">{DATA_PROTECTION}</a>
          <Link to="/AGB">{TERM_OF_SERVICE}</Link>
          <a href="https://chefone.zendesk.com/hc/en-us" target="_blank">
            {HELP}
          </a>
          <a
            href="https://chefone.zendesk.com/hc/en-us/requests/new"
            target="_blank"
          >
            {CONTACT}
          </a>
        </div>
        <div className="col-md-3 col-sm-6 col-xs-12">
          <h2>{STAY_IN_TOUCH}</h2>
          <div styleName="social_icons">
            <a href="https://www.facebook.com/chefdotone" target="_blank">
              <img
                src={iconFacebookSvg}
                alt="Link zu unserer Facebook-Präsenz"
              />
            </a>
            <a href="https://www.twitter.com/chefdotone" target="_blank">
              <img src={iconTwitterSvg} alt="Link zu unserer Twitter Präsenz" />
            </a>
            <a href="https://www.instagram.com/chefdotone" target="_blank">
              <img
                src={iconInstagramSvg}
                alt="Link zu unserer Instagram-Präsenz"
              />
            </a>
            <a href="https://pinterest.com/chefdotone/" target="_blank">
              <img
                src={iconPinterestSvg}
                alt="Link zu unserer Pinterest-Präsenz"
              />
            </a>
          </div>
        </div>
        <div className="col-md-3 col-sm-6 col-xs-12">
          <a
            href="https://itunes.apple.com/us/app/chef.one/id1033123540"
            target="_blank"
            styleName="btn button-app-store"
          />
          <a
            href="https://play.google.com/store/apps/details?id=one.chef.chefone"
            target="_blank"
            styleName="btn button-google-play"
          />
        </div>
      </div>
      <hr />
      <div styleName="copyright">{COPYRIGHT}</div>
    </div>
  </footer>
));
