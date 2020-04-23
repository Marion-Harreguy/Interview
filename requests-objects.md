http://184.73.143.2/register (post)
SENT: {
  user: {
    firstname: 'mandatory',
    lastname: 'mandatory',
    email: 'mandatory',
    password: 'mandatory',
    biography: '',
  },
  structure: {
    name: '',
    city: '',
    sector: '',
  }
}

RESPONSE: { id: 121212,
            token: sbqifbifzkfnekfnezkf,
          }


http://184.73.143.2/login (post)
SENT : {
  credentials : {
    login: 'mandatory',
    password: 'mandatory',
  },
}

(modifié ci-dessous : 
+ pas de publish à true ou false
+ dataStructure ne contient qu'une structure donc elle passe d'un tableau d'objet à un objet
+ ajout d'un token dans dataUser
+ ajout d'un statut dans dataUser - je crois
+ ajout des tableau catégories dans les interviews
+ ajout d'une couleur dans catégories )

RESPONSE : {
  dataUser: {
    id: 181,
    firstname: 'Patrick',
    lastname: 'Lebon',
    email: 'vrocher@tiscali.fr',
    status: 'Prof',
    biography: 'Enim ipsum inventore sed libero et velit qui suscipit. Deserunt laudantium quibusdam enim nostrum soluta qui ipsam non. Velit reiciendis aperiam et fuga.',
    token: 'azertjklmazejk',
  },
  dataStructure: {
    id: 68,
    name: 'Peltier  dMillet SARL',
    city: 'Lejeune',
    sector: 'Le pouvoir de concrétiser vos projets à l\'état pur',
  },
  dashboard: {
    publishedInterviews: [
      {
        id: 61,
        title: 'Nesciunt voluptas et aut. Reiciendis velit voluptas molestiae eum et eos.',
        categories: [],
      },
    ],
    writtingInterviews: [
      {
        id: 61,
        title: 'Nesciunt voluptas et aut. Reiciendis velit voluptas molestiae eum et eos.',
        categories: [],
      },
    ],
    savedInterviews: [
      {
        id: 63,
        title: 'Corrupti cum ratione animi maxime enim.',
        categories: [],
      }
    ],
    categories: [
      {
        id: 477,
        name: 'accusantium',
        color: '#177456',
      }
    ],
  },
}


http://184.73.143.2/api/users/{id} (put)
SENT:
Same user object as above

RESPONSE:
NONE

http://184.73.143.2/api/users/{id} (get)
SENT:
NOTHING

RESPONSE:
Same user object as above

http://184.73.143.2/api/interview/{id} (get)
SENT:
NOTHING

(Question : meta.city ?
removed interviewed.city,
tags should be a table of string (and not a table of objects)
added key "context"
changed key "questions" to "content"
changed keys "content" to "question"
added email keys to author and interviewed
)

RESPONSE: {
  meta: {
    id: 67,
    title: 'Nesciunt voluptas et aut. Reiciendis velit voluptas molestiae eum et eos.',
    location: 'France',
    language: 'Français',
    year: 1995,
    city: 'Paris',
    openLicence: true,
    author: {
      name: 'Patrick Lebon',
      status: 'sdfghjk fghjkl fghjkl ghjkl m',
      email: 'lal@lala.fr',
      structure: {
        name: 'Thomas',
        city: 'Chauveaudan'
      },
    },
    interviewed: [
      {
        id: 283,
        name: 'Nathalie Guilbert',
        status: 'Professeur',
        email: 'lal@lala.fr',
        structure: {
          name: 'Thomas',
          city: 'Chauveaudan'
        }
      },
    ],
    tags: ['sit', 'sat'],
  },
  context: "context ghdjksdfbkndskjbvsjkbs",
  content: [
    {
      id: 144,
      question: 'Et similique impedit beatae. Nobis recusandae qui voluptas rerum. ?',
      answers: [
        {
          id: 572,
          content: 'Maiores aut blanditiis in pariatur. Blanditiis consectetur itaque consequuntur cupiditate praesentium itaque et. Quo sapiente est adipisci quaerat voluptas vitae quia molestiae.',
          interviewed: 'RT'
        },
        {
          id: 588,
          content: 'Voluptatem ut quod assumenda a. Sit ut sapiente fugit ullam veniam beatae. Nemo aliquid ut quam ut.',
          interviewed: 'CR'
        }
      ]
    },
  ]
};


http://184.73.143.2/api/interview/ (put)
SENT:
Same interview object as above BUT the latest question/answer won't have 'id' keys

RESPONSE:
NONE

http://184.73.143.2/api/interview/ (delete)
SENT:
NOTHING

RESPONSE:
NONE

