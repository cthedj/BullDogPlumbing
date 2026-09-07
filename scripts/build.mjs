import { mkdir, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const siteUrl = 'https://bulldogplumbing.co.za';
const phoneDisplay = '+27 72 455 8877';
const phoneHref = 'tel:+27724558877';
const whatsappHref = 'https://wa.me/27724558877?text=Hi%20Bulldog%20Plumbing%2C%20I%20need%20help%20with%20a%20plumbing%20job.';
const socialProfiles = {
  facebook: 'https://www.facebook.com/bulldogplumbingza/',
  instagram: 'https://www.instagram.com/bulldog_plumbing_/',
  tiktok: 'https://www.tiktok.com/@bulldogplumbingza'
};
const googleProfileHref = 'https://g.page/r/CbLwKrQVqFdLEAI';
const googleReviewHref = `${googleProfileHref}/review`;
const assetVersion = '20260907-social-carousel-3';
const heroPhotos = {
  planning: { image: 'about.jpg', width: 768, height: 960, alt: 'Bulldog Plumbing team member reviewing plans for a plumbing project' },
  team: { image: 'team.jpg', width: 900, height: 677, alt: 'Three members of the Bulldog Plumbing team', contain: true },
  installation: { image: 'project-attic-installation.jpg', width: 900, height: 1214, alt: 'Bulldog Plumbing setting out an installation with a laser level' },
  pipework: { image: 'project-wall-plumbing.jpg', width: 900, height: 1214, alt: 'Concealed plumbing pipework aligned with a laser level' },
  waterHeater: { image: 'project-water-heater.jpg', width: 900, height: 1214, alt: 'Compact water heater installed with copper pipework' },
  kitchen: { image: 'project-kitchen-mixer.jpg', width: 900, height: 1214, alt: 'Kitchen mixer and sink installed by Bulldog Plumbing' },
  drainInspection: { image: 'project-drain-inspection.png', width: 900, height: 1213, alt: 'Bulldog Plumbing inspecting an underground drain' },
  drainResult: { image: 'project-drain-before-after.jpg', width: 640, height: 640, alt: 'Before and after views of an outside drain cleared by Bulldog Plumbing', contain: true }
};
const serviceHeroPhotos = {
  'emergency-plumber-cape-town': heroPhotos.drainResult,
  'geyser-repairs-cape-town': heroPhotos.waterHeater,
  'blocked-drains-cape-town': heroPhotos.drainResult,
  'leak-detection-cape-town': heroPhotos.pipework,
  'burst-pipe-repairs-cape-town': heroPhotos.pipework,
  'sewer-and-drain-repairs-cape-town': heroPhotos.drainInspection,
  'bathroom-plumbing-cape-town': heroPhotos.pipework,
  'commercial-plumbing-cape-town': heroPhotos.installation
};
const lastModified = '2026-09-07';

const services = [
  {
    slug: 'emergency-plumber-cape-town',
    short: 'Emergency plumbing',
    code: 'SOS',
    title: 'Emergency Plumber Cape Town | After-Hours Help | Bulldog',
    description: 'Need an emergency plumber in Cape Town? Bulldog Plumbing offers urgent after-hours and weekend call-outs for leaks, burst pipes, drains and geyser problems.',
    h1: 'Emergency plumber in Cape Town',
    intro: 'A plumbing emergency can damage floors, walls and fittings quickly. Bulldog Plumbing provides urgent residential and commercial call-outs across Cape Town, including emergency after-hours and weekend work by arrangement.',
    helps: ['Burst or leaking pipes', 'Overflowing or blocked drains', 'Leaking geysers and valves', 'Loss of water from a plumbing fault', 'Urgent toilet or tap failures', 'Sewer smells, gurgling or backups'],
    process: [
      ['Call or WhatsApp', 'Tell us what is happening, where you are and whether water is still flowing. Photos help us understand the job.'],
      ['Make the area safe', 'We will give practical first steps while the call-out is arranged, such as isolating the water supply when appropriate.'],
      ['Diagnose and repair', 'We inspect the cause, explain the available repair and keep you updated before work proceeds.']
    ],
    guidanceTitle: 'What to do while you wait',
    guidance: '<p>If water is escaping rapidly, close the property’s main water shut-off valve if it is safe and accessible. Keep people away from wet electrical fittings and switch off power at the distribution board only if you can do so safely. Move valuables away from the affected area and take a few clear photos for the plumber.</p><p>Do not open a geyser casing, cut into a wall or use harsh drain chemicals during an emergency. These steps can create additional hazards and make the underlying fault harder to assess.</p>',
    faqs: [
      ['Is Bulldog Plumbing available after hours?', 'Emergency call-outs are available after 6pm and on weekends by arrangement. Call or WhatsApp with the problem and your location so availability can be confirmed.'],
      ['What information should I send on WhatsApp?', 'Send your name, suburb, a short description of the problem and clear photos or a brief video if safe. This helps us understand the urgency and prepare for the call-out.'],
      ['Should I turn off my water before the plumber arrives?', 'For a fast-moving leak or burst pipe, isolating the main water supply can limit damage if the valve is safe to reach. If electrical fittings are wet or you are unsure, keep clear and call for guidance.']
    ],
    related: ['burst-pipe-repairs-cape-town', 'blocked-drains-cape-town', 'geyser-repairs-cape-town']
  },
  {
    slug: 'geyser-repairs-cape-town',
    short: 'Geyser repairs',
    code: 'GY',
    title: 'Geyser Repairs Cape Town | Bulldog Plumbing',
    description: 'Geyser repairs in Cape Town for leaks, pressure-valve problems, no hot water and related plumbing faults. Contact Bulldog Plumbing for a free quote.',
    h1: 'Geyser repairs in Cape Town',
    intro: 'No hot water, a dripping overflow or water around the geyser can signal several different faults. Bulldog Plumbing assesses the plumbing side of the system, explains what needs attention and completes the appropriate repair or replacement work.',
    helps: ['Leaking geysers or connected pipework', 'Pressure-control valve problems', 'Dripping overflow pipes', 'No hot water fault assessment', 'Geyser installation pipework', 'Water-damaged fittings around the geyser'],
    process: [
      ['Describe the symptoms', 'Tell us whether there is no hot water, visible leaking, a dripping overflow or an electrical trip.'],
      ['Inspect the system', 'We check the geyser connections, valves and surrounding pipework to identify the likely source of the problem.'],
      ['Explain the repair', 'You receive a clear explanation of the plumbing work required before the repair or replacement proceeds.']
    ],
    guidanceTitle: 'Signs your geyser needs attention',
    guidance: '<p>Water marks on the ceiling, a steady overflow drip, low hot-water pressure, unusual sounds or a sudden loss of hot water all deserve attention. A visible leak should be treated urgently because water can travel through ceilings and walls before the full extent is obvious.</p><p>If the geyser is tripping the electricity, do not repeatedly reset the circuit. Keep away from wet electrical points and arrange an assessment.</p>',
    faqs: [
      ['Can every leaking geyser be repaired?', 'The correct option depends on where the leak originates and the condition of the unit, valves and pipework. An inspection is needed before recommending repair or replacement.'],
      ['Why is water dripping from my geyser overflow?', 'Some discharge can occur as water heats, but a continuous or heavy flow can indicate a valve, pressure or temperature-related problem. A plumber should assess persistent dripping.'],
      ['Do you work on geyser pipework and valves?', 'Yes. Bulldog Plumbing handles geyser-related plumbing, including connected pipework and control-valve problems. Contact us with the symptoms for a free quote.']
    ],
    related: ['emergency-plumber-cape-town', 'leak-detection-cape-town', 'burst-pipe-repairs-cape-town']
  },
  {
    slug: 'blocked-drains-cape-town',
    short: 'Blocked drains',
    code: 'DR',
    title: 'Blocked Drains Cape Town | Bulldog Plumbing',
    description: 'Blocked drain plumber in Cape Town for slow sinks, overflowing drains, gurgling toilets and recurring blockages. Emergency call-outs are available.',
    h1: 'Blocked drain plumber in Cape Town',
    intro: 'Slow water, bad smells and gurgling pipes are often early warnings of a drain problem. Bulldog Plumbing finds the affected section, clears the obstruction where possible and checks for signs of a deeper drainage or sewer issue.',
    helps: ['Blocked sinks and basins', 'Slow showers and baths', 'Overflowing outside drains', 'Gurgling or slow toilets', 'Recurring household blockages', 'Suspected sewer-line problems'],
    process: [
      ['Locate the problem', 'We ask which fixtures are affected and inspect the drainage route to narrow down the blockage.'],
      ['Clear the obstruction', 'The appropriate method depends on the position and nature of the blockage and the condition of the pipe.'],
      ['Check the cause', 'For recurring problems, we look for warning signs that point to damaged pipework or a sewer issue.']
    ],
    guidanceTitle: 'When a blocked drain is urgent',
    guidance: '<p>An overflowing toilet or outside drain, wastewater backing up into a shower, or several fixtures blocking at once should be treated urgently. Stop running water into the affected system and keep children and pets away from wastewater.</p><p>Avoid mixing chemical drain cleaners. They can be hazardous to people working on the line and may damage some plumbing materials without fixing the underlying cause.</p>',
    faqs: [
      ['Why does my drain keep blocking?', 'Repeated blockages can be caused by material collecting in the line, poor flow, damaged pipework or a problem farther along the drainage system. An on-site assessment helps identify the cause.'],
      ['Can I use chemical drain cleaner first?', 'It is safer to avoid mixing or repeatedly using harsh drain chemicals. They may not reach the cause and can create a hazard when the pipe is opened.'],
      ['Do you handle sewer-related blockages?', 'Yes. Bulldog Plumbing works on sewer and drainage problems as well as household blockages. Describe which fixtures are affected when you contact us.']
    ],
    related: ['sewer-and-drain-repairs-cape-town', 'emergency-plumber-cape-town', 'leak-detection-cape-town']
  },
  {
    slug: 'leak-detection-cape-town',
    short: 'Leak detection',
    code: 'LD',
    title: 'Leak Detection Cape Town | Bulldog Plumbing',
    description: 'Leak detection and plumbing repairs in Cape Town for damp patches, hidden water loss, pressure drops and unexplained high usage. Get a free quote.',
    h1: 'Leak detection in Cape Town',
    intro: 'Not every leak is visible. A damp wall, unexplained water use or a pressure drop can point to a concealed plumbing problem. Bulldog Plumbing works methodically to narrow down the source and plan a practical repair.',
    helps: ['Unexplained water usage', 'Damp walls, floors or ceilings', 'Low or changing water pressure', 'Hidden pipe leaks', 'Dripping taps and fixtures', 'Leaks around toilets and basins'],
    process: [
      ['Review the signs', 'We start with what you have noticed, when it began and which parts of the property are affected.'],
      ['Narrow down the source', 'Fixtures, accessible pipework and likely water paths are checked before unnecessary opening-up work is considered.'],
      ['Plan the repair', 'Once the likely source is understood, we explain the repair approach and any access that may be required.']
    ],
    guidanceTitle: 'Simple checks before you call',
    guidance: '<p>Turn off taps and water-using appliances, then check whether the water meter continues to move. Note any damp patches, the time they appear and whether they become worse after a shower, bath or toilet flush. This information can speed up fault-finding.</p><p>A hidden leak can cause structural and finish damage over time, so do not wait for a small mark to become a large one.</p>',
    faqs: [
      ['How do I know if I have a hidden water leak?', 'Common signs include unexplained water usage, a meter that moves while fixtures are off, damp or discoloured surfaces, mould, peeling paint and changing water pressure.'],
      ['Will leak detection damage my walls?', 'The goal is to narrow down the likely source before access work is considered. Some concealed faults still require opening a surface, but methodical diagnosis helps limit unnecessary damage.'],
      ['Can you repair the leak once it is found?', 'Yes. Bulldog Plumbing provides both fault-finding and plumbing repair. The exact repair depends on the pipe, fitting, location and access.']
    ],
    related: ['burst-pipe-repairs-cape-town', 'bathroom-plumbing-cape-town', 'emergency-plumber-cape-town']
  },
  {
    slug: 'burst-pipe-repairs-cape-town',
    short: 'Burst pipe repairs',
    code: 'BP',
    title: 'Burst Pipe Repairs Cape Town | Emergency Help | Bulldog',
    description: 'Fast burst pipe repairs in Cape Town. Bulldog Plumbing offers emergency after-hours and weekend call-outs for leaking and damaged water pipes.',
    h1: 'Burst pipe repairs in Cape Town',
    intro: 'A burst or split pipe needs fast attention. Bulldog Plumbing provides emergency help to isolate the problem, assess the damaged section and complete a durable repair for residential and commercial plumbing systems.',
    helps: ['Sudden high-volume leaks', 'Split or cracked water pipes', 'Damaged exposed pipework', 'Leaking joints and fittings', 'Pressure-related pipe failures', 'Water supply pipe repairs'],
    process: [
      ['Control the water', 'If safe, isolate the main supply and move belongings away from the leak while you contact us.'],
      ['Assess the damaged section', 'We inspect the pipe, surrounding fittings and likely cause before deciding on the repair.'],
      ['Repair and check', 'The failed section is repaired or replaced, then the system is checked for normal operation and further visible leaks.']
    ],
    guidanceTitle: 'Reduce damage from a burst pipe',
    guidance: '<p>Close the main water supply if the valve is safe to reach. Open a cold tap briefly to relieve pressure after the supply is off. Keep away from wet electrical points and do not touch the distribution board if the area around it is wet.</p><p>Photograph visible damage for your records, but do not delay an emergency call-out to document everything.</p>',
    faqs: [
      ['Who do I call for a burst pipe in Cape Town?', `Call Bulldog Plumbing on ${phoneDisplay} or send a WhatsApp message. Emergency after-hours and weekend call-outs are available by arrangement.`],
      ['Can I temporarily tape a burst pipe?', 'Tape is not a reliable repair for a pressurised water pipe. Isolating the water is safer until the damaged section can be assessed and repaired properly.'],
      ['What causes pipes to burst?', 'Causes vary and can include corrosion, damaged fittings, excessive pressure, movement, impact or deterioration. The failed section should be inspected rather than assuming a cause.']
    ],
    related: ['emergency-plumber-cape-town', 'leak-detection-cape-town', 'geyser-repairs-cape-town']
  },
  {
    slug: 'sewer-and-drain-repairs-cape-town',
    short: 'Sewer & drain repairs',
    code: 'SW',
    title: 'Sewer & Drain Repairs Cape Town | Bulldog Plumbing',
    description: 'Sewer and drain repairs in Cape Town for backups, persistent odours, damaged lines and recurring blockages. Contact Bulldog Plumbing for a quote.',
    h1: 'Sewer and drain repairs in Cape Town',
    intro: 'Persistent odours, wastewater backups and repeated blockages can point to a problem beyond a simple fixture blockage. Bulldog Plumbing assesses the drainage system, identifies the likely fault and explains the repair options.',
    helps: ['Recurring drain blockages', 'Sewer smells inside or outside', 'Wastewater backups', 'Gurgling across several fixtures', 'Damaged drainage pipework', 'Residential and commercial sewer faults'],
    process: [
      ['Map the symptoms', 'We establish which fixtures and drains are affected and whether the problem is isolated or property-wide.'],
      ['Inspect the drainage route', 'Accessible points are checked to locate the obstruction or damaged section as accurately as possible.'],
      ['Recommend the right repair', 'We explain whether clearing, localised repair or further investigation is the sensible next step.']
    ],
    guidanceTitle: 'Protect people and property',
    guidance: '<p>Stop using fixtures that feed into a backed-up drain. Keep people and pets away from wastewater, ventilate affected areas and avoid trying to dismantle contaminated pipework without suitable protection.</p><p>Recurring sewer symptoms should not be masked with fragrances or chemicals. They need a plumbing assessment to find the source.</p>',
    faqs: [
      ['What are signs of a sewer-line problem?', 'Several slow or gurgling fixtures, persistent sewer smells, outside drain overflows and wastewater backing up at the lowest fixture can all indicate a deeper drainage problem.'],
      ['Is every recurring blockage a broken pipe?', 'No. Recurring problems have several possible causes. The drainage route and pattern of symptoms need to be assessed before a repair is recommended.'],
      ['Do you work on commercial drainage?', 'Yes. Bulldog Plumbing provides residential and commercial plumbing services, including drainage and sewer-related work.']
    ],
    related: ['blocked-drains-cape-town', 'commercial-plumbing-cape-town', 'emergency-plumber-cape-town']
  },
  {
    slug: 'commercial-plumbing-cape-town',
    short: 'Commercial plumbing',
    code: 'CO',
    title: 'Commercial Plumber Cape Town | Bulldog Plumbing',
    description: 'Commercial plumbing in Cape Town for repairs, drainage, installations and urgent call-outs. Clear communication, practical solutions and free quotes.',
    h1: 'Commercial plumber in Cape Town',
    intro: 'Plumbing downtime can interrupt staff, customers and tenants. Bulldog Plumbing supports Cape Town businesses and managed properties with repairs, installations, drainage work and urgent call-outs, with clear updates throughout the job.',
    helps: ['Office and retail plumbing repairs', 'Commercial toilets and basins', 'Drain and sewer problems', 'Leaking or damaged pipework', 'Plumbing alterations and installations', 'Urgent commercial call-outs'],
    process: [
      ['Define the impact', 'Tell us what is affected, whether the premises can operate and who the on-site contact will be.'],
      ['Assess and communicate', 'We inspect the fault and explain practical options, access needs and likely disruption.'],
      ['Complete and hand over', 'Work is carried out with updates for the responsible contact and the repaired system is checked before handover.']
    ],
    guidanceTitle: 'Plumbing support that respects your operation',
    guidance: '<p>Commercial work needs more than a technical repair. Access, trading hours, staff safety and communication with the responsible person all matter. Share any site rules, shut-off constraints or preferred work windows when requesting a quote.</p><p>For urgent water loss, isolate the affected supply if safe and protect stock, equipment and public areas until assistance arrives.</p>',
    faqs: [
      ['What types of commercial properties do you help?', 'Bulldog Plumbing can assess plumbing work for offices, shops and other business or managed properties. Send the address and scope so the job can be confirmed.'],
      ['Can work be arranged around business operations?', 'Share your operating hours and access constraints when requesting the quote. The practical work plan can then account for site access and likely disruption.'],
      ['Do you provide urgent commercial call-outs?', 'Yes. Emergency after-hours and weekend call-outs are available by arrangement. Explain the operational impact and whether water is still flowing when you call.']
    ],
    related: ['emergency-plumber-cape-town', 'sewer-and-drain-repairs-cape-town', 'bathroom-plumbing-cape-town']
  },
  {
    slug: 'bathroom-plumbing-cape-town',
    short: 'Bathroom plumbing',
    code: 'BA',
    title: 'Bathroom Plumbing Cape Town | Bulldog Plumbing',
    description: 'Bathroom plumbing in Cape Town for repairs, alterations, sanitary fittings, pipework and drainage. Plan your installation with Bulldog Plumbing.',
    h1: 'Bathroom plumbing in Cape Town',
    intro: 'Good bathroom plumbing starts behind the finishes. Bulldog Plumbing handles pipework, drainage, fixtures and plumbing alterations for bathroom repairs and upgrades, with careful planning before walls and floors are closed.',
    helps: ['Bathroom pipework and alterations', 'Toilet, basin and tap plumbing', 'Shower and bath connections', 'Bathroom drainage', 'Leaks around sanitary fittings', 'Plumbing for bathroom upgrades'],
    process: [
      ['Review the layout', 'We discuss the existing plumbing, proposed fixtures and the practical position of water and waste connections.'],
      ['Plan the plumbing work', 'The sequence is coordinated so pipework and drainage are completed before finishes restrict access.'],
      ['Install and test', 'Connections and fittings are installed, checked and prepared for the next stage of the bathroom work.']
    ],
    guidanceTitle: 'Plan plumbing before buying every fitting',
    guidance: '<p>Measurements, water pressure, waste positions and access can affect which fixtures are practical. Review these details before committing to a final bathroom layout or purchasing concealed fittings.</p><p>If other trades are involved, agree on the sequence early. Plumbing that will sit behind tiles or cabinetry must be checked before finishes are installed.</p>',
    faqs: [
      ['Can you move bathroom plumbing for a new layout?', 'Bathroom pipework can often be altered, but the available route, floor construction, drainage fall and access need to be assessed first.'],
      ['Do you install toilets, basins and taps?', 'Yes. Bulldog Plumbing works on common bathroom sanitary fittings and their water and waste connections.'],
      ['When should the plumber be involved in a bathroom renovation?', 'Bring the plumber in during planning and before finishes begin. Early input helps avoid layouts that conflict with drainage, pipe routes or access.']
    ],
    related: ['leak-detection-cape-town', 'blocked-drains-cape-town', 'commercial-plumbing-cape-town']
  }
];

const areas = [
  {
    slug: 'southern-suburbs',
    cardTitle: 'Southern Suburbs plumbing',
    code: 'SS',
    title: 'Plumber Southern Suburbs Cape Town | Bulldog Plumbing',
    description: 'Local plumber serving Cape Town’s Southern Suburbs from Dreyersdal. Weekday plumbing, emergency call-outs, geysers, drains and leak detection.',
    h1: 'Plumber in Cape Town’s Southern Suburbs',
    intro: 'Based in Dreyersdal, Bulldog Plumbing provides residential and commercial plumbing call-outs across the Southern Suburbs. Contact us with your address and plumbing problem so we can confirm coverage and arrange the right help.',
    places: ['Dreyersdal', 'Bergvliet', 'Tokai', 'Constantia', 'Wynberg', 'Claremont', 'Plumstead', 'Diep River', 'Retreat', 'Steenberg'],
    body: '<p>Southern Suburbs properties range from older homes with ageing pipework to apartment blocks, renovated bathrooms and busy commercial spaces. That variety means the right repair starts with a careful assessment rather than a one-size-fits-all answer.</p><p>Bulldog Plumbing handles urgent leaks, geyser-related plumbing, blocked drains, sewer work, pipe repairs and planned installations. The team communicates clearly from the first call and offers free quotes.</p>',
    faqs: [
      ['Which Southern Suburbs do you cover?', 'Bulldog Plumbing is based in Dreyersdal and serves nearby Southern Suburbs including Bergvliet, Tokai, Constantia, Wynberg, Claremont, Plumstead, Diep River, Retreat and Steenberg. Confirm availability for your address when booking.'],
      ['Can I arrange an after-hours call-out?', 'Emergency call-outs are available after 6pm and on weekends by arrangement. Contact the team with your location and problem so availability and the quote can be confirmed.'],
      ['Can I send photos before the call-out?', 'Yes. Photos or a brief video can help the team understand the visible symptoms and prepare for the visit. Do not enter an unsafe or flooded area to take them.']
    ]
  },
  {
    slug: 'dreyersdal',
    cardTitle: 'Plumber in Dreyersdal',
    code: 'DY',
    title: 'Plumber Dreyersdal | Emergency Call-Outs | Bulldog',
    description: 'Need a plumber in Dreyersdal? Bulldog Plumbing is locally based for weekday repairs, blocked drains, geysers, installations and emergency call-outs.',
    h1: 'Your local plumber in Dreyersdal',
    intro: 'Bulldog Plumbing is based in Dreyersdal, Cape Town. Local homeowners and businesses can call for weekday repairs, planned plumbing work and emergency assistance outside regular hours by arrangement.',
    places: ['Dreyersdal', 'Bergvliet', 'Tokai', 'Diep River', 'Retreat', 'Steenberg'],
    body: '<p>Having a plumber based nearby makes it easier to explain local access, property type and the urgency of a fault. Tell us what you can see, whether the water has been isolated and which part of the property is affected.</p><p>We help with burst and leaking pipes, geyser-related plumbing, blocked drains, hidden leaks, sewer problems, bathroom plumbing and commercial work. Free quotes are available.</p>',
    faqs: [
      ['Where is Bulldog Plumbing based?', 'Bulldog Plumbing is based at 7 Winchester Close, Dreyersdal, Cape Town, 7945. Call before visiting so the team can confirm availability.'],
      ['Do you offer emergency plumbing in Dreyersdal?', 'Yes. Emergency after-hours and weekend call-outs are available by arrangement. Call with the problem and address so availability can be confirmed.'],
      ['What services can I book locally?', 'Services include leak and pipe repairs, geyser-related plumbing, blocked drains, sewer work, bathroom plumbing and commercial plumbing.']
    ]
  }
];

const pages = [
  { path: '/', output: 'index.html', kind: 'home', title: 'Plumber Cape Town | Emergency Call-Outs | Bulldog Plumbing', description: 'Reliable Cape Town plumber open Monday to Friday, 8am–6pm. Emergency after-hours and weekend call-outs, repairs, geysers, drains and free quotes.' },
  { path: '/services/', output: 'services/index.html', kind: 'services', title: 'Plumbing Services Cape Town | Bulldog Plumbing', description: 'Explore Bulldog Plumbing’s Cape Town services: emergency call-outs, geyser repairs, blocked drains, leak detection, pipe and sewer repairs.' },
  ...services.map((service) => ({ path: `/services/${service.slug}/`, output: `services/${service.slug}/index.html`, kind: 'service', title: service.title, description: service.description, data: service })),
  { path: '/areas/', output: 'areas/index.html', kind: 'areas', title: 'Cape Town Plumbing Service Areas | Bulldog Plumbing', description: 'Bulldog Plumbing serves Cape Town from Dreyersdal, with local coverage across the Southern Suburbs. Check service areas and request a free quote.' },
  ...areas.map((area) => ({ path: `/areas/${area.slug}/`, output: `areas/${area.slug}/index.html`, kind: 'area', title: area.title, description: area.description, data: area })),
  { path: '/about/', output: 'about/index.html', kind: 'about', title: 'About Bulldog Plumbing | Cape Town Plumbers', description: 'Meet Bulldog Plumbing, a Cape Town plumbing team focused on honest communication, professional workmanship and lasting residential and commercial solutions.' },
  { path: '/contact/', output: 'contact/index.html', kind: 'contact', title: 'Contact Bulldog Plumbing | Free Cape Town Quote', description: `Call ${phoneDisplay} or WhatsApp Bulldog Plumbing. Open weekdays 8am–6pm, with emergency after-hours and weekend call-outs by arrangement.` },
  { path: '/privacy/', output: 'privacy/index.html', kind: 'privacy', title: 'Privacy Notice | Bulldog Plumbing', description: 'Read the Bulldog Plumbing website privacy notice, including how WhatsApp quote requests and external links work.' }
];

const icons = {
  phone: '<svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.79 19.79 0 0 1 2.12 4.18 2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.69 2.8a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.33 1.85.56 2.81.69A2 2 0 0 1 22 16.92z"/></svg>',
  whatsapp: '<svg aria-hidden="true" viewBox="0 0 24 24" fill="currentColor"><path d="M20.5 3.5A11.8 11.8 0 0 0 12.08 0C5.55 0 .23 5.32.23 11.86c0 2.09.55 4.13 1.6 5.93L.13 24l6.35-1.67a11.84 11.84 0 0 0 5.6 1.43h.01c6.53 0 11.85-5.32 11.85-11.86 0-3.17-1.22-6.15-3.44-8.4Zm-8.41 18.25h-.01a9.8 9.8 0 0 1-5-1.37l-.36-.22-3.77.99 1-3.67-.24-.38a9.83 9.83 0 1 1 8.38 4.65Zm5.39-7.37c-.29-.15-1.75-.86-2.02-.96-.27-.1-.47-.15-.67.15-.2.3-.76.96-.93 1.16-.17.2-.34.22-.64.07-.3-.15-1.25-.46-2.38-1.47a8.96 8.96 0 0 1-1.65-2.06c-.17-.3-.02-.46.13-.61.13-.13.3-.34.44-.52.15-.17.2-.3.3-.49.1-.2.05-.37-.03-.52-.07-.15-.67-1.61-.91-2.2-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.79.37-.27.3-1.04 1.01-1.04 2.47s1.07 2.88 1.21 3.08c.15.2 2.1 3.2 5.08 4.49.71.31 1.26.49 1.7.63.71.23 1.36.19 1.87.12.57-.09 1.75-.72 2-1.41.25-.69.25-1.28.17-1.41-.07-.12-.27-.2-.56-.34Z"/></svg>',
  facebook: '<svg aria-hidden="true" viewBox="0 0 24 24" fill="currentColor"><path d="M14 8.5V7.2c0-1 .7-1.2 1.2-1.2H18V2.1L14.6 2C10.8 2 10 4.8 10 6.7v1.8H8V13h2v9h4v-9h3.4l.5-4.5H14Z"/></svg>',
  instagram: '<svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><path d="M17.5 6.5h.01"/></svg>',
  tiktok: '<svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M15 4v10a4 4 0 1 1-4-4"/><path d="M15 4c.8 2.1 2.2 3.5 4 4"/></svg>',
  star: '<svg aria-hidden="true" viewBox="0 0 24 24" fill="currentColor"><path d="m12 2.7 2.8 5.7 6.3.9-4.5 4.4 1.1 6.2-5.7-3-5.7 3 1.1-6.2-4.5-4.4 6.3-.9L12 2.7Z"/></svg>',
  menu: '<svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M4 7h16M4 12h16M4 17h16"/></svg>'
};

function routeToFile(route) {
  return route === '/' ? 'index.html' : `${route.replace(/^\//, '')}index.html`;
}

function href(page, route) {
  const from = path.posix.dirname(page.output);
  let result = path.posix.relative(from, routeToFile(route));
  result = result.replace(/index\.html$/, '');
  return result || './';
}

function asset(page, file) {
  return path.posix.relative(path.posix.dirname(page.output), file) || path.posix.basename(file);
}

function canonical(route) {
  return `${siteUrl}${route}`;
}

function faqSchema(faqs) {
  return {
    '@type': 'FAQPage',
    mainEntity: faqs.map(([question, answer]) => ({
      '@type': 'Question',
      name: question,
      acceptedAnswer: { '@type': 'Answer', text: answer }
    }))
  };
}

function breadcrumbSchema(items) {
  return {
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: canonical(item.path)
    }))
  };
}

