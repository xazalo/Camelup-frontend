<template>
  <section class="gaper">
    <div>
      <h2>{{ $t('rules.rules.title') }}</h2>

      <p>
        {{ $t('rules.rules.description') }}
      </p>
    </div>

    <div>
      <h3>{{ $t('rules.objective.title') }}</h3>

      <p>
        {{ $t('rules.objective.description') }}
      </p>
    </div>

    <div>
      <h3>{{ $t('rules.camels.title') }}</h3>

      <ul>
        <li>{{ $t('rules.camels.items[0]') }}</li>
        <li>{{ $t('rules.camels.items[1]') }}</li>
        <li>{{ $t('rules.camels.items[2]') }}</li>
        <li>{{ $t('rules.camels.items[3]') }}</li>
        <li>{{ $t('rules.camels.items[4]') }}</li>
      </ul>
    </div>

    <div>
      <h3>{{ $t('rules.actions.title') }}</h3>

      <p>{{ $t('rules.actions.subtitle') }}</p>

      <ul>
        <li>{{ $t('rules.actions.items[0]') }}</li>
        <li>{{ $t('rules.actions.items[1]') }}</li>
        <li>{{ $t('rules.actions.items[2]') }}</li>
        <li>{{ $t('rules.actions.items[3]') }}</li>
        <li>{{ $t('rules.actions.items[4]') }}</li>
      </ul>
    </div>

    <div>
      <h3>{{ $t('rules.rolling.title') }}</h3>

      <ul>
        <li>{{ $t('rules.rolling.items[0]') }}</li>
        <li>{{ $t('rules.rolling.items[1]') }}</li>
        <li>{{ $t('rules.rolling.items[2]') }}</li>
        <li>{{ $t('rules.rolling.items[3]') }}</li>
      </ul>
    </div>

    <div>
      <h3>{{ $t('rules.roundBets.title') }}</h3>

      <p>
        {{ $t('rules.roundBets.description') }}
      </p>

      <ul>
        <li>{{ $t('rules.roundBets.items[0]') }}</li>
        <li>{{ $t('rules.roundBets.items[1]') }}</li>
        <li>{{ $t('rules.roundBets.items[2]') }}</li>
      </ul>
    </div>

    <div>
      <h3>{{ $t('rules.finalWinner.title') }}</h3>

      <p>{{ $t('rules.finalWinner.description') }}</p>

      <ul>
        <li>{{ $t('rules.finalWinner.items[0]') }}</li>
        <li>{{ $t('rules.finalWinner.items[1]') }}</li>
      </ul>
    </div>

    <div>
      <h3>{{ $t('rules.finalLoser.title') }}</h3>

      <p>{{ $t('rules.finalLoser.description') }}</p>

      <ul>
        <li>{{ $t('rules.finalLoser.items[0]') }}</li>
        <li>{{ $t('rules.finalLoser.items[1]') }}</li>
      </ul>
    </div>

    <div>
      <h3>{{ $t('rules.desertTiles.title') }}</h3>

      <p>{{ $t('rules.desertTiles.description') }}</p>

      <ul>
        <li>
          <strong>{{ $t('rules.desertTiles.oasis').split(':')[0] }}:</strong>{{ $t('rules.desertTiles.oasis').split(':')[1] }}
        </li>
        <li>
          <strong>{{ $t('rules.desertTiles.mirage').split(':')[0] }}:</strong>{{ $t('rules.desertTiles.mirage').split(':')[1] }}
        </li>
        <li>{{ $t('rules.desertTiles.earn') }}</li>
      </ul>
    </div>

    <div>
      <h3>{{ $t('rules.endRound.title') }}</h3>

      <ul>
        <li>{{ $t('rules.endRound.items[0]') }}</li>
        <li>{{ $t('rules.endRound.items[1]') }}</li>
        <li>{{ $t('rules.endRound.items[2]') }}</li>
        <li>{{ $t('rules.endRound.items[3]') }}</li>
        <li>{{ $t('rules.endRound.items[4]') }}</li>
      </ul>
    </div>

    <div>
      <h3>{{ $t('rules.endRace.title') }}</h3>

      <p>{{ $t('rules.endRace.description') }}</p>

      <ul>
        <li>{{ $t('rules.endRace.items[0]') }}</li>
        <li>{{ $t('rules.endRace.items[1]') }}</li>
        <li>{{ $t('rules.endRace.items[2]') }}</li>
      </ul>
    </div>

    <div>
      <h3>{{ $t('rules.notes.title') }}</h3>

      <p>
        {{ $t('rules.notes.description') }}
      </p>
    </div>
  </section>
</template>
