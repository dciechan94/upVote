import React, { memo } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { Helmet } from 'react-helmet';
import { createStructuredSelector } from 'reselect';
import { injectIntl } from 'react-intl';

import { Card } from '@blueprintjs/core';

import { useInjectReducer } from 'utils/injectReducer';
import { useInjectSaga } from 'utils/injectSaga';

import H3 from 'components/H3';
import Section from './Section';

import reducer from './reducer';
import saga from './saga';
import messages from './messages';

const key = 'terms';

export function TermsPage({
  intl,
}) {
  useInjectReducer({ key, reducer });
  useInjectSaga({ key, saga });

  const {formatMessage} = intl;

  return (
    <div>
      <Helmet>
        <title>{formatMessage(messages.helmetTitle)}</title>
        <meta
          name="description"
          content={formatMessage(messages.helmetDescription)}
        />
      </Helmet>
      <Card>
        <H3>SŁOWNICZEK:</H3>

        <Section>
          <b>Administrator Systemu</b> - Użytkownik zarządzający dostępem, zawartością i jakością systemu UPVote.
          <br></br>
          <b>Użytkownik</b> – osoba fizyczna, osoba prawna lub jednostka organizacyjna nieposiadająca osobowości prawnej, ale posiadająca zdolność prawną, korzystająca z systemu UPVote.
          <br></br>
          <b>UPVote</b> – system prowadzony przez Uniwersystet Pedagogiczny im. KEN w Krakowie.
        </Section>

        <Section>
          <H3>§1. Postanowienia ogólne</H3>

          Niniejszy regulamin określa:<br></br>
          - zasady rejestracji w systemie UPVote;<br></br>
          - zasady korzystania z systemu UPVote;<br></br><br></br>

          Do przeglądania stron internetowych systemu UPVote, niezbędne jest urządzenie końcowe z dostępem do sieci Internet i przeglądarką internetową typu Internet Explorer, Microsoft Edge, Google Chrome, Mozilla Firefox, Opera lub Safari w aktualnej wersji. Do korzystania z niektórych funkcjonalności systemu UPVote, w tym rejestracji w Sklepie Internetowym empik.com, a także składania zamówień na produkty, niezbędne jest ponadto aktywne konto poczty elektronicznej (e-mail).
          <br></br><br></br>
          Przeglądanie zawartości systemu UPVote wymaga dokonania rejestracji.
        </Section>


        <Section>
          <H3>§2. Rejestracja</H3>

          Rejestracja w systemie UPVote umożliwia Użytkownikowi:<br></br>
          - wprowadzanie, edytowanie lub usuwanie danych Użytkownika;<br></br>
          - przeglądanie aktualnie dostępnych Użytkownikowi głosowań;<br></br>
          - wzięcie udziału w udostępnionym Użytkownikowi głosowaniu;<br></br>
          - przegląd histori głosowań;<br></br><br></br>

          W celu rejestracji w systemie UPVote należy wypełnić online formularz rejestracyjny, podając jednorazowy kod rejestracji udostępniony przez Administratora, imię i nazwisko, adres e-mail oraz hasło, a także zapoznać się z postanowieniami niniejszego regulaminu.
          <br></br><br></br>
          Po wypełnieniu i przesłaniu formularza rejestracyjnego, system generuje potwierdzenie dokonania rejestracji oraz przekierowuje na stronę z formularzem logowania. Z tą chwilą proces rejestracji zostaje zakończony.
          <br></br><br></br>
          Rejestracja w systemie UPVote, jak również korzystanie z funkcjonalności systemu UPVote, są nieodpłatne. Dokonanie rejestracji oznacza zawarcie przez Użytkownika z Administratorem Systemu umowy o świadczenie usługi elektronicznej polegającej na prowadzeniu konta Użytkownika, na zasadach określonych w niniejszym regulaminie.
          <br></br><br></br>
          Po zarejestrowaniu się w systemie UPVote każdorazowe logowanie odbywa się przy użyciu danych podanych w formularzu rejestracyjnym albo zmienionych następnie za pomocą ustawień konta Użytkownika.
          <br></br><br></br>
          Konto utworzone w wyniku rejestracji prowadzone jest dla Użytkownika przez czas nieoznaczony. Użytkownik może zrezygnować z prowadzenia konta w systemie UPVote i zażądać jego usunięcia w każdym czasie. Z tytułu rezygnacji i usunięcia konta nie są pobierane jakiekolwiek opłaty.
          <br></br><br></br>
          W celu usunięcia konta Użytkownika z systemu UPVote należy skontaktować się telefonicznie bądź e-mailowo z Administratorem Systemu. Dyspozycja usunięcia konta jest przyjmowania do realizacji po potwierdzeniu, czy osoba występująca z żądaniem jest posiadaczem tego konta. Usunięcie konta następuje niezwłocznie i oznacza rozwiązanie przez Użytkownika umowy z Administratorem Systemu o świadczenie usług drogą elektroniczną, której przedmiotem jest prowadzenie konta Użytkownika.
        </Section>


        <Section>
          <H3>§3. Zasady korzystania z systemu UPVote</H3>

          Logowanie do systemu UPVote odbywa się poprzez wpisanie w formularzu logowania adresu e-mail oraz hasła podanych przy rejestracji konta Użytkownika. Dane podane przy rejestracji konta mogą zostać zmienione po zalogowaniu się na konto Użytkownika.
          <br></br><br></br>
          Wraz z zarejestrowaniem się w systemie UPVote tworzony jest profil Użytkownika. W profilu Użytkownika dla każdego Użytkownika systemu UPVote widoczny jest – w zależności od danych podanych podczas rejestracji – imię i nazwisko Użytkownika. Zamieszczając wszelkie dane w koncie Użytkownika, Użytkownika oświadcza, że władny jest do posługiwania się powyższymi danymi, w tym do decydowania o udostępnieniu ich nieograniczonemu kręgowi osób.
          <br></br><br></br>

          Użytkownik zobowiązany jest do zachowania w tajemnicy:<br></br>
          - loginu i hasła do swojego konta w systemue UPVote; w granicach wynikających z powszechnie obowiązujących przepisów prawa odpowiedzialnym za wszelkie działania związane z posługiwaniem się loginem i hasłem do danego konta w systemie UPVote jest Użytkownik, przy czym hasło stanowi informację poufną do wyłącznej wiadomości Użytkownika;
          <br></br>
          - jednorazowego kodu rejestracji, który umożliwia pomyśle sfinalizowanie procesu rejestracji;
        </Section>


        <Section>
          <H3>§4. Dane osobowe</H3>

          Dane osobowe podawane przez Użytkowników systemu UPVote (w tym w procesie rejestracji konta, w procesie korzystania z systemu UPVote, w tym realizowania głosowań), przetwarzane są przez Uniwersytet Pedagogiczny im. KEN z adresem siedziby: ul. Podchorążych 2, 30-084 Kraków (administrator danych).
          <br></br><br></br>
          Podanie danych osobowych przez Użytkownika jest dobrowolne, jednakże niezbędne do korzystania z tych usług świadczonych drogą elektroniczną przez system UPVote, które wymagają podania danych osobowych. System UPVote przetwarza dane osobowe w celu świadczenia usług drogą elektroniczną.
          <br></br><br></br>
          Użytkownik ma prawo dostępu do treści swoich danych osobowych oraz do ich poprawiania i usunięcia. Dane osobowe mogą być poprawiane lub usuwane po zalogowaniu się na konto Użytkownika lub poprzez zgłoszenie od Administratora Systemu.
          <br></br><br></br>
          Udostępnienie przez Użytkownika danych osobowych w profilu Użytkownika, oznacza wyrażenie zgody na udostępnienie tych danych nieograniczonemu kręgowi osób zarejestrowanych w systemie UPVote.
          <br></br><br></br>
          Użytkownik podając dane oświadcza, że podane przez niego dane osobowe są jego danymi.
        </Section>


        <Section>
          <H3>§5. Postanowienia końcowe</H3>

          Administrator Systemu dokłada wszelkich starań, by świadczone usługi w ramach systemu UPVote były na najwyższym poziomie, jednakże Administrator Systemu nie wyklucza możliwości czasowego zawieszenia dostępności systemu UPVote w przypadku konieczności przeprowadzenia konserwacji, przeglądu, wymiany sprzętu lub też w związku z koniecznością modernizacji lub rozbudowy systemu UPVote. Administrator Systemu dołoży starań, aby ewentualne zawieszenie dostępności systemu UPVote było dokonywane w godzinach nocnych.
          <br></br><br></br>
          Regulamin podlega przepisom prawa powszechnie obowiązującego w Rzeczypospolitej Polskiej.
        </Section>
      </Card>
    </div>
  );
}

TermsPage.propTypes = {
};


const mapStateToProps = createStructuredSelector({
});

export function mapDispatchToProps(dispatch) {
  return {
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  injectIntl,
  memo
)(TermsPage);