function graphFor(page, faqs = [], crumbs = []) {
  const business = {
    '@type': ['Plumber', 'LocalBusiness'],
    '@id': `${siteUrl}/#business`,
    name: 'Bulldog Plumbing',
    url: `${siteUrl}/`,
    logo: `${siteUrl}/assets/img/logo.png`,
    image: `${siteUrl}/assets/img/about.jpg`,
    telephone: '+27-72-455-8877',
    sameAs: [...Object.values(socialProfiles), googleProfileHref],
    address: {
      '@type': 'PostalAddress',
      streetAddress: '7 Winchester Close',
      addressLocality: 'Dreyersdal',
      addressRegion: 'Western Cape',
      postalCode: '7945',
      addressCountry: 'ZA'
    },
    areaServed: [
      { '@type': 'City', name: 'Cape Town' },
      { '@type': 'AdministrativeArea', name: 'Southern Suburbs, Cape Town' }
    ],
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '+27-72-455-8877',
      contactType: 'emergency service',
      areaServed: 'ZA',
      availableLanguage: 'English'
    },
    openingHoursSpecification: {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
      opens: '08:00',
      closes: '18:00'
    }
  };
  const webPage = {
    '@type': 'WebPage',
    '@id': `${canonical(page.path)}#webpage`,
    url: canonical(page.path),
    name: page.title,
    description: page.description,
    inLanguage: 'en-ZA',
    isPartOf: { '@id': `${siteUrl}/#website` },
    about: { '@id': `${siteUrl}/#business` }
  };
  const graph = [
    business,
    {
      '@type': 'WebSite',
      '@id': `${siteUrl}/#website`,
      url: `${siteUrl}/`,
      name: 'Bulldog Plumbing',
      inLanguage: 'en-ZA',
      publisher: { '@id': `${siteUrl}/#business` }
    },
    webPage
  ];
  if (page.kind === 'service') {
    graph.push({
      '@type': 'Service',
      '@id': `${canonical(page.path)}#service`,
      name: page.data.h1,
      description: page.description,
      serviceType: page.data.short,
      areaServed: { '@type': 'City', name: 'Cape Town' },
      provider: { '@id': `${siteUrl}/#business` },
      url: canonical(page.path)
    });
  }
  if (page.kind === 'area') {
    graph.push({
      '@type': 'Service',
      '@id': `${canonical(page.path)}#local-service`,
      name: page.data.h1,
      serviceType: 'Plumbing services',
      areaServed: page.data.places.map((name) => ({ '@type': 'Place', name })),
      provider: { '@id': `${siteUrl}/#business` },
      url: canonical(page.path)
    });
  }
  if (faqs.length) graph.push(faqSchema(faqs));
  if (crumbs.length) graph.push(breadcrumbSchema(crumbs));
  return { '@context': 'https://schema.org', '@graph': graph };
}

