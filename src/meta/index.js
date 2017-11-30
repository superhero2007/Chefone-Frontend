//@flow
import { event } from '../server/api';
const { getEvents } = event;
import { updateMeta } from '../redux/modules/meta';
import CONFIG from '../universalConfig';
const { env: { KEYWORDS, PUBLIC_URL } } = CONFIG;

const descriptionText = `CHEF.ONE - das AirBnB für die Gastronomie! 

Social Dining / Drinking nennt sich das Konzept, bei dem Menschen zu sich nach Hause einladen um mit anderen tollen Menschen aus ihrer Stadt gemeinsam zu essen oder zu trinken. Ganz getreu dem Motto: "Entdecke die Küchen deiner Stadt"
Bei den Events, die auf der Plattform CHEF.ONE angeboten werden, lernst du in völlig neuer Atmosphäre tolle Leute kennen und wirst gleichzeitig noch kulinarisch verwöhnt! 

Das Tolle daran: Ob Hobbykoch, Mama, Foodblogger oder Sterne Koch: Jeder von euch kann Gastgeber werden! Dafür müsst ihr nur das Herz am rechten Fleck haben.

Aktuell agieren wir in allen großen deutschen Städten wie Hamburg, Hannover, Köln, Düsseldorf, Berlin, München und Wien und arbeiten stetig daran, dies nach und nach auf weitere Städte auszuweiten!`;

const title = 'Entdecke die Küchen Deiner Stadt';

export const defaultMetaPromise = async (props: {
  store: { dispatch: Function },
}) => {
  console.log('MAIN');
  const { store: { dispatch } } = props;

  const events = await getEvents({ limit: 3 });

  const googleStructuredData = [
    {
      '@context': 'http://schema.org',
      '@type': 'Organization',
      url: `${PUBLIC_URL}`,
      logo: `${PUBLIC_URL}/static/chef_one-confirm_logo.png`,
    },
    ...events.map(({ title, chef, eventStart, city, objectId }) => {
      return {
        '@type': 'Event',
        '@context': 'http://schema.org',
        url: `${PUBLIC_URL}/event/${objectId}`,
        name: title,
        location: {
          address: city,
          '@type': 'Place',
          //$FlowIssue
          name: `Bei ${chef.objectIdUser.firstName}`,
        },
        startDate: eventStart,
      };
    }),
  ];

  return dispatch(
    updateMeta({
      image: {
        src: `http://res.cloudinary.com/dudzclibp/image/upload/c_scale,w_600,q_89/v1494616321/chefone_sweet_salty_bymarc_102016-434_720_jw5kq5.jpg`,
        width: 600,
        height: 400,
      },
      description: descriptionText,
      title,
      keywords: KEYWORDS,
      googleStructuredData,
    }),
  );
};
