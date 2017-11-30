//@flow

import CONFIG from '../../universalConfig';
import sha1 from 'sha1';
import { getEvents } from '../api/event';
import { getCities } from '../api/cities';
import Sitemap from 'react-router-sitemap';
import createHistory from 'history/lib/createMemoryHistory';
import createStore from '../../redux/create';
import { getJobs } from '../api/jobs';

const { env: { PUBLIC_URL, WWW_PUBLIC_URL, RELEASE } } = CONFIG;

let siteMapSha = '';

export const submitSitemap = () =>
  fetch(`http://google.com/ping?sitemap=${PUBLIC_URL}/sitemap.xml`);

export const regenerateSitemap = async () => {
  console.log('=================');
  console.log('regenerateSitemap');
  console.log('=================');
  const getRoutes = require('../../routes');

  const memoryHistory = createHistory('/');
  const store = createStore(memoryHistory, {});

  const events = await getEvents({});
  const cities = await getCities();
  const jobs = await getJobs();

  const filterConfig = {
    isValid: false,
    rules: [
      /\/events/,
      /\/reviews/,
      /\/email/,
      /\/confirm/,
      /\/auth/,
      /\/unfollow/,
      /\/private-dinner-result/,
      /\/test/,
      /\/admin/,
      /\/signin/,
      /\/forgot-password/,
      /\/order/,
      /\/inbox/,
      /\/booking-details\/:orderId/,
      /\/notfound/,
      /\/landing\/:eventId/,
      /\/landing\/result\/:type/,
    ],
  };
  const paramsConfig = {
    '/event/:eventId': [{ eventId: events.map(e => e.objectId) }],
    '/discover/:cityName': [{ cityName: cities.map(c => c.city) }],
    '/jobs/:id': [{ id: jobs.map(e => e.objectId) }],
  };

  // $FlowIssue
  new Sitemap(getRoutes(store))
    .filterPaths(filterConfig)
    .applyParams(paramsConfig)
    .build(PUBLIC_URL)
    .save('./static/sitemap.xml');
};

export const submitOnChange = async () => {
  console.log('=================');
  console.log('submitOnChange');
  console.log('=================');
  const siteMapText = await fetch(`${PUBLIC_URL}/sitemap.xml`);

  const nextSiteMapSha = sha1(siteMapText);
  if (siteMapSha !== nextSiteMapSha) {
    siteMapSha = nextSiteMapSha;
    await fetch(`http://google.com/ping?sitemap=${PUBLIC_URL}/sitemap.xml`);
    await fetch(`http://google.com/ping?sitemap=${WWW_PUBLIC_URL}/sitemap.xml`);
  }
};

export const onStart = async () => {
  if (!RELEASE) {
    return;
  }
  await regenerateSitemap();
  await submitOnChange();

  setInterval(regenerateSitemap, 1000 * 60 * 15);
  setInterval(submitOnChange, 1000 * 60 * 60);
};