function head(page, graph) {
  const image = `${siteUrl}/assets/img/logo.png`;
  return `<!doctype html>
<html lang="en-ZA">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>${page.title}</title>
  <meta name="description" content="${page.description}">
  <meta name="author" content="Bulldog Plumbing">
  <meta name="robots" content="${page.kind === '404' ? 'noindex, follow' : 'index, follow, max-image-preview:large'}">
  <meta name="theme-color" content="#080b2c">
  <meta name="google-site-verification" content="jyPO2We-y-w-3WQgOROG-udO_XwBv_lLoh4i1YZwRTw">
  <link rel="canonical" href="${canonical(page.path)}">
  <link rel="icon" href="${asset(page, 'favicon.ico')}" sizes="any">
  <link rel="apple-touch-icon" href="${asset(page, 'assets/img/logo.png')}">
  <link rel="manifest" href="${asset(page, 'site.webmanifest')}">
  <link rel="stylesheet" href="${asset(page, 'assets/css/styles.css')}?v=${assetVersion}">
  <meta property="og:type" content="website">
  <meta property="og:locale" content="en_ZA">
  <meta property="og:site_name" content="Bulldog Plumbing">
  <meta property="og:title" content="${page.title}">
  <meta property="og:description" content="${page.description}">
  <meta property="og:url" content="${canonical(page.path)}">
  <meta property="og:image" content="${image}">
  <meta property="og:image:alt" content="Bulldog Plumbing logo">
  <meta name="twitter:card" content="summary">
  <meta name="twitter:title" content="${page.title}">
  <meta name="twitter:description" content="${page.description}">
  <meta name="twitter:image" content="${image}">
  <script type="application/ld+json">${JSON.stringify(graph)}</script>
  <script defer src="${asset(page, 'assets/js/site.js')}?v=${assetVersion}"></script>
</head>`;
}

