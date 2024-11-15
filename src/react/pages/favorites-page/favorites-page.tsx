import FavoriteCard from './favorite-card.tsx';
import {Offer} from '../../../interfaces/offer.ts';
import {Link} from 'react-router-dom';
import {AppRouter} from '../../routing/app-router.ts';

type FavoritesPageProps = {
  favoriteOffers: Offer[];
}

function FavoritesPage({ favoriteOffers } : FavoritesPageProps) {
  const groupedByPlace = favoriteOffers.reduce<Record<string, Offer[]>>(
    (acc, favoriteOffer) => {
      if (!acc[favoriteOffer.city.name]) {
        acc[favoriteOffer.city.name] = [];
      }
      acc[favoriteOffer.city.name].push(favoriteOffer);
      return acc;
    }, {});

  return (
    <body>
      <div className="page">
        <header className="header">
          <div className="container">
            <div className="header__wrapper">
              <div className="header__left">
                <Link className="header__logo-link" to={AppRouter.Main}>
                  <img className="header__logo" src="img/logo.svg" alt="6 cities logo" width="81" height="41"></img>
                </Link>
              </div>
              <nav className="header__nav">
                <ul className="header__nav-list">
                  <li className="header__nav-item user">
                    <a className="header__nav-link header__nav-link--profile" href="#">
                      <div className="header__avatar-wrapper user__avatar-wrapper">
                      </div>
                      <span className="header__user-name user__name">Oliver.conner@gmail.com</span>
                      <span className="header__favorite-count">3</span>
                    </a>
                  </li>
                  <li className="header__nav-item">
                    <a className="header__nav-link" href="#">
                      <span className="header__signout">Sign out</span>
                    </a>
                  </li>
                </ul>
              </nav>
            </div>
          </div>
        </header>

        <main className="page__main page__main--favorites">
          <div className="page__favorites-container container">
            <section className="favorites">
              <h1 className="favorites__title">Saved listing</h1>
              <ul className="favorites__list">
                {Object.keys(groupedByPlace).map((cityName) => (
                  <li className="favorites__locations-items" key={cityName}>
                    <div className="favorites__locations locations locations--current">
                      <div className="locations__item">
                        <a className="locations__item-link" href="#">
                          <span>{cityName}</span>
                        </a>
                      </div>
                    </div>
                    <div className="favorites__places">
                      {favoriteOffers
                        .filter((favoriteOffer) => favoriteOffer.city.name === cityName)
                        .map((favoriteOffer) =>
                          (
                            <Link key={favoriteOffer.id} to={ `/offer/${favoriteOffer.id}` }>
                              <FavoriteCard favoriteOffer={favoriteOffer} key={favoriteOffer.id}/>
                            </Link>
                          ))}
                    </div>
                  </li>
                ))}
              </ul>
            </section>
          </div>
        </main>
        <footer className="footer container">
          <a className="footer__logo-link" href="main.html">
            <img className="footer__logo" src="img/logo.svg" alt="6 cities logo" width="64" height="33"></img>
          </a>
        </footer>
      </div>
    </body>
  );
}

export default FavoritesPage;
