function initInput() {
  inputLayer = Crafty.e( '2D, DOM, input-layer' )
    .attr({
      x: 0
      ,y: 0
      ,w: SCREEN_WIDTH
      ,h: SCREEN_HEIGHT
      ,z: Layer.INPUT
    })
    .bind( 'MouseDown', function(e){
      handleEvent( 'down', StateManager.mouseEntity );
    })
    .bind( 'MouseUp', function(e){
      handleEvent( 'up', StateManager.mouseEntity );
    })
    .bind( 'KeyDown', function(e){
      if ( isUsableKey( e.key ) ) {
        entity = StateManager.keyEntities[e.key];

        switch ( StateManager.state() ) {
          case 'attract':
          case 'countdown':
            StateManager.addPlayer( 'key', e.key );
            break;
          case 'race':
            break;
          case 'finish':
            break;
        }

        handleEvent( 'down', entity );

        e.preventDefault();
        e.stopPropagation();
      }
    })
    .bind( 'KeyUp', function(e){
      if ( isUsableKey( e.key ) ) {
        entity = StateManager.keyEntities[e.key];

        switch ( StateManager.state() ) {
          case 'attract':
            break;
          case 'countdown':
            // Key released before race start; remove player and restart timer
            StateManager.removePlayer( 'key', e.key );
            break;
          case 'race':
            break;
          case 'finish':
            break;
        }

        handleEvent( 'up', entity );

        e.preventDefault();
        e.stopPropagation();
      }
    });

  $(inputLayer._element)
    .on( 'touchstart', function(e){
      // find touch-bound entity near coords and .go
    })
    .on( 'touchend', function(e){
      // find touch-bound entity near coords and .stop
    });

  // WORKAROUND: Crafty doesn't support KeyPress and a Crafty entity wasn't
  //   reliably receiving keypress events, so go ahead and attach the
  //   typeahead cancel function directly to the <body> tag.
  $('body').on( 'keypress', function(e){ return false } );

  function handleEvent( state, entity ) {
    if ( entity ) {
      state == 'down' && entity.go();
      state == 'up'   && entity.stop();
    }
  }

  function isUsableKey( key ) {
    extendedKeys = _([ 'COMMA', 'MINUS', 'PERIOD', 'PLUS', 'TAB', 'CAPS',
      'MULTIPLY', 'ADD', 'SUBSTRACT', 'DECIMAL', 'DIVIDE', 'LEFT_ARROW',
      'RIGHT_ARROW', 'DOWN_ARROW', 'UP_ARROW', 'INSERT', 'DELETE', 'END',
      'HOME', 'ENTER', 'SPACE', 'SHIFT',
      // Extended keycodes configured in init.js:
      'EQUALS', 'TILDE', 'SEMICOLON', 'LEFT_BRACKET', 'RIGHT_BRACKET',
      'BACKSLASH', 'SLASH'
    ]).map( function(key) { return Crafty.keys[key]; } );

    return ( key >= Crafty.keys['A'] && key <= Crafty.keys['Z'] )
      || ( key >= Crafty.keys['0'] && key <= Crafty.keys['9'] )
      || ( key >= Crafty.keys['NUMPAD_0'] && key <= Crafty.keys['NUMPAD_9'] )
      || _(extendedKeys).include(key);
  }
} // function initInput