function active(page, root) {
  return page.path.startsWith(root) ? ' aria-current="page"' : '';
}

function header(page) {
  return `<body>
<a class="skip-link" href="#main-content">Skip to main content</a>
<div class="topbar">
  <div class="container topbar__inner">
    <p>Mon–Fri 08:00–18:00 · Emergency call-outs after hours & weekends</p>
    <a href="${phoneHref}">${phoneDisplay}</a>
  </div>
</div>
<header class="site-header">
  <nav class="container nav" aria-label="Main navigation">
    <a class="brand" href="${href(page, '/')}">
      <img src="${asset(page, 'assets/img/logo.png')}" width="340" height="340" alt="Bulldog Plumbing">
      <span>Bulldog<br>Plumbing</span>
    </a>
    <button class="menu-button" type="button" aria-expanded="false" aria-controls="main-menu" aria-label="Open menu" data-menu-button>${icons.menu}</button>
    <div class="nav__links" id="main-menu" data-menu data-open="false">
      <a href="${href(page, '/services/')}"${active(page, '/services/')}>Services</a>
      <a href="${href(page, '/areas/')}"${active(page, '/areas/')}>Areas</a>
      <a href="${href(page, '/about/')}"${active(page, '/about/')}>About</a>
      <a href="${href(page, '/contact/')}"${active(page, '/contact/')}>Contact</a>
      <a class="button" href="${whatsappHref}" target="_blank" rel="noopener">${icons.whatsapp} Free quote</a>
    </div>
  </nav>
</header>`;
}

