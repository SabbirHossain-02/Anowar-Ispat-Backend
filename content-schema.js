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
            { type: 'section', label: "Banner", note: "The picture and the words across the top" },
            ...banner('VISION, MISSION & VALUES', 'Since 1834,', 'Forged in Purpose', '/vision-mission.jpeg'),
            { type: 'section', label: "Vision", note: "The first block" },
            { key: 'vision.tag', label: 'Vision — small label', type: 'text', now: 'Vision' },
            { key: 'vision.title', label: 'Vision — heading', type: 'text', now: 'Continuing the heritage' },
            {
                key: 'vision.body', label: 'Vision — text', type: 'textarea',
                now: 'Continuing the heritage of being pioneers in industries and leaders in development.',
            },
            { type: 'section', label: "Mission", note: "The second block" },
            { key: 'mission.tag', label: 'Mission — small label', type: 'text', now: 'Mission' },
            { key: 'mission.title', label: 'Mission — heading', type: 'text', now: 'Transformative growth' },
            {
                key: 'mission.body', label: 'Mission — text', type: 'textarea',
                now: 'At Anwar Group, our vision and mission converge in a steadfast pursuit of transformative growth and societal progress. Rooted in our heritage, we strive to lead across industries, embracing sustainability and ethics. Through innovation and global expansion, we contribute to economic development. Empowered by excellence and a limitless mindset, we shape a meaningful future.',
            },
            { type: 'section', label: "Values", note: "The cards at the foot of the page" },
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
        key: 'about-heritage',
        label: 'Heritage',
        group: 'About',
        url: '/about/heritage',
        fields: [
            ...banner('HERITAGE', 'Nearly two centuries of', 'Building', '/heritage-banner.jpeg'),
            {
                key: 'lede', label: 'Opening statement', type: 'textarea',
                now: 'A legacy to value and enjoy in the present, and to preserve and pass on to future generations.',
            },
            {
                // মাইলফলকগুলো About Us পাতায় একবারই রাখা আছে; এখানে
                // কেবল যুগের সীমা, তাই একটি সাল বদলালে দুই পাতাতেই বদলায়
                key: 'eras', label: 'Eras — the milestones themselves are edited on About Us', type: 'list',
                now: '1834–1946 · 1965–1983 · 1995–2001 · 2004–2022',
                item: [
                    { key: 'span', label: 'Years shown, e.g. 1834 — 1946', type: 'text' },
                    { key: 'title', label: 'Era title', type: 'text' },
                    { key: 'note', label: 'Era description', type: 'textarea' },
                    { key: 'from', label: 'First year in this era', type: 'text' },
                    { key: 'to', label: 'Last year in this era', type: 'text' },
                ],
            },
        ],
    },
    {
        // এই পাতাটির ব্যানার নেই — নিজের কেন্দ্রীভূত শিরোনাম আছে।
        // পণ্যের তালিকা Products সেকশন থেকেই আসে।
        key: 'products',
        label: 'Products (catalogue page)',
        group: 'Products',
        url: '/products',
        fields: [
            { key: 'eyebrow', label: 'Small label above the title', type: 'text', now: 'OUR CATALOG' },
            { key: 'title', label: 'Title', type: 'text', now: 'ENGINEERED FOR' },
            { key: 'accent', label: 'The words in red', type: 'text', now: 'ENDURANCE' },
            {
                key: 'intro', label: 'Paragraph under the title', type: 'textarea',
                now: "Forged in extreme intensity. We provide exceptional structural solutions designed to act as the unyielding backbone of tomorrow's infrastructure. Explore our full range of premium grade TMT rebars and steel products.",
            },
            {
                key: 'empty', label: 'Shown when no products have been added', type: 'text',
                now: 'No products available yet.',
            },
            {
                key: 'specLabel', label: 'Pop-up — heading above the specification list', type: 'text',
                now: 'KEY SPECIFICATIONS',
            },
            {
                key: 'specs', label: 'Pop-up — the specification list, one per line', type: 'lines',
                now: 'Ultimate Tensile Strength: 500 MPa / Excellent Weldability and Bendability / Earthquake Resistant Properties / Advanced Rib Design for better bonding',
            },
            { key: 'quoteBtn', label: 'Pop-up — the quotation button', type: 'text', now: 'REQUEST A QUOTE' },
        ],
    },
    {
        key: 'products-range',
        label: 'Our Product Range',
        group: 'Products',
        url: '/products/range',
        fields: [
            ...banner('PRODUCTS', 'Reinforcement built for', 'Strength', '/product-range-banner.jpeg'),
            {
                key: 'intro', label: 'Opening paragraph', type: 'textarea',
                now: 'Anwar Ispat produces deformed reinforcement bars using patented TMT technology from Belgium, tested batch by batch and certified to BSTI and ISO standards.',
            },
            { key: 'grades.eyebrow', label: 'Grades — small label', type: 'text', now: 'OUR GRADES' },
            { key: 'grades.title', label: 'Grades — heading', type: 'text', now: 'Two grades, two jobs' },
            {
                key: 'grades.items', label: 'Grades', type: 'list',
                now: 'ANWARS 500DWR · ANWARS 420DWR',
                item: [
                    { key: 'name', label: 'Name', type: 'text' },
                    { key: 'tag', label: 'Subtitle', type: 'text' },
                    { key: 'advantages', label: 'Advantages — one per line', type: 'lines' },
                ],
            },
            { key: 'catalogue.eyebrow', label: 'Catalogue — small label', type: 'text', now: 'CATALOGUE' },
            { key: 'catalogue.title', label: 'Catalogue — heading', type: 'text', now: 'From our product line' },
        ],
    },
    {
        key: 'products-specifications',
        label: 'Product Specifications',
        group: 'Products',
        url: '/products/specifications',
        fields: [
            ...banner('PRODUCT SPECIFICATIONS', 'Built for', 'Strength', '/Product-Specifications.jpeg'),
            {
                key: 'intro', label: 'Opening paragraph', type: 'textarea',
                now: 'Every batch is tested on a spectrometer across 28 elements before it leaves the mill, to hold the tolerances that piling, slabs and columns are designed against.',
            },
            { key: 'apps.eyebrow', label: 'Applications — small label', type: 'text', now: 'APPLICATIONS' },
            { key: 'apps.title', label: 'Applications — heading', type: 'text', now: 'Where the bar goes' },
            {
                key: 'apps.items', label: 'Applications', type: 'list',
                now: 'Piling foundation · Slab construction · Constructing pillars',
                item: [
                    { key: 'image', label: 'Photograph', type: 'image-url' },
                    { key: 'name', label: 'Name', type: 'text' },
                    { key: 'text', label: 'Description', type: 'textarea' },
                ],
            },
            { key: 'chart.eyebrow', label: 'Size chart — small label', type: 'text', now: 'SIZE CHART' },
            { key: 'chart.title', label: 'Size chart — heading', type: 'text', now: 'Available diameters' },
            {
                key: 'chart.note', label: 'Note under the size chart', type: 'textarea',
                now: '420DWR is not produced in 8 mm. For any diameter or quantity, send us the requirement and we will confirm availability.',
            },
        ],
    },
    {
        key: 'products-certifications',
        label: 'Certifications',
        group: 'Products',
        url: '/products/certifications',
        fields: [
            ...banner('CERTIFICATIONS', 'Tested, audited and', 'Certified', '/Certifications-page-banner.jpg'),
            { key: 'eyebrow', label: 'Small label', type: 'text', now: 'CERTIFICATIONS' },
            {
                key: 'title', label: 'Heading', type: 'text',
                now: 'Every claim below is issued by a body outside Anwar Ispat',
            },
            {
                key: 'lead', label: 'Paragraph under the heading', type: 'textarea',
                now: 'The rebar is certified against Bangladeshi, British, Indian and American standards. The mill itself is audited to ISO quality and environmental management systems, and tested independently by BUET.',
            },
            {
                key: 'items', label: 'Certificates', type: 'list',
                now: 'BUET · BSTI · ISO 14001 · ISO 9001 · IS-1786 · BS-4449 · BDS ISO 6935-2 · ASTM',
                item: [
                    { key: 'logo', label: 'Logo', type: 'image-url' },
                    { key: 'code', label: 'Standard', type: 'text' },
                    { key: 'issuer', label: 'Issued by', type: 'text' },
                    { key: 'scope', label: 'Kind of certificate', type: 'text' },
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
            { type: 'section', label: "Banner", note: "The picture and the words across the top" },
            ...banner('SUSTAINABILITY', 'Sustainable Steel', 'Development', '/sustainable-steel.jpg'),
            { type: 'section', label: "Opening", note: "The paragraph and the figures under the banner" },
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
            { type: 'section', label: "Chairman's quote", note: "The quotation block" },
            {
                key: 'quote.text', label: 'Chairman\'s quote', type: 'textarea',
                now: 'I envision Anwar Group not just as a business entity but as a catalyst for progress, for a sustainable and equitable future.',
            },
            { key: 'quote.name', label: 'Quote — name', type: 'text', now: 'Manwar Hossain' },
            { key: 'quote.role', label: 'Quote — position', type: 'text', now: 'Chairman, Anwar Group' },
            { type: 'section', label: "Three pillars", note: "Environmental, Social, Governance" },
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
            { type: 'section', label: "SDG commitments", note: "The United Nations goals list" },
            { key: 'sdg.eyebrow', label: 'SDG — small label', type: 'text', now: 'UNITED NATIONS' },
            { key: 'sdg.title', label: 'SDG — heading', type: 'text', now: 'SDG commitments' },
            {
                key: 'sdg.items', label: 'SDG commitments — one per line', type: 'lines',
                now: 'Recycling and waste reduction · Supporting local communities · Green design and manufacturing · Education · Renewable energy adoption · Reforestation · Healthcare and sanitation',
            },
            { type: 'section', label: "Our commitment", note: "The closing block and the practices beside it" },
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
            { type: 'section', label: "Banner", note: "The picture and the words across the top" },
            ...banner('CORPORATE SOCIAL RESPONSIBILITY', 'Community Outreach', '& Welfare', '/community-outreach.jpg'),
            { type: 'section', label: "Opening", note: "The large statement, the paragraph and the figures" },
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
            { type: 'section', label: "Mission and Vision", note: "The two blocks side by side" },
            {
                key: 'principles', label: 'Mission and Vision', type: 'list',
                now: 'OUR MISSION People first, always · OUR VISION A stronger Bangladesh',
                item: [
                    { key: 'label', label: 'Small label', type: 'text' },
                    { key: 'title', label: 'Heading', type: 'text' },
                    { key: 'text', label: 'Description', type: 'textarea' },
                ],
            },
            { type: 'section', label: "Initiatives", note: "What the company actually runs" },
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
            { type: 'section', label: "Our commitment", note: "The closing block" },
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
    {
        // হোমপেজের সেকশনগুলি। পণ্য, খবর ও হিরো ব্যানার নিজ নিজ
        // সেকশন থেকেই আসে — এখানে কেবল স্থায়ী লেখাগুলি।
        key: 'home',
        label: 'Home page',
        group: 'Home',
        url: '/',
        fields: [
            { type: 'section', label: "Opening banner", note: "The very top of the page, over the moving background" },
            { key: 'hero.line1', label: 'Opening headline — first line', type: 'text', now: 'FORGED IN' },
            { key: 'hero.accent1', label: 'Opening headline — the red word on the first line', type: 'text', now: 'FIRE' },
            { key: 'hero.line2', label: 'Opening headline — second line', type: 'text', now: 'ENGINEERED FOR THE' },
            { key: 'hero.accent2', label: 'Opening headline — the red word on the second line', type: 'text', now: 'FUTURE' },
            {
                key: 'hero.sub', label: 'Paragraph under the opening headline', type: 'textarea',
                now: 'A cinematic journey of power, precision, and the steel that builds Bangladesh.',
            },
            { key: 'hero.cta', label: 'Button under the opening headline', type: 'text', now: 'DISCOVER THE FORCE' },
            { type: 'section', label: "Vision & Leadership", note: "The two quotation blocks with the photographs" },
            { key: 'about.aTitle', label: 'About block 1 — heading', type: 'text', now: 'BUILDING A LEGACY OF' },
            { key: 'about.aAccent', label: 'About block 1 — the words in red', type: 'text', now: 'STEEL.' },
            {
                key: 'about.aQuote', label: 'About block 1 — quotation', type: 'textarea',
                now: "Our foundation isn't just laid in concrete; it's forged in unwavering commitment and intense heat. We started with a vision to build the unbuildable.",
            },
            { key: 'about.bTitle', label: 'About block 2 — heading', type: 'text', now: 'ENGINEERING THE NEXT' },
            { key: 'about.bAccent', label: 'About block 2 — the words in red', type: 'text', now: 'CENTURY.' },
            {
                key: 'about.bQuote', label: 'About block 2 — quotation', type: 'textarea',
                now: "We don't just supply materials; we engineer the resilience required to propel Bangladesh into the forefront of monumental construction.",
            },
            { type: 'section', label: "Why Choose Us", note: "The row of milestones" },
            { key: 'why.eyebrow', label: 'Why Choose Us — small label', type: 'text', now: 'THE FORGED PATH' },
            { key: 'why.title', label: 'Why Choose Us — heading', type: 'text', now: 'WHY CHOOSE US?' },
            {
                key: 'why.items', label: 'Why Choose Us — the milestones', type: 'list',
                now: '190+ Years · European Technology · Pioneer · Earthquake Resistant · Precision Quality · Nation Builder',
                item: [
                    { key: 'title', label: 'Title', type: 'text' },
                    { key: 'desc', label: 'Description', type: 'textarea' },
                ],
            },
            { type: 'section', label: "Products", note: "The product cards and the pop-up that opens when one is clicked" },
            { key: 'ps.specLabel', label: 'Product panel — specifications heading', type: 'text', now: 'KEY SPECIFICATIONS' },
            {
                key: 'ps.specs', label: 'Product panel — specification points, one per line', type: 'lines',
                now: 'Excellent Weldability and Bendability · Earthquake Resistant Properties · Advanced Rib Design',
            },
            { key: 'ps.loading', label: 'Product panel — while loading', type: 'text', now: 'Loading products...' },
            { key: 'ps.empty', label: 'Product panel — when none added', type: 'text', now: 'No products published yet.' },

            { type: 'section', label: "Core Strengths", note: "The turning globe with the labels going round it" },
            { key: 'strengths.heading', label: 'Orbit — small line above the name', type: 'text', now: 'WHY CHOOSE' },
            { key: 'strengths.brand', label: 'Orbit — the name', type: 'text', now: 'ANWAR' },
            { key: 'strengths.brandAccent', label: 'Orbit — the part in red', type: 'text', now: 'ISPAT' },
            { key: 'strengths.tail', label: 'Orbit — line under the name', type: 'text', now: 'THE BEST?' },
            {
                key: 'strengths.items', label: 'Orbit — the labels going round', type: 'lines',
                now: 'SUPERIOR STRENGTH · EXCELLENT DUCTILITY · EASY WELDABILITY · IMPROVED RIB DESIGN · TMT TECHNOLOGY · PRECISE STANDARDS · CONTROLLED MICROSTRUCTURE',
            },

            { type: 'section', label: "Mega Projects", note: "The eight video cards" },
            { key: 'projects.title', label: 'Projects section — heading', type: 'text', now: 'MEGA' },
            { key: 'projects.accent', label: 'Projects section — the words in red', type: 'text', now: 'PROJECTS' },
            {
                key: 'projects.items',
                label: 'Projects section — the eight project cards. The old videos were lost when the Cloudinary account was closed, so upload a new video and a still for each one',
                type: 'list',
                now: 'Padma Bridge · Rooppur · Mayor Hanif Flyover · Purbachal · Airport T3 · Shahjalal Fertilizer · Hotel Intercontinental · City Center',
                item: [
                    { key: 'title', label: 'Name', type: 'text' },
                    { key: 'desc', label: 'Description', type: 'textarea' },
                    { key: 'video', label: 'Video', type: 'video-url' },
                    { key: 'poster', label: 'Still shown before the video plays', type: 'image-url' },
                ],
            },

            { type: 'section', label: "News Desk", note: "Pulls the latest from Media & Events on its own" },
            { key: 'media.title', label: 'News section — heading', type: 'text', now: 'NEWS DESK' },
            { key: 'media.cta', label: 'News section — button', type: 'text', now: 'INITIATE FEED' },
            { key: 'media.loading', label: 'News section — while loading', type: 'text', now: 'Loading media posts...' },
            { key: 'media.empty', label: 'News section — when none added', type: 'text', now: 'No media posts yet.' },

            { type: 'section', label: "Insights", note: "The three articles near the bottom" },
            { key: 'blog.eyebrow', label: 'Insights section — small line', type: 'text', now: '[ SYSTEM.ARCHIVES.OPEN ]' },
            { key: 'blog.title', label: 'Insights section — heading', type: 'text', now: 'INSIGHTS & INNOVATIONS' },
            {
                key: 'blog.items', label: 'Insights section — the articles', type: 'list',
                now: 'Three articles',
                item: [
                    { key: 'title', label: 'Headline', type: 'text' },
                    { key: 'cat', label: 'Category', type: 'text' },
                    { key: 'date', label: 'Date', type: 'text' },
                ],
            },

            { type: 'section', label: "Footer", note: "The bottom of every page, not just this one" },
            {
                key: 'footer.tagline', label: 'Footer — line under the logo', type: 'textarea',
                now: "Unrelenting strength. Uncompromising quality. The structural backbone of tomorrow's infrastructure.",
            },
            { key: 'footer.quickTitle', label: 'Footer — first column heading', type: 'text', now: 'QUICK LINKS' },
            { key: 'footer.legalTitle', label: 'Footer — second column heading', type: 'text', now: 'LEGAL' },
            { key: 'footer.contactBtn', label: 'Footer — button', type: 'text', now: 'CONTACT US' },
            {
                key: 'footer.quick', label: 'Footer — first column links, one per line as  Label | #anchor', type: 'lines',
                now: 'Product & Service · Better Tomorrow · Career · Media & Events',
            },
            {
                key: 'footer.legal', label: 'Footer — second column links, one per line as  Label | link', type: 'lines',
                now: 'Privacy Policy · Terms of Service',
            },
        ],
    },
    {
        key: 'projects',
        label: 'Project Gallery',
        group: 'Landmarks',
        url: '/projects',
        fields: [
            ...banner('PROJECT GALLERY', 'Built with', 'Anwar Ispat', '/gallery-banner.jpg'),
            { key: 'eyebrow', label: 'Small label', type: 'text', now: 'PROJECT GALLERY' },
            { key: 'title', label: 'Heading', type: 'text', now: 'Twelve structures the country depends on' },
            {
                key: 'lead', label: 'Paragraph under the heading', type: 'textarea',
                now: 'Bridges, expressways, ports and power — each one carrying rebar rolled at our mill. Select any project to see it full size.',
            },
            {
                key: 'items', label: 'Projects', type: 'list',
                now: 'Twelve landmarks',
                item: [
                    { key: 'img', label: 'Photograph', type: 'image-url' },
                    { key: 'name', label: 'Name', type: 'text' },
                    { key: 'kind', label: 'Kind, e.g. Bridge or Expressway', type: 'text' },
                ],
            },
        ],
    },
    {
        // খবরগুলো Media & Events সেকশন থেকে আসে — এখানে কেবল
        // পাতার স্থায়ী লেখাগুলি
        key: 'media-news',
        label: 'News & Articles',
        group: 'Media Center',
        url: '/media/news',
        fields: [
            { type: 'section', label: "Banner", note: "The picture and the words across the top" },
            ...banner('MEDIA CENTER', 'Latest', 'News', '/latest-news-banner.jpg'),
            { type: 'section', label: "The list page", note: "Labels around the stories, and what shows when there are none" },
            { key: 'lead', label: 'Label above the main story', type: 'text', now: 'LEAD STORY' },
            { key: 'more', label: 'Label above the other stories', type: 'text', now: 'MORE STORIES' },
            { key: 'ticker', label: 'Label on the scrolling headline strip', type: 'text', now: 'LATEST' },
            {
                key: 'empty', label: 'Shown when nothing has been published', type: 'text',
                now: 'No stories have been published in this section yet.',
            },
            { key: 'loading', label: 'Shown while the newsroom loads', type: 'text', now: 'Loading the newsroom…' },
            {
                key: 'failed', label: 'Shown when the newsroom cannot be reached', type: 'textarea',
                now: 'The newsroom could not be reached just now. Please try again shortly.',
            },
            { type: 'section', label: "The story page", note: "What a reader sees after clicking a headline" },
            { key: 'artLoading', label: 'Story page — shown while the story loads', type: 'text', now: 'Loading the story…' },
            { key: 'artGoneTag', label: 'Story page — label when the story is gone', type: 'text', now: 'NOT FOUND' },
            {
                key: 'artGone', label: 'Story page — heading when the story is gone', type: 'text',
                now: 'This story is no longer available',
            },
            {
                key: 'artGoneText', label: 'Story page — line under that heading', type: 'textarea',
                now: 'It may have been removed from the newsroom, or the link may be incomplete.',
            },
            { key: 'artBack', label: 'Story page — the back button', type: 'text', now: 'All news' },
            { key: 'artMore', label: 'Story page — label above the other stories', type: 'text', now: 'MORE FROM THE NEWSROOM' },
        ],
    },
    {
        key: 'media-press',
        label: 'Press Releases',
        group: 'Media Center',
        url: '/media/press',
        fields: [
            { type: 'section', label: "Heading", note: "The top of the list page" },
            { key: 'hero.tag', label: 'Small label above the title', type: 'text', now: 'Official Statements' },
            { key: 'hero.title', label: 'Title', type: 'text', now: 'Press' },
            { key: 'hero.accent', label: 'The words in red', type: 'text', now: 'Releases' },
            { type: 'section', label: "The release page", note: "Labels and the contact box on a single release" },
            { key: 'stamp', label: 'The red chip on a release', type: 'text', now: 'Official Statement' },
            { key: 'imageNote', label: 'Caption in the empty image box', type: 'text', now: 'Official Image' },
            { key: 'immediate', label: 'Release page — the line above the text', type: 'text', now: 'For Immediate Release' },
            { key: 'contactLabel', label: 'Release page — heading of the contact box', type: 'text', now: 'Media Contact' },
            { key: 'notFound', label: 'Release page — shown when the release is gone', type: 'text', now: 'Press release not found' },
            { key: 'mediaTitle', label: 'Release page — who to contact', type: 'text', now: 'Corporate Communications' },
            { key: 'mediaEmail', label: 'Release page — contact email', type: 'text', now: 'media@anwarispat.com' },
            { key: 'mediaPhone', label: 'Release page — contact telephone', type: 'text', now: '+880 2223 384037' },
            { type: 'section', label: "The releases", note: "Each one becomes its own page" },
            {
                key: 'releases',
                label: 'Press releases — these are statements in the company\'s name, so publish only what has actually been issued',
                type: 'list',
                now: 'Four releases',
                item: [
                    { key: 'pr', label: 'Reference, e.g. PR-2026-001', type: 'text' },
                    { key: 'cat', label: 'Category', type: 'text' },
                    { key: 'title', label: 'Headline', type: 'text' },
                    { key: 'date', label: 'Date', type: 'text' },
                    { key: 'read', label: 'Reading time', type: 'text' },
                    {
                        key: 'body',
                        label: 'The release itself — leave a blank line between paragraphs',
                        type: 'textarea',
                    },
                ],
            },
        ],
    },
    {
        key: 'media-events',
        label: 'Event Gallery',
        group: 'Media Center',
        url: '/media/events',
        fields: [
            { key: 'hero.tag', label: 'Small label above the title', type: 'text', now: 'Visual Stories' },
            { key: 'hero.title', label: 'Title', type: 'text', now: 'Event' },
            { key: 'hero.accent', label: 'The words in red', type: 'text', now: 'Gallery' },
            {
                key: 'events', label: 'Events', type: 'list',
                now: 'Six events',
                item: [
                    { key: 'cat', label: 'Category', type: 'text' },
                    { key: 'title', label: 'Name', type: 'text' },
                    { key: 'date', label: 'Date', type: 'text' },
                    { key: 'photos', label: 'Number of photographs', type: 'text' },
                ],
            },
        ],
    },
    // এই পাতাগুলিতে PageBanner নেই — নিজের কেন্দ্রীভূত শিরোনাম আছে,
    // তাই ব্যানারের বদলে hero.* ঘরগুলি
    {
        key: 'careers-positions',
        label: 'Open Positions',
        group: 'Careers',
        url: '/careers/positions',
        fields: [
            { type: 'section', label: "Banner", note: "The picture and the words across the top" },
            ...banner('CAREERS', 'Open', 'Positions', '/careers-banner.jpg'),
            { type: 'section', label: "Opening", note: "The large line and the paragraph under it" },
            { key: 'eyebrow', label: 'Small label above the opening line', type: 'text', now: 'CAREER OPPORTUNITIES' },
            {
                key: 'statement', label: 'The opening line, in large type', type: 'textarea',
                now: 'A chance for you to use your skills for future advancement.',
            },
            {
                key: 'lead', label: 'Paragraph under the opening line', type: 'textarea',
                now: 'Anwar Ispat has been rolling steel in Bangladesh for over four decades. The mill runs on the people in it — engineers on the floor, inspectors at the spectrometer, and the teams behind them.',
            },
            { type: 'section', label: "Departments", note: "The names running across the grey band" },
            { key: 'discEyebrow', label: 'Label above the list of departments', type: 'text', now: 'WHERE WE RECRUIT' },
            {
                key: 'disciplines', label: 'Departments we recruit into — one per line', type: 'lines',
                now: 'Engineering · Production · Quality control · Operations · Sales · Finance · Human resources',
            },
            { type: 'section', label: "Vacancies", note: "Wording around the jobs posted from Open Positions" },
            {
                key: 'email', label: 'Address applications are sent to', type: 'text',
                now: 'careers@anwarispat.com',
            },
            {
                key: 'vacancyLabel', label: 'Label above the vacancies (the count is added automatically)', type: 'text',
                now: 'CURRENT VACANCIES',
            },
            {
                key: 'openLabel', label: 'Label above the open-application block, when vacancies are listed', type: 'text',
                now: 'OPEN APPLICATIONS',
            },
            {
                key: 'openTitleWith', label: 'Heading when vacancies are listed', type: 'text',
                now: 'Nothing above a fit? Write to us anyway',
            },
            {
                key: 'emptyLabel', label: 'Label above the block when there are no vacancies', type: 'text',
                now: 'CURRENT VACANCIES',
            },
            {
                key: 'openTitleNone', label: 'Heading when there are no vacancies', type: 'text',
                now: 'Specific openings are posted here as they arise',
            },
            {
                key: 'openText', label: 'Paragraph about open applications', type: 'textarea',
                now: 'We accept open applications year-round. If your experience fits one of the areas above, send it to us and it will be held against upcoming requirements.',
            },
            { key: 'loading', label: 'Shown while vacancies load', type: 'text', now: 'Checking for current vacancies…' },
            { type: 'section', label: "How to apply", note: "The numbered steps and the button at the foot" },
            {
                key: 'steps', label: 'How to apply — the numbered steps', type: 'list',
                now: 'Send your CV · We review · Interview and offer',
                item: [
                    { key: 'title', label: 'Step name', type: 'text' },
                    { key: 'text', label: 'Description', type: 'textarea' },
                ],
            },
            { key: 'next', label: 'Button at the foot of the page', type: 'text', now: 'What it is like to work here' },
        ],
    },
    {
        key: 'careers-experience',
        label: 'Employee Experience',
        group: 'Careers',
        url: '/careers/experience',
        fields: [
            { key: 'hero.tag', label: 'Small label above the title', type: 'text', now: 'Life at Anwar Ispat' },
            { key: 'hero.title', label: 'Title', type: 'text', now: 'Employee' },
            { key: 'hero.accent', label: 'The words in red', type: 'text', now: 'Experience' },
            {
                key: 'values', label: 'Values', type: 'list',
                now: 'Integrity · Teamwork · Excellence',
                item: [
                    { key: 'title', label: 'Name', type: 'text' },
                    { key: 'text', label: 'Description', type: 'textarea' },
                ],
            },
            {
                key: 'perks', label: 'Benefits', type: 'list',
                now: 'Competitive Salary · Healthcare Coverage · Career Growth · Transport · Provident Fund · Leave',
                item: [
                    { key: 'title', label: 'Name', type: 'text' },
                    { key: 'text', label: 'Description', type: 'text' },
                ],
            },
            {
                key: 'stories',
                label: 'Employee stories — these are quotes attributed to named people, so only publish what they have actually said',
                type: 'list',
                now: 'Four stories',
                item: [
                    { key: 'img', label: 'Photograph', type: 'image-url' },
                    { key: 'name', label: 'Name', type: 'text' },
                    { key: 'role', label: 'Position', type: 'text' },
                    { key: 'years', label: 'Years at the company', type: 'text' },
                    { key: 'quote', label: 'What they said', type: 'textarea' },
                ],
            },
        ],
    },
    {
        key: 'contact-form',
        label: 'Contact Form',
        group: 'Contact',
        url: '/contact/form',
        fields: [
            { key: 'hero.tag', label: 'Small label above the title', type: 'text', now: 'Get In Touch' },
            { key: 'hero.title', label: 'Title', type: 'text', now: 'Contact' },
            { key: 'hero.accent', label: 'The words in red', type: 'text', now: 'Form' },
            { key: 'hero.promise', label: 'Promise shown on the right', type: 'text', now: 'Within 24 Hours' },
            { key: 'hero.promiseNote', label: 'Caption under the promise', type: 'text', now: 'Response time' },
            { key: 'sentTitle', label: 'Heading after the message is sent', type: 'text', now: 'Message Sent!' },
            {
                key: 'sentText', label: 'Line after the message is sent', type: 'textarea',
                now: 'Thank you. We will get back to you within 24 hours.',
            },
            { key: 'sentAgain', label: 'Button after the message is sent', type: 'text', now: 'Send Another' },
            {
                key: 'sideCards', label: 'The cards down the right-hand side', type: 'list',
                now: 'Response Time · Head Office · Working Hours · General Email',
                item: [
                    { key: 'label', label: 'Small label', type: 'text' },
                    { key: 'value', label: 'Main line', type: 'text' },
                    { key: 'sub', label: 'Line underneath', type: 'text' },
                ],
            },
        ],
    },
    {
        key: 'contact-locations',
        label: 'Office Locations',
        group: 'Contact',
        url: '/contact/locations',
        fields: [
            { key: 'hero.tag', label: 'Small label above the title', type: 'text', now: 'Find Us' },
            { key: 'hero.title', label: 'Title', type: 'text', now: 'Office' },
            { key: 'hero.accent', label: 'The words in red', type: 'text', now: 'Locations' },
            { key: 'hero.sub', label: 'Paragraph under the title', type: 'textarea' },
            {
                key: 'locations', label: 'Offices', type: 'list',
                now: 'Head Office · Narayanganj Factory · Chittagong Sales Office · Sylhet Branch Office',
                item: [
                    { key: 'badge', label: 'Tag, e.g. HQ or FACTORY', type: 'text' },
                    { key: 'title', label: 'Name', type: 'text' },
                    { key: 'address', label: 'Address', type: 'textarea' },
                    { key: 'phone', label: 'Telephone', type: 'text' },
                    { key: 'hours', label: 'Opening hours', type: 'text' },
                    { key: 'email', label: 'Email', type: 'text' },
                ],
            },
        ],
    },
    {
        key: 'contact-hotline',
        label: 'Hotline / Email',
        group: 'Contact',
        url: '/contact/hotline',
        fields: [
            { key: 'hero.tag', label: 'Small label above the title', type: 'text', now: 'Reach Out' },
            { key: 'hero.title', label: 'Title', type: 'text', now: 'Hotline /' },
            { key: 'hero.accent', label: 'The words in red', type: 'text', now: 'Email' },
            { key: 'hero.sub', label: 'Paragraph under the title', type: 'textarea' },
            {
                key: 'phones', label: 'Telephone lines', type: 'list',
                now: 'Sales Hotline · Factory / Technical · Corporate Office',
                item: [
                    { key: 'label', label: 'Name of the line', type: 'text' },
                    { key: 'number', label: 'Number', type: 'text' },
                    { key: 'hours', label: 'When it is answered', type: 'text' },
                    { key: 'desc', label: 'What it is for', type: 'text' },
                ],
            },
            {
                key: 'emails', label: 'Email addresses', type: 'list',
                now: 'info · media · sales · careers',
                item: [
                    { key: 'label', label: 'Name', type: 'text' },
                    { key: 'email', label: 'Address', type: 'text' },
                    { key: 'desc', label: 'What it is for', type: 'text' },
                ],
            },
            {
                key: 'socials', label: 'Social accounts', type: 'list',
                now: 'Facebook · LinkedIn · YouTube',
                item: [
                    { key: 'name', label: 'Network', type: 'text' },
                    { key: 'handle', label: 'Handle shown', type: 'text' },
                    { key: 'href', label: 'Link', type: 'text' },
                ],
            },
        ],
    },
    {
        key: 'contact-map',
        label: 'Google Map',
        group: 'Contact',
        url: '/contact/map',
        fields: [
            { key: 'hero.tag', label: 'Small label above the title', type: 'text', now: 'Find Our Way' },
            { key: 'hero.title', label: 'Title', type: 'text', now: 'Google' },
            { key: 'hero.accent', label: 'The words in red', type: 'text', now: 'Map' },
            { key: 'hero.sub', label: 'Paragraph under the title', type: 'textarea' },
            {
                key: 'locations', label: 'Places on the map', type: 'list',
                now: 'The same offices as the Locations page',
                item: [
                    { key: 'title', label: 'Name', type: 'text' },
                    { key: 'address', label: 'Address', type: 'textarea' },
                ],
            },
        ],
    },
    {
        key: 'navbar',
        label: 'Menu & buttons',
        group: 'Site-wide',
        url: '/',
        fields: [
            {
                key: 'note',
                label: 'Each box below is one menu. The first line is the name in the top bar, the lines under it are its drop-down — in that order. The links themselves stay fixed, only the wording changes here.',
                type: 'note',
            },
            {
                key: 'menu.about', label: 'Menu 1', type: 'lines',
                now: 'About Us / Vision, Mission & Values / Leadership Team / Heritage',
            },
            {
                key: 'menu.products', label: 'Menu 2', type: 'lines',
                now: 'Products / Our Product Range / Product Specifications / Certifications / Download Catalog · Request Quote',
            },
            {
                key: 'menu.sustainability', label: 'Menu 3', type: 'lines',
                now: 'Sustainability / Environmental, Social, Governance / CSR Activities',
            },
            {
                key: 'menu.landmarks', label: 'Menu 4', type: 'lines',
                now: 'Landmarks / Project Gallery',
            },
            {
                key: 'menu.media', label: 'Menu 5', type: 'lines',
                now: 'Media Center / News & Articles / Press Releases / Event Gallery',
            },
            {
                key: 'menu.careers', label: 'Menu 6', type: 'lines',
                now: 'Careers / Open Positions / Employee Experience',
            },
            {
                key: 'menu.contact', label: 'Menu 7', type: 'lines',
                now: 'Contact Us / Contact Form / Office Locations / Hotline · Email / Google Map',
            },
            { key: 'quoteBtn', label: 'The floating button in the corner of every page', type: 'text', now: 'GET QUOTE' },
        ],
    },
    {
        key: 'quote-modal',
        label: 'Quotation pop-up',
        group: 'Site-wide',
        url: '/',
        fields: [
            { type: 'section', label: "Heading", note: "The top of the pop-up" },
            { key: 'title', label: 'Heading', type: 'text', now: 'REQUEST A' },
            { key: 'accent', label: 'Heading — the words in red', type: 'text', now: 'QUOTATION' },
            { key: 'sub', label: 'Line under the heading', type: 'text', now: 'Submit your requirements for an exact estimation.' },
            { key: 'catalogBtn', label: 'Catalogue button', type: 'text', now: 'DOWNLOAD CATALOGUE' },
            { key: 'step1', label: 'Heading of the first column', type: 'text', now: 'Product Information' },
            { key: 'step2', label: 'Heading of the second column', type: 'text', now: 'Contact Information' },
            { type: 'section', label: "The form", note: "What a visitor picks from and fills in" },
            {
                key: 'products', label: 'The products a visitor can pick from', type: 'list',
                now: 'Anwars 500CWR · Anwars 500DWR · Anwars 420DWR · Other',
                item: [
                    { key: 'value', label: 'Saved as', type: 'text' },
                    { key: 'label', label: 'Shown as', type: 'text' },
                ],
            },
            {
                key: 'labelNote',
                label: 'The box below holds the names of the form fields, one per line, in the order they appear. The boxes themselves stay as they are — only their names change.',
                type: 'note',
            },
            {
                key: 'labels', label: 'Names of the form fields', type: 'lines',
                now: 'PRODUCT NAME / SIZE (MM) / QUANTITY (TON) / QUANTITY (PCS) / ADDITIONAL PRODUCTS / BUSINESS NAME / FULL NAME * / EMAIL ADDRESS / MOBILE NUMBER * / ADDRESS / POLICE STATION / SELECT DISTRICT / MESSAGE',
            },
            { key: 'submit', label: 'Send button', type: 'text', now: 'SUBMIT REQUEST' },
            { key: 'ok', label: 'Message after a successful send', type: 'textarea', now: 'QUOTATION SUBMITTED SUCCESSFULLY — We will contact you shortly.' },
            { key: 'missing', label: 'Message when required boxes are empty', type: 'text', now: 'Full Name and Mobile Number are required.' },
            { key: 'failed', label: 'Message when the send fails', type: 'text', now: 'Submission failed. Please try again.' },
        ],
    },
    {
        key: 'contact-modal',
        label: 'Contact pop-up',
        group: 'Site-wide',
        url: '/',
        fields: [
            { type: 'section', label: "Heading", note: "The top of the pop-up" },
            { key: 'title', label: 'Heading', type: 'text', now: 'Contact' },
            { key: 'accent', label: 'Heading — the words in red', type: 'text', now: 'Anwar Ispat' },
            { key: 'sub', label: 'Line under the heading', type: 'text', now: 'Tell us what you need and the right desk will answer.' },
            { type: 'section', label: "Contact details", note: "The address, telephone and email down the left" },
            { key: 'addrLabel', label: 'Address — label', type: 'text', now: 'HEAD OFFICE' },
            {
                key: 'addr', label: 'Address', type: 'textarea',
                now: 'Baitul Hossain Building (12th Floor), 27 Dilkusha Commercial Area, Dhaka - 1000, Bangladesh',
            },
            { key: 'phoneLabel', label: 'Telephone — label', type: 'text', now: 'TELEPHONE' },
            { key: 'phone', label: 'Telephone', type: 'text', now: '+880 2223 384037' },
            { key: 'mailLabel', label: 'Email — label', type: 'text', now: 'EMAIL' },
            { key: 'mail', label: 'Email', type: 'text', now: 'mail@anwargroup.net' },
            { type: 'section', label: "The form", note: "The boxes a visitor fills in, and what they see after sending" },
            { key: 'fName', label: 'Form — name box', type: 'text', now: 'NAME' },
            { key: 'fEmail', label: 'Form — email box', type: 'text', now: 'EMAIL' },
            { key: 'fSubject', label: 'Form — subject box', type: 'text', now: 'SUBJECT' },
            { key: 'fMessage', label: 'Form — message box', type: 'text', now: 'MESSAGE' },
            { key: 'submit', label: 'Send button', type: 'text', now: 'SEND MESSAGE' },
            { key: 'ok', label: 'Message after a successful send', type: 'textarea', now: 'Thank you — your message has reached us. We will reply shortly.' },
            { key: 'failed', label: 'Message when the send fails', type: 'text', now: 'The message could not be sent. Please try again.' },
        ],
    },
];

module.exports = { PAGES };
