const navData = {
    sections: [
      {
        key: 0,
        title: "Zaloguj",
        url: "/signin",
        roles: [ "ROLE_HAS_NONE" ],
        i18n: { message_key: "upvote.components.FixedLeftNavBar.signin" },
        sections: []
      },
      {
        key: 1,
        title: "Zarejestruj się",
        url: "/signup",
        roles: [ "ROLE_HAS_NONE" ],
        i18n: { message_key: "upvote.components.FixedLeftNavBar.signup" },
        sections: []
      },
      {
        key: 2,
        title: "Wyloguj",
        url: "/signout",
        roles: [ "ROLE_HAS_ANY" ],
        i18n: { message_key: "upvote.components.FixedLeftNavBar.signout" },
        sections: []
      },
      {
        key: 2,
        title: "Wybory",
        roles: [ "ROLE_USER" ],
        i18n: { message_key: "upvote.components.FixedLeftNavBar.elections" },
        sections: [
          {
            key: 0,
            title: "Przeglądaj",
            url: "/browse/elections",
            roles: [ "ROLE_USER" ],
            i18n: { message_key: "upvote.components.FixedLeftNavBar.elections.browse" }
          },
          {
            key: 1,
            title: "Utwórz",
            url: "/elections/create",
            roles: [ "ROLE_EDITOR" ],
            i18n: { message_key: "upvote.components.FixedLeftNavBar.elections.create" }
          }
        ]
      },
      {
        key: 3,
        title: "Administracja",
        roles: [ "ROLE_ADMIN" ],
        i18n: { message_key: "upvote.components.FixedLeftNavBar.administration" },
        sections: [
          {
            key: 0,
            title: "Użytkownicy",
            url: "/browse/users",
            roles: [ "ROLE_ADMIN" ],
            i18n: { message_key: "upvote.components.FixedLeftNavBar.administration.users" }
          }
        ]
      },
      {
        key: 4,
        title: "Ustawienia",
        roles: [ "ROLE_USER" ],
        i18n: { message_key: "upvote.components.FixedLeftNavBar.settings" },
        sections: [
          {
            key: 0,
            title: "Eksport danych",
            url: "/profile/export",
            roles: [ "ROLE_USER" ],
            i18n: { message_key: "upvote.components.FixedLeftNavBar.settings.profile.export" }
          },
          {
            key: 1,
            title: "Edytuj profil",
            url: "/profile/edit",
            roles: [ "ROLE_USER" ],
            i18n: { message_key: "upvote.components.FixedLeftNavBar.settings.profile.edit" }
          },
          {
            key: 2,
            title: "Zmień hasło",
            url: "/profile/password",
            roles: [ "ROLE_USER" ],
            i18n: { message_key: "upvote.components.FixedLeftNavBar.settings.profile.changePassword" }
          },
          {
            key: 3,
            title: "Usuń konto",
            url: "/profile/delete",
            roles: [ "ROLE_USER" ],
            i18n: { message_key: "upvote.components.FixedLeftNavBar.settings.profile.delete" }
          }
        ]
      },
      {
        key: 5,
        title: "Archiwum",
        url: "/browse/archive",
        roles: [ "ROLE_USER" ],
        i18n: { message_key: "upvote.components.FixedLeftNavBar.archive" }
      },
      {
        key: 6,
        title: "Polityka prywatności",
        url: "/privacy",
        roles: [ "ROLE_HAS_ANY" ],
        i18n: { message_key: "upvote.components.FixedLeftNavBar.privacy" }
      },
    ]
  };

export default navData;