function footer(page) {
  return `<footer class="site-footer">
  <div class="container">
    <div class="footer-connect">
      <div class="footer-connect__intro">
        <p class="eyebrow">Follow Bulldog</p>
        <h2>See more of the work.</h2>
      </div>
      <nav class="social-links" aria-label="Follow Bulldog Plumbing">
        <a href="${socialProfiles.facebook}" target="_blank" rel="noopener noreferrer"><span class="social-links__icon">${icons.facebook}</span><span>Facebook</span></a>
        <a href="${socialProfiles.instagram}" target="_blank" rel="noopener noreferrer"><span class="social-links__icon">${icons.instagram}</span><span>Instagram</span></a>
        <a href="${socialProfiles.tiktok}" target="_blank" rel="noopener noreferrer"><span class="social-links__icon">${icons.tiktok}</span><span>TikTok</span></a>
        <a href="${whatsappHref}" target="_blank" rel="noopener noreferrer"><span class="social-links__icon">${icons.whatsapp}</span><span>WhatsApp</span></a>
      </nav>
      <a class="footer-review" href="${googleReviewHref}" target="_blank" rel="noopener noreferrer">
        <span class="footer-review__icon">${icons.star}</span>
        <span><small>Worked with Bulldog?</small><strong>Review us on Google</strong></span>
        <span aria-hidden="true">→</span>
      </a>
    </div>
    <div class="footer-grid">
      <div class="footer-brand">
        <img src="${asset(page, 'assets/img/logo.png')}" width="340" height="340" loading="lazy" alt="Bulldog Plumbing">
        <p>Reliable residential and commercial plumbing across Cape Town, open weekdays with emergency call-outs available after hours and on weekends.</p>
      </div>
      <div class="footer-col">
        <h2>Popular services</h2>
        <ul>
          <li><a href="${href(page, '/services/emergency-plumber-cape-town/')}">Emergency plumber</a></li>
          <li><a href="${href(page, '/services/geyser-repairs-cape-town/')}">Geyser repairs</a></li>
          <li><a href="${href(page, '/services/blocked-drains-cape-town/')}">Blocked drains</a></li>
          <li><a href="${href(page, '/services/leak-detection-cape-town/')}">Leak detection</a></li>
        </ul>
      </div>
      <div class="footer-col">
        <h2>Bulldog</h2>
        <ul>
          <li><a href="${href(page, '/services/')}">All services</a></li>
          <li><a href="${href(page, '/areas/')}">Areas served</a></li>
          <li><a href="${href(page, '/about/')}">About us</a></li>
          <li><a href="${href(page, '/privacy/')}">Privacy</a></li>
        </ul>
      </div>
      <div class="footer-col">
        <h2>Contact</h2>
        <ul>
          <li><a href="${phoneHref}">${phoneDisplay}</a></li>
          <li><a href="${whatsappHref}" target="_blank" rel="noopener">WhatsApp Bulldog</a></li>
          <li><a href="${googleProfileHref}" target="_blank" rel="noopener noreferrer">7 Winchester Close,<br>Dreyersdal, Cape Town</a></li>
          <li>Mon–Fri: 08:00–18:00</li>
          <li>Closed weekends</li>
          <li>Emergency call-outs available</li>
        </ul>
      </div>
    </div>
    <div class="footer-bottom">
      <p>© <span data-year>${new Date().getFullYear()}</span> Bulldog Plumbing. All rights reserved.</p>
      <p>Serving Cape Town from Dreyersdal, Western Cape.</p>
    </div>
  </div>
</footer>
<div class="mobile-actions" aria-label="Quick contact">
  <a href="${phoneHref}">${icons.phone} Call now</a>
  <a href="${whatsappHref}" target="_blank" rel="noopener">${icons.whatsapp} WhatsApp</a>
</div>
</body>
</html>`;
}

function breadcrumb(page, items) {
  return `<ol class="breadcrumb" aria-label="Breadcrumb">${items.map((item, i) => `<li>${i === items.length - 1 ? item.name : `<a href="${href(page, item.path)}">${item.name}</a>`}</li>`).join('')}</ol>`;
}

function innerHero(page, { eyebrow, h1, intro, photo, crumbs }) {
  return `<section class="hero hero--inner${photo ? '' : ' hero--text'}">
  <div class="container hero__grid">
    <div class="hero__copy">
      ${breadcrumb(page, crumbs)}
      <p class="eyebrow">${eyebrow}</p>
      <h1>${h1}</h1>
      <p class="lead">${intro}</p>
      <div class="button-row">
        <a class="button button--light" href="${phoneHref}">${icons.phone} Call ${phoneDisplay}</a>
        <a class="button button--whatsapp" href="${whatsappHref}" target="_blank" rel="noopener">${icons.whatsapp} WhatsApp for a quote</a>
      </div>
    </div>
${photo ? `    <div class="hero__visual">
      <img class="hero__photo${photo.contain ? ' hero__photo--contain' : ''}" src="${asset(page, `assets/img/${photo.image}`)}" width="${photo.width}" height="${photo.height}" fetchpriority="high" decoding="async" alt="${photo.alt}">
      <span class="hero__photo-badge" aria-hidden="true"><strong>8–6</strong><small>Mon–Fri</small></span>
    </div>` : ''}
  </div>
</section>`;
}

function trustStrip() {
  return `<div class="trust-strip">
  <div class="container trust-strip__grid">
    <div class="trust-item">Mon–Fri · 8am–6pm</div>
    <div class="trust-item">Free quotes</div>
    <div class="trust-item">Emergency call-outs</div>
    <div class="trust-item">Homes & businesses</div>
  </div>
</div>`;
}

function faqSection(faqs) {
  return `<section class="section section--warm">
  <div class="narrow">
    <p class="eyebrow">Straight answers</p>
    <h2>Frequently asked questions</h2>
    <div class="faq-list">
      ${faqs.map(([question, answer]) => `<details><summary>${question}</summary><p>${answer}</p></details>`).join('\n      ')}
    </div>
  </div>
</section>`;
}

function reviewCta() {
  return `<section class="section section--review" id="google-reviews">
  <div class="container">
    <div class="review-panel">
      <span class="review-panel__icon">${icons.star}</span>
      <div><p class="eyebrow">Google reviews</p><h2>Tell Cape Town how Bulldog did.</h2><p>If Bulldog Plumbing has worked at your home or business, share an honest review. Your experience helps local customers choose with confidence.</p></div>
      <a class="button button--light" href="${googleReviewHref}" target="_blank" rel="noopener noreferrer">Share your experience <span aria-hidden="true">→</span></a>
    </div>
  </div>
</section>`;
}

