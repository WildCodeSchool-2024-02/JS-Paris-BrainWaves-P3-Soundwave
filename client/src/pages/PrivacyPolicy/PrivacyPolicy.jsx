import "./privacy-policy.css";

function PrivacyPolicy() {
  return (
    <main className="privacy-policy-main">
      <section className="intro-privacy-policy">
        <p>
          Bienvenue sur SoundWave. Chez SoundWave, nous nous engageons à
          protéger la confidentialité de nos utilisateurs. Cette Politique de
          Confidentialité explique comment nous collectons, utilisons,
          divulguons et protégeons vos informations personnelles lorsque vous
          utilisez notre site internet, accessible à l'adresse suivante :
          www.soundwave-app.fr.
        </p>
      </section>
      <section className="info-collect-section">
        <h1>Collecte des Informations</h1>
        <p>
          Nous collectons les informations suivantes lorsque vous utilisez notre
          plateforme :
        </p>

        <h2>Informations Fournies par les Utilisateurs</h2>
        <ul>
          <li>
            Informations d'inscription : Lorsque vous vous inscrivez sur
            SoundWave, nous collectons votre nom, adresse e-mail, nom
            d'utilisateur, mot de passe et autres informations nécessaires à la
            création de votre compte.
          </li>
          <li>
            Profil de l'utilisateur : Les utilisateurs peuvent créer un profil
            personnel incluant des informations supplémentaires telles que des
            photos, des biographies et des liens vers des réseaux sociaux.
          </li>
          <li>
            Évènements et Collectifs : Les collectifs de musique peuvent créer
            des profils et poster des évènements, incluant des descriptions,
            dates, lieux et autres détails pertinents.
          </li>
        </ul>

        <h2>Informations Automatiquement Collectées</h2>
        <ul>
          <li>
            Données de journal : Nous collectons des informations sur votre
            utilisation de notre site, y compris votre adresse IP, le type de
            navigateur, les pages visitées, et les dates et heures de vos
            visites.
          </li>
          <li>
            Cookies et technologies similaires : Nous utilisons des cookies pour
            collecter des informations sur votre utilisation de notre site et
            pour améliorer votre expérience utilisateur.
          </li>
        </ul>
      </section>
      <section className="use-info-section">
        <h1>Utilisation des Informations</h1>
        <p>Nous utilisons les informations collectées pour :</p>

        <ul>
          <li>
            Fournir et améliorer notre service : Gérer votre compte, permettre
            la publication et la gestion des évènements, et améliorer les
            fonctionnalités de notre site.
          </li>
          <li>
            Communiquer avec vous : Envoyer des notifications concernant votre
            compte, des mises à jour du site, et des informations sur les
            évènements.
          </li>
          <li>
            Personnaliser votre expérience : Afficher des contenus pertinents et
            recommander des évènements ou collectifs susceptibles de vous
            intéresser.
          </li>
          <li>
            Assurer la sécurité : Protéger notre site et nos utilisateurs contre
            les fraudes et abus.
          </li>
        </ul>
      </section>
      <section className="share-info-section">
        <h1>Partage des Informations</h1>
        <p>
          Nous ne vendons ni ne louons vos informations personnelles à des
          tiers. Nous pouvons partager vos informations dans les cas suivants :
        </p>

        <ul>
          <li>
            Avec votre consentement : Lorsque vous avez donné votre consentement
            explicite pour le partage de vos informations.
          </li>
          <li>
            Fournisseurs de services : Avec des tiers qui fournissent des
            services pour notre compte, tels que l'hébergement, le traitement
            des paiements, et l'analyse des données.
          </li>
          <li>
            Conformité légale : Lorsque nous sommes tenus de divulguer vos
            informations pour respecter des obligations légales ou protéger nos
            droits et ceux de nos utilisateurs.
          </li>
        </ul>
      </section>
      <section className="safe-info-section">
        <h1>Sécurité des Informations</h1>
        <p>
          Nous mettons en œuvre des mesures de sécurité appropriées pour
          protéger vos informations personnelles contre les accès non autorisés,
          les altérations, les divulgations ou les destructions. Cependant,
          aucun système de transmission ou de stockage de données n'est
          totalement sécurisé, et nous ne pouvons garantir la sécurité absolue
          de vos informations.
        </p>
      </section>
      <section className="rights-section">
        <h1>Vos Droits</h1>
        <p>Vous avez le droit de :</p>
        <ul>
          <li>
            Accéder à vos informations : Demander une copie des informations
            personnelles que nous détenons à votre sujet.
          </li>
          <li>
            Rectifier vos informations : Corriger ou mettre à jour vos
            informations personnelles si elles sont inexactes.
          </li>
          <li>
            Supprimer vos informations : Demander la suppression de vos
            informations personnelles, sous réserve de certaines exceptions
            légales.
          </li>
          <li>
            Opposer au traitement : Vous opposer au traitement de vos
            informations personnelles dans certaines circonstances.
          </li>
        </ul>
      </section>
      <section className="modify-policy-section">
        <h1>Modifications de la Politique de Confidentialité</h1>
        <p>
          Nous nous réservons le droit de modifier cette Politique de
          Confidentialité à tout moment. Nous vous informerons de toute
          modification importante en publiant la nouvelle politique sur notre
          site et en mettant à jour la date de "Dernière mise à jour" en haut de
          cette page.
        </p>
      </section>
      <section className="contact-section">
        <h1>Nous Contacter</h1>
        <p>
          Si vous avez des questions ou des préoccupations concernant cette
          Politique de Confidentialité, veuillez nous contacter à l'adresse
          suivante : soundwave.app75@gmail.com.
        </p>
      </section>

      <p>Dernière mise à jour : 18 juillet 2024</p>
    </main>
  );
}

export default PrivacyPolicy;
