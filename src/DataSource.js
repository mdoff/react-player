import React from 'react';
const defaultPlayer = {play: false, url: '', playlist: []};
export const {Provider, Consumer} = React.createContext(defaultPlayer);