function ctaPanel(page, heading = 'Need a plumber in Cape Town?') {
  return `<section class="section">
  <div class="container">
    <div class="cta-panel">
      <div>
        <p class="eyebrow">Let’s sort it out</p>
        <h2>${heading}</h2>
        <p>Tell us what is happening and where you are. Photos are welcome if the area is safe.</p>
      </div>
      <div class="cta-panel__actions">
        <a class="button" href="${phoneHref}">${icons.phone} Call ${phoneDisplay}</a>
        <a class="button button--whatsapp" href="${whatsappHref}" target="_blank" rel="noopener">${icons.whatsapp} WhatsApp Bulldog</a>
      </div>
    </div>
  </div>
</section>`;
}

function serviceCards(page, limit = services.length) {
  return `<div class="card-grid">${services.slice(0, limit).map((service) => `<article class="card">
  <span class="card__icon" aria-hidden="true">${service.code}</span>
  <h3>${service.short}</h3>
  <p>${service.intro.split('. ')[0]}.</p>
  <a class="text-link" href="${href(page, `/services/${service.slug}/`)}">View service <span aria-hidden="true">→</span></a>
</article>`).join('\n')}</div>`;
}

function projectGallery(page) {
  const projects = [
    {
      image: 'project-attic-installation.jpg', width: 900, height: 1214,
      title: 'Installation planning', description: 'Setting out an attic installation with laser-level accuracy.'
    },
    {
      image: 'project-wall-plumbing.jpg', width: 900, height: 1214,
      title: 'Concealed plumbing', description: 'Neat pipework positioned accurately before the wall is closed.'
    },
    {
      image: 'project-water-heater.jpg', width: 900, height: 1214,
      title: 'Hot-water installation', description: 'Compact under-counter water heating with new copper pipework.'
    },
    {
      image: 'project-kitchen-mixer.jpg', width: 900, height: 1214,
      title: 'Kitchen plumbing', description: 'A clean mixer and sink installation ready for everyday use.'
    },
    {
      image: 'project-drain-inspection.png', width: 900, height: 1213,
      title: 'Drain inspection', description: 'Hands-on investigation to locate and resolve a drainage fault.'
    },
    {
      image: 'project-drain-before-after.jpg', width: 640, height: 640,
      title: 'Outside drain restored', description: 'A blocked outside drain cleared and flowing again.',
      source: 'https://www.instagram.com/bulldog_plumbing_/p/DbSl7ayEhUN/'
    }
  ];

  return `<section class="section section--projects" id="projects">
  <div class="container">
    <div class="section-head">
      <div><p class="eyebrow">Real work. Real results.</p><h2>Our plumbing projects in action</h2><p class="section-lead">A look at recent Bulldog Plumbing installations, repairs and drain work around Cape Town.</p></div>
      <a class="text-link" href="${socialProfiles.instagram}" target="_blank" rel="noopener noreferrer">See more on Instagram <span aria-hidden="true">→</span></a>
    </div>
    <div class="project-carousel" data-carousel data-interval="7000" aria-roledescription="carousel" aria-label="Bulldog Plumbing project photographs">
      <div class="project-carousel__stage">
        ${projects.map((project, index) => `<figure class="project-slide${index === 0 ? ' is-active' : ''}${project.source ? ' project-slide--social' : ''}" data-carousel-slide aria-roledescription="slide" aria-label="${index + 1} of ${projects.length}: ${project.title}" aria-hidden="${index === 0 ? 'false' : 'true'}">
          <div class="project-slide__media">${project.source ? `<a href="${project.source}" target="_blank" rel="noopener noreferrer" aria-label="View ${project.title} on Instagram">` : ''}<img src="${asset(page, `assets/img/${project.image}`)}" width="${project.width}" height="${project.height}" loading="lazy" decoding="async" alt="${project.description}">${project.source ? '</a>' : ''}</div>
          <figcaption><strong>${project.title}</strong><span>${project.description}${project.source ? ' View the original post on Instagram.' : ''}</span></figcaption>
        </figure>`).join('\n        ')}
      </div>
      <div class="project-carousel__nav">
        <div class="project-carousel__dots" aria-label="Choose a project photograph">
          ${projects.map((project, index) => `<button type="button" data-carousel-dot="${index}" aria-label="Show ${project.title}" aria-current="${index === 0 ? 'true' : 'false'}"></button>`).join('')}
        </div>
      </div>
    </div>
  </div>
</section>`;
}

function homeBody(page) {
  const faqs = [
    ['What are Bulldog Plumbing’s working hours?', 'Regular working hours are Monday to Friday from 8am to 6pm. The business is closed for routine work on weekends, but emergency after-hours and weekend call-outs are available by arrangement.'],
    ['Which plumbing services do you provide?', 'Services include emergency plumbing, geyser repairs, burst pipes, blocked drains, leak detection, sewer and drain work, bathroom plumbing and commercial plumbing.'],
    ['Do you offer free plumbing quotes?', 'Yes. Call or send the job details and photos on WhatsApp to request a free quote. Some work may require an on-site assessment before the scope can be confirmed.'],
    ['Which areas do you serve?', 'Bulldog Plumbing is based in Dreyersdal and serves Cape Town, with a strong local focus on the Southern Suburbs. Contact the team to confirm coverage for your address.']
  ];
  return {
    faqs,
    crumbs: [],
    html: `<main id="main-content">
<section class="hero">
  <div class="container hero__grid">
    <div class="hero__copy">
      <p class="eyebrow">Cape Town · Mon–Fri 8am–6pm</p>
      <h1>Reliable plumber in Cape Town</h1>
      <p class="lead">Reliable plumbing repairs, geyser services, blocked drains, leak detection and installations for Cape Town homes and businesses—with clear communication and free quotes.</p>
      <div class="button-row">
        <a class="button button--light" href="${phoneHref}">${icons.phone} Call ${phoneDisplay}</a>
        <a class="button button--whatsapp" href="${whatsappHref}" target="_blank" rel="noopener">${icons.whatsapp} Get a free quote</a>
      </div>
    </div>
    <div class="hero__image-wrap">
      <img class="hero__image" src="${asset(page, 'assets/img/about.jpg')}" width="768" height="960" fetchpriority="high" alt="Plumber reviewing plans for a Cape Town plumbing job">
      <div class="hero__badge">Emergency<br>call-outs<br>after hours</div>
    </div>
  </div>
</section>
${trustStrip()}
<section class="section section--warm">
  <div class="container">
    <div class="section-head">
      <div><p class="eyebrow">What we fix</p><h2>Cape Town plumbing services</h2><p class="section-lead">From a leak that cannot wait to a bathroom upgrade that needs careful planning, Bulldog brings the same clear, practical approach.</p></div>
      <a class="text-link" href="${href(page, '/services/')}">See every service <span aria-hidden="true">→</span></a>
    </div>
    ${serviceCards(page, 6)}
  </div>
</section>
${projectGallery(page)}
<section class="section section--ink">
  <div class="container">
    <div class="section-head"><div><p class="eyebrow">Urgent problem?</p><h2>Do these three things first</h2></div></div>
    <div class="steps">
      <article class="step"><h3>Control the water</h3><p>If safe, close the main water shut-off valve to limit damage from an active leak.</p></article>
      <article class="step"><h3>Keep clear of electrics</h3><p>Do not touch wet plugs, fittings or the distribution board. Move people away from the area.</p></article>
      <article class="step"><h3>Call Bulldog</h3><p>Describe the fault and your suburb. Send photos on WhatsApp if it is safe to take them.</p></article>
    </div>
  </div>
</section>
<section class="section">
  <div class="container split">
    <div class="split__image">
      <img src="${asset(page, 'assets/img/team.jpg')}" width="900" height="677" loading="lazy" decoding="async" alt="Three members of the Bulldog Plumbing team">
      <div class="quote-mark">“We don’t just fix problems; we build trust.”</div>
    </div>
    <div>
      <p class="eyebrow">The Bulldog standard</p>
      <h2>Honest work. Clear updates. Lasting solutions.</h2>
      <p class="section-lead">Plumbing problems are stressful enough. Our job is to explain what is happening, keep you informed and complete the work with care.</p>
      <ul class="check-list">
        <li>Residential plumbing</li><li>Commercial plumbing</li><li>Free quotes</li><li>Weekday service</li><li>Emergency call-outs</li><li>Cape Town based</li>
      </ul>
      <div class="button-row"><a class="button" href="${href(page, '/about/')}">Meet Bulldog Plumbing</a></div>
    </div>
  </div>
</section>
<section class="section section--blush">
  <div class="container split">
    <div>
      <p class="eyebrow">Local coverage</p>
      <h2>Based in Dreyersdal. Serving Cape Town.</h2>
      <p class="section-lead">We provide plumbing call-outs across Cape Town, with a strong local focus on the Southern Suburbs. Send your address when booking so we can confirm coverage.</p>
      <div class="button-row"><a class="button" href="${href(page, '/areas/')}">View service areas</a></div>
    </div>
    <ul class="check-list">
      <li>Dreyersdal</li><li>Bergvliet</li><li>Tokai</li><li>Constantia</li><li>Wynberg</li><li>Claremont</li><li>Plumstead</li><li>Diep River</li>
    </ul>
  </div>
</section>
${faqSection(faqs)}
${reviewCta()}
${ctaPanel(page)}
</main>`
  };
}

