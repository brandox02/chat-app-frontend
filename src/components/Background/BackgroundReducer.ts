import React from "react";


export const VIEWS = {
     VIEW_LISTA_CHAT: {
          value: 'VIEW_LISTA_CHAT',
          display: 'd-hidden-chat'
     },
     VIEW_CHAT: {
          value: 'VIEW_CHAT',
          display: 'd-hidden-chat'
     },
     VIEW_AUTH: {
          value: 'VIEW_AUTH',
          display: 'd-hidden'
     },
     VIEW_LOGIN: {
          value: 'VIEW_LOGIN',
          display: ''
     },
     VIEW_SIGNIN: {
          value: 'VIEW_SIGNIN',
          display: 'd-hidden'
     }

}
export type paramView = typeof VIEWS.VIEW_CHAT.value | typeof VIEWS.VIEW_LISTA_CHAT.value;

export function reducer(state: typeof VIEWS, action: paramView) {
     // ocultamos las otras vistas
     switch (action) {
          case VIEWS.VIEW_CHAT.value:
               const f = VIEWS
               f.VIEW_CHAT.display = '';
               f.VIEW_LISTA_CHAT.display = 'd-hidden-chat';
               f.VIEW_AUTH.display = 'd-hidden';
               f.VIEW_LOGIN.display = 'd-hidden';
               f.VIEW_SIGNIN.display = 'd-hidden';
               return f
          case VIEWS.VIEW_LISTA_CHAT.value:
               const f2 = VIEWS
               f2.VIEW_CHAT.display = 'd-hidden-chat';
               f2.VIEW_AUTH.display = 'd-hidden';
               f2.VIEW_LISTA_CHAT.display = '';
               f2.VIEW_LOGIN.display = 'd-hidden';
               f2.VIEW_SIGNIN.display = 'd-hidden';
               return f2
          case VIEWS.VIEW_AUTH.value:
               const f3 = VIEWS
               f3.VIEW_CHAT.display = 'd-hidden-chat';
               f3.VIEW_LISTA_CHAT.display = 'd-hidden-chat';
               f3.VIEW_AUTH.display = '';
               f3.VIEW_LOGIN.display = 'd-hidden';
               f3.VIEW_SIGNIN.display = 'd-hidden';
               return f3
          case VIEWS.VIEW_LOGIN.value:
               const f4 = VIEWS;
               f4.VIEW_CHAT.display = 'd-hidden-chat';
               f4.VIEW_LISTA_CHAT.display = 'd-hidden-chat';
               f4.VIEW_AUTH.display = 'd-hidden';
               f4.VIEW_LOGIN.display = '';
               f4.VIEW_SIGNIN.display = 'd-hidden';
               return f4;
          case VIEWS.VIEW_SIGNIN.value:
               const f5 = VIEWS
               f5.VIEW_CHAT.display = 'd-hidden-chat';
               f5.VIEW_LISTA_CHAT.display = 'd-hidden-chat';
               f5.VIEW_AUTH.display = 'd-hidden';
               f5.VIEW_LOGIN.display = 'd-hidden';
               f5.VIEW_SIGNIN.display = '';
               return f5;
          default:
               return state
     }
}

export const contextExample = {
     setView: (arg0: paramView) => { },
     activeChatId: '',
     setActiveChatId: (arg0: string) => { }
}

export const context = React.createContext(contextExample);