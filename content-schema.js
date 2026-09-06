/* The admin panel's Page Text form is generated from this file. Each
   field key matches the path in the page's DEFAULTS object on the
   frontend — if the two ever disagree, an edit saves but never shows.

   `now` is the wording currently compiled into the site. It is shown in
   the form as the box's placeholder so the editor can see what they are
   replacing. It is display only: if it drifts from the frontend the
   site is unaffected, only the hint is stale.

   type:
     text     — single line
     textarea — paragraph
     lines    — one entry per line, saved as a list
     image    — upload, replaces the page banner
     list     — repeating group with Add and Delete
*/

const banner = (label, title, accent, image) => [
    {
        key: 'banner.image', label: 'Banner image', type: 'image',
        now: image,
    },
    { key: 'banner.label', label: 'Banner — small label above the title', type: 'text', now: label },
    { key: 'banner.title', label: 'Banner — title', type: 'text', now: title },
    { key: 'banner.accent', label: 'Banner — the words in red', type: 'text', now: accent },
];

const PAGES = [
    {
        key: 'about',
        label: 'About Us',
        group: 'About',
        url: '/about',
        fields: [
            ...banner('ABOUT US', 'Forged in Fire, Built for', 'Eternity', '/about-banner.jpeg'),
            {
                key: 'intro', label: 'Opening paragraph', type: 'textarea',
                now: 'As a proud concern of the century-old Anwar Group, Anwar Ispat has led the mild steel industry since 1978. We were the first to introduce 60-grade steel to Bangladesh and have consistently upgraded our facilities to bring the world\'s most advanced technology to the local market. From the tallest skyscrapers to complex nuclear power plants, our commitment to quality ensures that every structure built with Anwar Ispat is resilient, durable, and safe.',
            },
            {
                key: 'timeline.title', label: 'Heritage timeline — heading', type: 'text',
                now: 'A legacy to value in the present, and to pass on to future generations',
            },
            {
                key: 'timeline.items', label: 'Heritage milestones — the years on the line', type: 'list',
                now: '29 milestones from 1834 to 2022',
                item: [
                    { key: 'year', label: 'Year', type: 'text' },
                    { key: 'name', label: 'Name', type: 'text' },
                    { key: 'text', label: 'Description', type: 'text' },
                ],
            },
            { key: 'why.eyebrow', label: 'Why Anwar Ispat — small label', type: 'text', now: 'WHY ANWAR ISPAT' },
            { key: 'why.title', label: 'Why Anwar Ispat — heading', type: 'text', now: 'Six reasons builders choose us' },
            {
                key: 'why.items', label: 'Reasons', type: 'list',
                now: '190+ Years of Legacy · European Technology · Pioneer in Innovation · Earthquake Resistant · Precision Quality · Nation Builder',
                item: [
                    { key: 'title', label: 'Title', type: 'text' },
                    { key: 'body', label: 'Description', type: 'textarea' },
                ],
            },
        ],
    },
    {
        key: 'about-vision',
        label: 'Vision, Mission & Values',
        group: 'About',
        url: '/about/vision',
        fields: [
            ...banner('VISION, MISSION & VALUES', 'Since 1834,', 'Forged in Purpose', '/vision-mission.jpeg'),
            { key: 'vision.tag', label: 'Vision — small label', type: 'text', now: 'Vision' },
            { key: 'vision.title', label: 'Vision — heading', type: 'text', now: 'Continuing the heritage' },
            {
                key: 'vision.body', label: 'Vision — text', type: 'textarea',
                now: 'Continuing the heritage of being pioneers in industries and leaders in development.',
            },
            { key: 'mission.tag', label: 'Mission — small label', type: 'text', now: 'Mission' },
            { key: 'mission.title', label: 'Mission — heading', type: 'text', now: 'Transformative growth' },
            {
                key: 'mission.body', label: 'Mission — text', type: 'textarea',
                now: 'At Anwar Group, our vision and mission converge in a steadfast pursuit of transformative growth and societal progress. Rooted in our heritage, we strive to lead across industries, embracing sustainability and ethics. Through innovation and global expansion, we contribute to economic development. Empowered by excellence and a limitless mindset, we shape a meaningful future.',
            },
            { key: 'values.eyebrow', label: 'Values — small label', type: 'text', now: 'OUR VALUES' },
            {
                key: 'values.items', label: 'Values', type: 'list',
                now: 'Continuous Innovation · Business Diversity · Environmental Consciousness · Quality Leadership · Employee Friendliness',
                item: [
                    { key: 'title', label: 'Title', type: 'text' },
                    { key: 'text', label: 'Description', type: 'textarea' },
                ],
            },
        ],
    },
    {
        key: 'about-leadership',
        label: 'Leadership Team',
        group: 'About',
        url: '/about/leadership',
        fields: [
            ...banner('LEADERSHIP', 'Steering the', 'Legacy', '/Leadership-banner.jpeg'),
            {
                key: 'people', label: 'Leaders', type: 'list',
                now: 'Manwar Hossain · Furkaan N Hossain · Waeez R Hossain',
                item: [
                    { key: 'name', label: 'Name', type: 'text' },
                    { key: 'role', label: 'Position', type: 'text' },
                    { key: 'org', label: 'Organisation', type: 'text' },
                    { key: 'photo', label: 'Photograph', type: 'image-url' },
                    { key: 'bio', label: 'Biography — one paragraph per line', type: 'lines' },
                    {
                        key: 'facts',
                        label: 'Facts under the biography — one per line, as  Label | Value',
                        type: 'lines',
                    },
                ],
            },
        ],
    },
    {
        key: 'sustainability-esg',
        label: 'ESG',
        group: 'Sustainability',
        url: '/sustainability/esg',
        fields: [
            ...banner('SUSTAINABILITY', 'Sustainable Steel', 'Development', '/sustainable-steel.jpg'),
            {
                key: 'lede', label: 'Opening paragraph', type: 'textarea',
                now: 'Championing the Sustainable Development Goals through how the mill is run — sustainable business practice, community empowerment and environmental stewardship.',
            },
            {
                key: 'stats', label: 'Figures', type: 'list',
                now: '48+ Years responsible · ZERO Waste water discharge · 07 SDG commitments',
                item: [
                    { key: 'n', label: 'Figure', type: 'text' },
                    { key: 'l', label: 'Caption', type: 'text' },
                ],
            },
            {
                key: 'quote.text', label: 'Chairman\'s quote', type: 'textarea',
                now: 'I envision Anwar Group not just as a business entity but as a catalyst for progress, for a sustainable and equitable future.',
            },
            { key: 'quote.name', label: 'Quote — name', type: 'text', now: 'Manwar Hossain' },
            { key: 'quote.role', label: 'Quote — position', type: 'text', now: 'Chairman, Anwar Group' },
            { key: 'pillars.eyebrow', label: 'Pillars — small label', type: 'text', now: 'THREE PILLARS' },
            { key: 'pillars.title', label: 'Pillars — heading', type: 'text', now: 'Our ESG framework' },
            {
                key: 'pillars.items', label: 'The three pillars', type: 'list',
                now: 'Environmental · Social · Governance',
                item: [
                    { key: 'letter', label: 'Letter shown behind (E / S / G)', type: 'text' },
                    { key: 'title', label: 'Name', type: 'text' },
                    { key: 'sub', label: 'Subtitle', type: 'text' },
                    { key: 'items', label: 'Points — one per line', type: 'lines' },
                ],
            },
            { key: 'sdg.eyebrow', label: 'SDG — small label', type: 'text', now: 'UNITED NATIONS' },
            { key: 'sdg.title', label: 'SDG — heading', type: 'text', now: 'SDG commitments' },
            {
                key: 'sdg.items', label: 'SDG commitments — one per line', type: 'lines',
                now: 'Recycling and waste reduction · Supporting local communities · Green design and manufacturing · Education · Renewable energy adoption · Reforestation · Healthcare and sanitation',
            },
            { key: 'commit.eyebrow', label: 'Commitment — small label', type: 'text', now: 'OUR COMMITMENT' },
            { key: 'commit.title', label: 'Commitment — heading', type: 'text', now: 'Sustainable business practices' },
            {
                key: 'commit.items', label: 'Commitment paragraphs — one per line', type: 'lines',
                now: 'Three paragraphs about minimising impact, looking after employees, and the family\'s conviction towards society.',
            },
            {
                key: 'practices', label: 'Practices', type: 'list',
                now: 'Energy saving · Zero waste water · Carbon reduction',
                item: [
                    { key: 'label', label: 'Name', type: 'text' },
                    { key: 'text', label: 'Description', type: 'textarea' },
                ],
            },
        ],
    },
    {
        key: 'sustainability-csr',
        label: 'CSR Activities',
        group: 'Sustainability',
        url: '/sustainability/csr',
        fields: [
            ...banner('CORPORATE SOCIAL RESPONSIBILITY', 'Community Outreach', '& Welfare', '/community-outreach.jpg'),
            { key: 'open.eyebrow', label: 'Opening — small label', type: 'text', now: 'WHERE WE STAND' },
            {
                key: 'open.statement', label: 'Opening — large statement', type: 'textarea',
                now: 'Anwar Group and Anwar Ispat stand close to the communities the mill is built in.',
            },
            {
                key: 'open.text', label: 'Opening — paragraph', type: 'textarea',
                now: 'Funding schools, distributing scholarships and running medical camps for low-income families — carried on for four decades, not announced for one.',
            },
            {
                key: 'figures', label: 'Figures', type: 'list',
                now: '10K+ Families supported · 500+ Scholarships awarded · 20+ Free medical camps · 5,000+ Trees planted',
                item: [
                    { key: 'n', label: 'Figure', type: 'text' },
                    { key: 'l', label: 'Caption', type: 'text' },
                ],
            },
            {
                key: 'principles', label: 'Mission and Vision', type: 'list',
                now: 'OUR MISSION People first, always · OUR VISION A stronger Bangladesh',
                item: [
                    { key: 'label', label: 'Small label', type: 'text' },
                    { key: 'title', label: 'Heading', type: 'text' },
                    { key: 'text', label: 'Description', type: 'textarea' },
                ],
            },
            { key: 'what.eyebrow', label: 'Initiatives — small label', type: 'text', now: 'CSR INITIATIVES' },
            { key: 'what.title', label: 'Initiatives — heading', type: 'text', now: 'What we do' },
            {
                key: 'initiatives', label: 'Initiatives', type: 'list',
                now: 'Education · Healthcare · Community · Employee welfare · Environment · Social welfare',
                item: [
                    { key: 'title', label: 'Name', type: 'text' },
                    { key: 'text', label: 'Description', type: 'textarea' },
                ],
            },
            { key: 'commit.eyebrow', label: 'Commitment — small label', type: 'text', now: 'OUR COMMITMENT' },
            {
                key: 'commit.lead', label: 'Commitment — large statement', type: 'textarea',
                now: 'At the heart of our activities is the deep-rooted conviction towards people and society at large, emanating from values that have been in the family for many centuries.',
            },
            {
                key: 'commit.text', label: 'Commitment — paragraph', type: 'textarea',
                now: 'We fund schools, distribute scholarships and run medical camps so that quality healthcare and education reach families who would otherwise go without them.',
            },
        ],
    },
];

module.exports = { PAGES };