function servicesBody(page) {
  const crumbs = [{ name: 'Home', path: '/' }, { name: 'Services', path: '/services/' }];
  return {
    faqs: [],
    crumbs,
    html: `<main id="main-content">
${innerHero(page, { eyebrow: 'Residential & commercial', h1: 'Plumbing services in Cape Town', intro: 'Urgent repairs, planned improvements and dependable plumbing support for Cape Town homes and businesses.', photo: heroPhotos.installation, crumbs })}
${trustStrip()}
<section class="section section--warm">
  <div class="container">
    <div class="section-head"><div><p class="eyebrow">Choose a service</p><h2>How Bulldog can help</h2><p class="section-lead">Each service page explains common warning signs, what to do next and how we approach the job.</p></div></div>
    ${serviceCards(page)}
  </div>
</section>
<section class="section section--ink">
  <div class="container split">
    <div><p class="eyebrow">Not sure what you need?</p><h2>Start with the symptoms.</h2><p class="lead">Tell us what you can see, hear or smell, which fixtures are affected and when the problem started. We will help narrow down the right next step.</p></div>
    <ul class="check-list"><li>Water leaking now</li><li>No hot water</li><li>Drain overflowing</li><li>Damp wall or ceiling</li><li>Low water pressure</li><li>Planned installation</li></ul>
  </div>
</section>
${ctaPanel(page, 'Tell us what your plumbing is doing.')}
</main>`
  };
}

function serviceBody(page) {
  const service = page.data;
  const crumbs = [{ name: 'Home', path: '/' }, { name: 'Services', path: '/services/' }, { name: service.short, path: page.path }];
  const related = service.related.map((slug) => services.find((item) => item.slug === slug));
  return {
    faqs: service.faqs,
    crumbs,
    html: `<main id="main-content">
${innerHero(page, { eyebrow: 'Cape Town plumbing service', h1: service.h1, intro: service.intro, photo: serviceHeroPhotos[service.slug], crumbs })}
${trustStrip()}
<section class="section">
  <div class="container details-grid">
    <div class="prose">
      <p class="eyebrow">How we can help</p>
      <h2>Practical help for the whole problem</h2>
      <ul class="check-list">${service.helps.map((item) => `<li>${item}</li>`).join('')}</ul>
      <h2>${service.guidanceTitle}</h2>
      ${service.guidance}
    </div>
    <aside class="aside-card" aria-label="Contact Bulldog Plumbing">
      <h2>Get a free quote</h2>
      <p>Send your suburb, the symptoms and photos if safe. For urgent water loss, call now.</p>
      <a class="button" href="${phoneHref}">${icons.phone} Call now</a>
      <a class="button button--whatsapp" href="${whatsappHref}" target="_blank" rel="noopener">${icons.whatsapp} WhatsApp</a>
    </aside>
  </div>
</section>
<section class="section section--ink">
  <div class="container">
    <div class="section-head"><div><p class="eyebrow">What to expect</p><h2>A clear three-step approach</h2></div></div>
    <div class="steps">${service.process.map(([title, text]) => `<article class="step"><h3>${title}</h3><p>${text}</p></article>`).join('')}</div>
  </div>
</section>
${faqSection(service.faqs)}
<section class="section">
  <div class="container">
    <div class="section-head"><div><p class="eyebrow">Related services</p><h2>More ways we can help</h2></div><a class="text-link" href="${href(page, '/services/')}">All services <span aria-hidden="true">→</span></a></div>
    <div class="card-grid">${related.map((item) => `<article class="card"><span class="card__icon" aria-hidden="true">${item.code}</span><h3>${item.short}</h3><p>${item.intro.split('. ')[0]}.</p><a class="text-link" href="${href(page, `/services/${item.slug}/`)}">View service <span aria-hidden="true">→</span></a></article>`).join('')}</div>
  </div>
</section>
${ctaPanel(page, `Need help with ${service.short.toLowerCase()}?`)}
</main>`
  };
}

function areasBody(page) {
  const crumbs = [{ name: 'Home', path: '/' }, { name: 'Areas', path: '/areas/' }];
  return {
    faqs: [],
    crumbs,
    html: `<main id="main-content">
${innerHero(page, { eyebrow: 'Local Cape Town coverage', h1: 'Plumbing service areas', intro: 'Bulldog Plumbing is based in Dreyersdal and serves Cape Town, with a strong focus on the Southern Suburbs. Send your address to confirm availability.', photo: heroPhotos.team, crumbs })}
${trustStrip()}
<section class="section section--warm">
  <div class="container">
    <div class="section-head"><div><p class="eyebrow">Close to home</p><h2>Our local coverage</h2><p class="section-lead">Based in Dreyersdal, we serve homes and businesses across Cape Town’s Southern Suburbs. Choose an area or send your address to confirm a call-out.</p></div></div>
    <div class="card-grid">${areas.map((area) => `<article class="card"><span class="card__icon" aria-hidden="true">${area.code}</span><h3>${area.cardTitle}</h3><p>${area.intro}</p><a class="text-link" href="${href(page, `/areas/${area.slug}/`)}">View area <span aria-hidden="true">→</span></a></article>`).join('')}
      <article class="card"><span class="card__icon" aria-hidden="true">?</span><h3>Another Cape Town suburb?</h3><p>Send us your address and the type of plumbing help you need. We will confirm coverage when arranging the call-out.</p><a class="text-link" href="${href(page, '/contact/')}">Check your address <span aria-hidden="true">→</span></a></article>
    </div>
  </div>
</section>
${ctaPanel(page, 'Check plumbing availability for your suburb.')}
</main>`
  };
}

function areaBody(page) {
  const area = page.data;
  const crumbs = [{ name: 'Home', path: '/' }, { name: 'Areas', path: '/areas/' }, { name: area.slug === 'dreyersdal' ? 'Dreyersdal' : 'Southern Suburbs', path: page.path }];
  return {
    faqs: area.faqs,
    crumbs,
    html: `<main id="main-content">
${innerHero(page, { eyebrow: 'Local plumbing coverage', h1: area.h1, intro: area.intro, photo: area.slug === 'dreyersdal' ? heroPhotos.kitchen : heroPhotos.installation, crumbs })}
${trustStrip()}
<section class="section">
  <div class="container details-grid">
    <div class="prose">
      <p class="eyebrow">Local service</p><h2>Plumbing help near you</h2>${area.body}
      <h2>Services available</h2>
      <ul class="check-list">${services.slice(0, 8).map((item) => `<li><a href="${href(page, `/services/${item.slug}/`)}">${item.short}</a></li>`).join('')}</ul>
      <h2>Areas commonly served</h2>
      <p>${area.places.join(', ')}. Service is arranged by address, so please confirm availability when booking.</p>
    </div>
    <aside class="aside-card"><h2>Confirm your address</h2><p>Send your suburb, street and a short description of the plumbing problem.</p><a class="button" href="${phoneHref}">${icons.phone} Call now</a><a class="button button--whatsapp" href="${whatsappHref}" target="_blank" rel="noopener">${icons.whatsapp} WhatsApp</a></aside>
  </div>
</section>
${faqSection(area.faqs)}
${ctaPanel(page, `Looking for a plumber in ${area.slug === 'dreyersdal' ? 'Dreyersdal' : 'the Southern Suburbs'}?`)}
</main>`
  };
}

