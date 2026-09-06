/* অ্যাডমিন প্যানেলের ফর্ম এই ফাইল থেকেই তৈরি হয়। প্রতিটি ঘরের key
   ফ্রন্টএন্ডের ডিফল্ট অবজেক্টের পথের সাথে হুবহু মেলে — না মিললে
   অ্যাডমিনে বদল করেও সাইটে দেখা যাবে না।

   type:
     text     — এক লাইনের ঘর
     textarea — অনুচ্ছেদ
     list     — একাধিক আইটেম, প্রতিটিতে Add ও Delete
*/

const banner = (extra = {}) => [
    { key: 'banner.label', label: 'ব্যানার — উপরের ছোট লেখা', type: 'text', ...extra },
    { key: 'banner.title', label: 'ব্যানার — শিরোনাম', type: 'text' },
    { key: 'banner.accent', label: 'ব্যানার — লাল শব্দগুলো', type: 'text' },
];

const PAGES = [
    {
        key: 'about',
        label: 'About Us',
        group: 'About',
        fields: [
            ...banner(),
            { key: 'intro', label: 'ভূমিকার অনুচ্ছেদ', type: 'textarea' },
            { key: 'timeline.title', label: 'টাইমলাইনের শিরোনাম', type: 'text' },
            { key: 'why.eyebrow', label: 'Why Anwar Ispat — ছোট লেখা', type: 'text' },
            { key: 'why.title', label: 'Why Anwar Ispat — শিরোনাম', type: 'text' },
            {
                key: 'why.items', label: 'কারণগুলো', type: 'list',
                item: [
                    { key: 'title', label: 'শিরোনাম', type: 'text' },
                    { key: 'body', label: 'বিবরণ', type: 'textarea' },
                ],
            },
        ],
    },
    {
        key: 'about-vision',
        label: 'Vision, Mission & Values',
        group: 'About',
        fields: [
            ...banner(),
            { key: 'vision.title', label: 'Vision — শিরোনাম', type: 'text' },
            { key: 'vision.text', label: 'Vision — বিবরণ', type: 'textarea' },
            { key: 'mission.title', label: 'Mission — শিরোনাম', type: 'text' },
            { key: 'mission.text', label: 'Mission — বিবরণ', type: 'textarea' },
            { key: 'values.eyebrow', label: 'Values — ছোট লেখা', type: 'text' },
            { key: 'values.title', label: 'Values — শিরোনাম', type: 'text' },
            {
                key: 'values.items', label: 'মূল্যবোধগুলো', type: 'list',
                item: [
                    { key: 'name', label: 'নাম', type: 'text' },
                    { key: 'text', label: 'বিবরণ', type: 'textarea' },
                ],
            },
        ],
    },
    {
        key: 'about-leadership',
        label: 'Leadership Team',
        group: 'About',
        fields: [
            ...banner(),
            {
                key: 'people', label: 'নেতৃবৃন্দ', type: 'list',
                item: [
                    { key: 'name', label: 'নাম', type: 'text' },
                    { key: 'role', label: 'পদবি', type: 'text' },
                    { key: 'org', label: 'প্রতিষ্ঠান', type: 'text' },
                    { key: 'bio', label: 'পরিচিতি', type: 'textarea' },
                ],
            },
        ],
    },
    {
        key: 'sustainability-esg',
        label: 'ESG',
        group: 'Sustainability',
        fields: [
            ...banner(),
            { key: 'lede', label: 'ভূমিকার অনুচ্ছেদ', type: 'textarea' },
            {
                key: 'stats', label: 'সংখ্যাগুলো', type: 'list',
                item: [
                    { key: 'n', label: 'সংখ্যা', type: 'text' },
                    { key: 'l', label: 'নিচের লেখা', type: 'text' },
                ],
            },
            { key: 'quote.text', label: 'চেয়ারম্যানের উক্তি', type: 'textarea' },
            { key: 'quote.name', label: 'উক্তি — নাম', type: 'text' },
            { key: 'quote.role', label: 'উক্তি — পদবি', type: 'text' },
            { key: 'pillars.eyebrow', label: 'স্তম্ভ — ছোট লেখা', type: 'text' },
            { key: 'pillars.title', label: 'স্তম্ভ — শিরোনাম', type: 'text' },
            {
                key: 'pillars.items', label: 'তিনটি স্তম্ভ', type: 'list',
                item: [
                    { key: 'letter', label: 'অক্ষর (E/S/G)', type: 'text' },
                    { key: 'title', label: 'নাম', type: 'text' },
                    { key: 'sub', label: 'উপ-শিরোনাম', type: 'text' },
                    { key: 'items', label: 'তালিকা (প্রতি লাইনে একটি)', type: 'lines' },
                ],
            },
            { key: 'sdg.eyebrow', label: 'SDG — ছোট লেখা', type: 'text' },
            { key: 'sdg.title', label: 'SDG — শিরোনাম', type: 'text' },
            { key: 'commit.eyebrow', label: 'প্রতিশ্রুতি — ছোট লেখা', type: 'text' },
            { key: 'commit.title', label: 'প্রতিশ্রুতি — শিরোনাম', type: 'text' },
            { key: 'commit.text', label: 'প্রতিশ্রুতির অনুচ্ছেদ (ফাঁকা লাইনে ভাগ)', type: 'textarea' },
            {
                key: 'practices', label: 'কার্যক্রম', type: 'list',
                item: [
                    { key: 'label', label: 'নাম', type: 'text' },
                    { key: 'text', label: 'বিবরণ', type: 'textarea' },
                ],
            },
        ],
    },
    {
        key: 'sustainability-csr',
        label: 'CSR Activities',
        group: 'Sustainability',
        fields: [
            ...banner(),
            { key: 'open.eyebrow', label: 'শুরুর ছোট লেখা', type: 'text' },
            { key: 'open.statement', label: 'শুরুর বড় বিবৃতি', type: 'textarea' },
            { key: 'open.text', label: 'শুরুর অনুচ্ছেদ', type: 'textarea' },
            {
                key: 'figures', label: 'সংখ্যাগুলো', type: 'list',
                item: [
                    { key: 'n', label: 'সংখ্যা', type: 'text' },
                    { key: 'l', label: 'পাশের লেখা', type: 'text' },
                ],
            },
            {
                key: 'principles', label: 'মিশন ও ভিশন', type: 'list',
                item: [
                    { key: 'label', label: 'ছোট লেখা', type: 'text' },
                    { key: 'title', label: 'শিরোনাম', type: 'text' },
                    { key: 'text', label: 'বিবরণ', type: 'textarea' },
                ],
            },
            { key: 'what.eyebrow', label: 'উদ্যোগ — ছোট লেখা', type: 'text' },
            { key: 'what.title', label: 'উদ্যোগ — শিরোনাম', type: 'text' },
            {
                key: 'initiatives', label: 'উদ্যোগগুলো', type: 'list',
                item: [
                    { key: 'title', label: 'নাম', type: 'text' },
                    { key: 'text', label: 'বিবরণ', type: 'textarea' },
                ],
            },
            { key: 'commit.eyebrow', label: 'প্রতিশ্রুতি — ছোট লেখা', type: 'text' },
            { key: 'commit.lead', label: 'প্রতিশ্রুতি — বড় লেখা', type: 'textarea' },
            { key: 'commit.text', label: 'প্রতিশ্রুতি — অনুচ্ছেদ', type: 'textarea' },
        ],
    },
];

module.exports = { PAGES };
