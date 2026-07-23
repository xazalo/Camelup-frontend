<template>
  <section class="gaper">
    <div>
      <h2>{{ $t('about.about.title') }}</h2>
      <p>
        {{ $t('about.about.p1').replace('Camel Up', '') }}<strong>Camel Up</strong>{{ $t('about.about.p1').replace('Camel Up', '') }}
      </p>
      <p>
        <strong>{{ $t('about.about.p2').split(',')[0] }}</strong>{{ $t('about.about.p2').substring($t('about.about.p2').indexOf(',')) }}
      </p>
    </div>

    <div>
      <h3>{{ $t('about.technical.title') }}</h3>

      <ul>
        <li>{{ $t('about.technical.items[0]') }}</li>
        <li>{{ $t('about.technical.items[1]') }}</li>
        <li>{{ $t('about.technical.items[2]') }}</li>
        <li>{{ $t('about.technical.items[3]') }}</li>
      </ul>
    </div>

    <div>
      <h3>{{ $t('about.purpose.title') }}</h3>

      <p>
        {{ $t('about.purpose.description') }}
      </p>
    </div>

    <div>
      <h3>{{ $t('about.copyright.title') }}</h3>

      <p>
        {{ $t('about.copyright.p1').split('Camel Up')[0] }}<strong>Camel Up</strong>{{ $t('about.copyright.p1').split('Camel Up')[1] }}
      </p>

      <p>{{ $t('about.copyright.p2') }}</p>
    </div>

    <div>
      <h3>{{ $t('about.translations.title') }}</h3>

      <p>
        {{ $t('about.translations.description') }}
      </p>
    </div>
  </section>
</template>
