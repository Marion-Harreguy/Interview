import { LOAD_READ_INTERVIEW } from '../actions';

export const initialState = {
  meta: {
    id: 67,
    title: 'Nesciunt voluptas et aut. Reiciendis velit voluptas molestiae eum et eos.',
    location: 'Paris, France',
    language: 'Français',
    date: '02-01-1995',
    openLicence: true,
    author: {
      id: 92,
      name: 'Patrick Lebon',
      status: 'sdfghjk fghjkl fghjkl ghjkl m',
      email: 'larua@fefzf.fr',
      structure: {
        name: 'Thomas',
        city: 'Chauveaudan',
      },
    },
    interviewed: [
      {
        id: 283,
        name: 'Nathalie Guilbert',
        email: 'gully@dnzdnz.fr',
        status: 'Professeur',
        structure: {
          name: 'Thomas',
          city: 'Chauveaudan',
        },
      },
      {
        id: 297,
        name: 'Guillaume Petit',
        email: 'gullye@dnzdnz.fr',
        status: 'Linguiste',
        structure: {
          name: 'Alves',
          city: 'Delannoy',
        },
      },
    ],
    tags: ['sit', 'sat'],
    context: 'context ghdjksdfbkndskjbvsjkbs',
  },
  content: [
    {
      id: 144,
      question: 'Et similique impedit beatae. Nobis recusandae qui voluptas rerum. ?',
      answers: [
        {
          id: 572,
          content: 'Maiores aut blanditiis in pariatur. Blanditiis consectetur itaque consequuntur cupiditate praesentium itaque et. Quo sapiente est adipisci quaerat voluptas vitae quia molestiae.',
          interviewed: 'RT',
        },
        {
          id: 588,
          content: 'Voluptatem ut quod assumenda a. Sit ut sapiente fugit ullam veniam beatae. Nemo aliquid ut quam ut.',
          interviewed: 'CR',
        },
      ],
    },
    {
      id: 146,
      question: 'Id tempore voluptatibus recusandae et deleniti. ?',
      answers: [
        {
          id: 572,
          content: 'Maiores aut blanditiis in pariatur. Blanditiis consectetur itaque consequuntur cupiditate praesentium itaque et. Quo sapiente est adipisci quaerat voluptas vitae quia molestiae.',
          interviewed: 'RT',
        },
        {
          id: 588,
          content: 'Voluptatem ut quod assumenda a. Sit ut sapiente fugit ullam veniam beatae. Nemo aliquid ut quam ut.',
          interviewed: 'CR',
        },
        {
          id: 591,
          content: 'Placeat tenetur et minus et laborum quia. Temporibus alias ratione facere. Consequatur omnis eum placeat laborum consequatur enim id.',
          interviewed: 'SH',
        },
        {
          id: 595,
          content: 'Excepturi ut fuga magnam similique sint. Voluptatem laudantium sed neque officia repellat id.',
          interviewed: 'DB',
        },
        {
          id: 611,
          content: 'Doloremque quisquam aut voluptas culpa blanditiis modi magnam quos. Quis iste quia ipsa occaecati quod eius. Itaque suscipit ratione laudantium dolores non animi.',
          interviewed: 'MF',
        },
        {
          id: 571,
          content: 'Nostrum voluptatem et et ea ad harum tempore. Quis impedit itaque assumenda. Aliquid consequatur nulla explicabo commodi praesentium voluptatem sapiente.',
          interviewed: 'CB',
        },
        {
          id: 624,
          content: 'Ad dolorem sed sunt doloribus ea earum non in. Nam debitis sit magni at. Sint omnis ullam est eos unde earum.',
          interviewed: 'DB',
        },
        {
          id: 627,
          content: 'Placeat aspernatur quasi est velit quas. Nisi natus cupiditate est inventore esse velit eligendi consequatur. In quos molestiae eum aut optio. Officia sit distinctio aut explicabo quae possimus odit.',
          interviewed: 'CC',
        },
      ],
    },
    {
      id: 148,
      question: 'Pariatur qui pariatur cumque hic sunt harum alias. ?',
      answers: [
        {
          id: 572,
          content: 'Maiores aut blanditiis in pariatur. Blanditiis consectetur itaque consequuntur cupiditate praesentium itaque et. Quo sapiente est adipisci quaerat voluptas vitae quia molestiae.',
          interviewed: 'RT',
        },
        {
          id: 588,
          content: 'Voluptatem ut quod assumenda a. Sit ut sapiente fugit ullam veniam beatae. Nemo aliquid ut quam ut.',
          interviewed: 'CR',
        },
        {
          id: 591,
          content: 'Placeat tenetur et minus et laborum quia. Temporibus alias ratione facere. Consequatur omnis eum placeat laborum consequatur enim id.',
          interviewed: 'SH',
        },
        {
          id: 595,
          content: 'Excepturi ut fuga magnam similique sint. Voluptatem laudantium sed neque officia repellat id.',
          interviewed: 'DB',
        },
        {
          id: 611,
          content: 'Doloremque quisquam aut voluptas culpa blanditiis modi magnam quos. Quis iste quia ipsa occaecati quod eius. Itaque suscipit ratione laudantium dolores non animi.',
          interviewed: 'MF',
        },
        {
          id: 571,
          content: 'Nostrum voluptatem et et ea ad harum tempore. Quis impedit itaque assumenda. Aliquid consequatur nulla explicabo commodi praesentium voluptatem sapiente.',
          interviewed: 'CB',
        },
        {
          id: 624,
          content: 'Ad dolorem sed sunt doloribus ea earum non in. Nam debitis sit magni at. Sint omnis ullam est eos unde earum.',
          interviewed: 'DB',
        },
        {
          id: 627,
          content: 'Placeat aspernatur quasi est velit quas. Nisi natus cupiditate est inventore esse velit eligendi consequatur. In quos molestiae eum aut optio. Officia sit distinctio aut explicabo quae possimus odit.',
          interviewed: 'CC',
        },
        {
          id: 568,
          content: 'Molestiae est excepturi alias ex consequatur qui eaque. Necessitatibus necessitatibus qui est et. Odio alias sed eaque. Ut officia reiciendis ipsam voluptatem nulla molestias.',
          interviewed: 'CC',
        },
        {
          id: 580,
          content: 'Dolorum fugit dolorem molestiae aut est enim cupiditate. Dolore nobis in autem dicta adipisci.',
          interviewed: 'ED',
        },
        {
          id: 587,
          content: 'Sed qui dolorum sed expedita numquam sunt. Nostrum ad sed eos molestiae earum. Eum rerum consectetur et eius illo qui.',
          interviewed: 'AC',
        },
        {
          id: 590,
          content: 'Officia quidem non excepturi et. Et ea est nulla harum. Unde atque aut ratione quidem. Fugiat nihil at odit nobis in.',
          interviewed: 'GD',
        },
        {
          id: 592,
          content: 'Inventore est accusantium placeat deserunt quia dolor iure. Nulla repellat delectus qui saepe ipsam.',
          interviewed: 'ED',
        },
        {
          id: 601,
          content: 'Pariatur delectus atque deserunt ipsum laboriosam. Nihil dolore dolore repellendus deserunt in voluptatem. Accusamus qui est quod ratione quidem odit. Quis ex molestiae blanditiis est autem est.',
          interviewed: 'NO',
        },
        {
          id: 605,
          content: 'Rerum est inventore sunt ipsam. Beatae accusantium architecto et tempore. Error aspernatur quaerat voluptatem et. Sed est eum explicabo et.',
          interviewed: 'NO',
        },
        {
          id: 607,
          content: 'Reprehenderit delectus architecto vero numquam aut. Itaque nulla eos quos laboriosam similique ipsam earum. Qui sapiente ipsum accusamus.',
          interviewed: 'CB',
        },
        {
          id: 609,
          content: 'Quia ex id qui assumenda. Temporibus dolore maxime tenetur quis omnis qui. Non labore quam nihil. Voluptatibus sunt rerum consequatur possimus cupiditate. Quo sit ratione beatae et quis.',
          interviewed: 'NG',
        },
        {
          id: 621,
          content: 'Sunt corrupti quaerat exercitationem aut. Quod modi voluptas quas et. Voluptatum quae qui sunt ut vero aperiam fugit molestias.',
          interviewed: 'MF',
        },
      ],
    },
  ],
};


const readInterview = (state = initialState, action = {}) => {
  switch (action.type) {
    case LOAD_READ_INTERVIEW:
      return {
        ...state,
        ...action.payload,
      };
    default:
      return state;
  }
};

export default readInterview;