function aboutBody(page) {
  const crumbs = [{ name: 'Home', path: '/' }, { name: 'About', path: '/about/' }];
  return {
    faqs: [], crumbs,
    html: `<main id="main-content">
${innerHero(page, { eyebrow: 'About Bulldog Plumbing', h1: 'Plumbing work built on trust', intro: 'We provide reliable residential and commercial plumbing with honest communication, professional care and the determination to finish the job properly.', photo: heroPhotos.team, crumbs })}
<section class="section">
  <div class="container split">
    <div class="split__image"><img src="${asset(page, 'assets/img/team.jpg')}" width="900" height="677" alt="Three members of the Bulldog Plumbing team"></div>
    <div><p class="eyebrow">Our mission</p><h2>Keep homes and businesses running smoothly.</h2><p class="section-lead">From a leaking tap to a complex sewer problem, the principle is the same: understand the fault, explain the work and deliver a lasting solution.</p><p>Bulldog Plumbing serves residential and commercial customers from Dreyersdal across Cape Town. Clear updates matter throughout every job, because customers should know what is happening in their property.</p><ul class="check-list"><li>Honest communication</li><li>Practical solutions</li><li>Careful workmanship</li><li>Emergency call-outs</li></ul></div>
  </div>
</section>
<section class="section section--ink"><div class="container"><div class="section-head"><div><p class="eyebrow">What matters</p><h2>The Bulldog approach</h2></div></div><div class="steps"><article class="step"><h3>Listen first</h3><p>The visible symptom is only the start. We ask questions and inspect before deciding on the repair.</p></article><article class="step"><h3>Explain clearly</h3><p>We describe what we find and the practical next step without burying the answer in jargon.</p></article><article class="step"><h3>Finish properly</h3><p>The goal is dependable plumbing and a customer who understands the work that was completed.</p></article></div></div></section>
${ctaPanel(page, 'Put Bulldog on your plumbing problem.')}
</main>`
  };
}

function contactForm() {
  return `<form class="contact-form" data-whatsapp-form>
  <div class="field"><label for="name">Your name</label><input id="name" name="name" autocomplete="name" required></div>
  <div class="field"><label for="area">Suburb / area</label><input id="area" name="area" autocomplete="address-level2" required></div>
  <div class="field field--full"><label for="service">What do you need help with?</label><select id="service" name="service" required><option value="">Choose a service</option>${services.map((service) => `<option>${service.short}</option>`).join('')}<option>Something else</option></select></div>
  <div class="field field--full"><label for="message">What is happening?</label><textarea id="message" name="message" placeholder="Tell us what you can see, when it started and whether water is still flowing." required></textarea></div>
  <p class="field-hint">Submitting opens WhatsApp with your details. Nothing is stored by this website.</p>
  <button class="button button--whatsapp field--full" type="submit">${icons.whatsapp} Continue in WhatsApp</button>
</form>`;
}

function contactBody(page) {
  const crumbs = [{ name: 'Home', path: '/' }, { name: 'Contact', path: '/contact/' }];
  return {
    faqs: [], crumbs,
    html: `<main id="main-content">
${innerHero(page, { eyebrow: 'Free plumbing quotes', h1: 'Contact Bulldog Plumbing', intro: 'Call for an urgent problem or send the job details on WhatsApp. Include your Cape Town suburb and photos if they are safe to take.', photo: heroPhotos.planning, crumbs })}
<section class="section section--warm">
  <div class="container contact-grid">
    <div><p class="eyebrow">Talk to a plumber</p><h2>Open weekdays, 8am–6pm.</h2><p class="section-lead">We are closed for routine work on weekends. Emergency after-hours and weekend call-outs are available by arrangement—call to confirm assistance.</p><div class="contact-links"><a class="contact-link" href="${phoneHref}">${icons.phone} ${phoneDisplay}</a><a class="contact-link" href="${whatsappHref}" target="_blank" rel="noopener">${icons.whatsapp} Message us on WhatsApp</a><a class="contact-link" href="${googleProfileHref}" target="_blank" rel="noopener noreferrer">7 Winchester Close, Dreyersdal, Cape Town, 7945</a></div></div>
    ${contactForm()}
  </div>
</section>
<section class="section"><div class="narrow prose"><p class="eyebrow">For a useful first message</p><h2>What to include</h2><ul><li>Your name and suburb</li><li>The fixture or area affected</li><li>When the problem started</li><li>Whether water is still flowing</li><li>Photos or a short video, only if safe</li><li>Any access or timing constraints</li></ul><p>For a dangerous situation involving water and electricity, keep clear of the area and call for urgent guidance.</p></div></section>
</main>`
  };
}

function privacyBody(page) {
  const crumbs = [{ name: 'Home', path: '/' }, { name: 'Privacy', path: '/privacy/' }];
  return {
    faqs: [], crumbs,
    html: `<main id="main-content">
${innerHero(page, { eyebrow: 'Website information', h1: 'Privacy notice', intro: 'A plain-language explanation of how this website handles information and links to external services.', crumbs })}
<section class="section"><div class="narrow prose">
  <p>Last updated: 4 September 2026</p>
  <h2>Information you choose to share</h2><p>This website does not submit or store the quote-form details on its own server. When you use the quote form, your browser prepares a WhatsApp message containing the details you entered. You choose whether to send that message in WhatsApp.</p>
  <h2>Phone and WhatsApp</h2><p>Calls and messages are handled through your phone provider or WhatsApp. Their terms and privacy practices apply when you use those services. Bulldog Plumbing uses the information you send to respond to your enquiry, prepare a quote and provide requested plumbing services.</p>
  <h2>External links</h2><p>The website includes links to WhatsApp, telephone services, Google Maps and Bulldog Plumbing social profiles. Following those links takes you to an external service with its own privacy practices.</p>
  <h2>Cookies and analytics</h2><p>The current website does not set advertising cookies or run third-party analytics. If analytics or advertising tools are added later, this notice and any required consent controls should be updated before they go live.</p>
  <h2>Your choices</h2><p>Only share information needed for the plumbing enquiry. Do not use the website or WhatsApp form to send payment-card details, passwords or other highly sensitive information.</p>
  <h2>Contact</h2><p>For questions about information shared with Bulldog Plumbing, call <a href="${phoneHref}">${phoneDisplay}</a>.</p>
</div></section>
</main>`
  };
}

function pageBody(page) {
  if (page.kind === 'home') return homeBody(page);
  if (page.kind === 'services') return servicesBody(page);
  if (page.kind === 'service') return serviceBody(page);
  if (page.kind === 'areas') return areasBody(page);
  if (page.kind === 'area') return areaBody(page);
  if (page.kind === 'about') return aboutBody(page);
  if (page.kind === 'contact') return contactBody(page);
  if (page.kind === 'privacy') return privacyBody(page);
  throw new Error(`Unknown page kind: ${page.kind}`);
}

async function write(relativePath, content) {
  const outputPath = path.join(root, relativePath);
  await mkdir(path.dirname(outputPath), { recursive: true });
  await writeFile(outputPath, content, 'utf8');
}

for (const page of pages) {
  const body = pageBody(page);
  const graph = graphFor(page, body.faqs, body.crumbs);
  await write(page.output, `${head(page, graph)}\n${header(page)}\n${body.html}\n${footer(page)}`);
}

const notFoundPage = { path: '/404.html', output: '404.html', kind: '404', title: 'Page Not Found | Bulldog Plumbing', description: 'The requested Bulldog Plumbing page could not be found.' };
const notFoundGraph = graphFor(notFoundPage);
await write('404.html', `${head(notFoundPage, notFoundGraph)}
${header(notFoundPage)}
<main id="main-content">
  <section class="hero hero--inner hero--text"><div class="container hero__grid"><div class="hero__copy"><p class="eyebrow">404 · Page not found</p><h1>That page has gone down the drain.</h1><p class="lead">The link may be old or the address may have been typed incorrectly.</p><div class="button-row"><a class="button button--light" href="${href(notFoundPage, '/')}">Back to home</a><a class="button button--whatsapp" href="${whatsappHref}" target="_blank" rel="noopener">${icons.whatsapp} Contact Bulldog</a></div></div></div></section>
</main>
${footer(notFoundPage)}`);

await write('robots.txt', `User-agent: *
Allow: /

Sitemap: ${siteUrl}/sitemap.xml
`);

await write('sitemap.xml', `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${pages.map((page) => `  <url><loc>${canonical(page.path)}</loc><lastmod>${lastModified}</lastmod><changefreq>${page.kind === 'home' ? 'weekly' : 'monthly'}</changefreq><priority>${page.kind === 'home' ? '1.0' : page.kind === 'service' ? '0.8' : '0.6'}</priority></url>`).join('\n')}
</urlset>
`);

await write('site.webmanifest', JSON.stringify({
  name: 'Bulldog Plumbing',
  short_name: 'Bulldog',
  description: 'Cape Town plumbing services with weekday hours and emergency after-hours call-outs.',
  start_url: './',
  display: 'standalone',
  background_color: '#fffdfb',
  theme_color: '#080b2c',
  icons: [{ src: 'assets/img/logo.png', sizes: '340x340', type: 'image/png', purpose: 'any' }]
}, null, 2));

await write('.nojekyll', '');

console.log(`Built ${pages.length + 1} HTML pages.`);
