import React from 'react';
import './Stats.scss';
import { useAppSelector } from '../../hooks/redux';

function Stats() {
  const user = useAppSelector((state) => state.user.user); // on récupère les stats dans notre store (state)

  // on affiche les stats du deck selectionné

  console.log(user, 'la liste ici');
  return (
    <div className="stats-container">
      {user &&
        user.decks &&
        user.decks.map((deck) => (
          <div key={deck.id} className="stats">
            <div>Nom du deck : {deck.title}</div>
            {deck.stats_deck &&
              deck.stats_deck.map((stat) => (
                <div key={stat.stats_id}>
                  <div>Nombre de carte réussies : {stat.nb_card_success}</div>
                  <div>
                    Nombre de carte présentée : {stat.nb_card_consulted}
                  </div>
                </div>
              ))}
          </div>
        ))}
    </div>
  );
}

export default Stats;
